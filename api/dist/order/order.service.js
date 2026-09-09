"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const create_order_dto_1 = require("./dto/create-order.dto");
const repository_tokens_1 = require("../common/constants/repository.tokens");
let OrderService = class OrderService {
    constructor(orderRepository, templateRepository) {
        this.orderRepository = orderRepository;
        this.templateRepository = templateRepository;
    }
    // =========================
    // Query
    // =========================
    /**
     * ADMIN: xem tất cả Order
     */
    async getAll() {
        return this.orderRepository.getAll();
    }
    /**
     * USER:
     *   chỉ được xem Order của chính mình
     *
     * ADMIN:
     *   được xem mọi Order
     */
    async getById(id, user) {
        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found.`);
        }
        // ADMIN có toàn quyền
        if (user.role === "ADMIN") {
            return order;
        }
        // USER chỉ được xem Order của mình
        if (user.role === "USER" &&
            order.userId !== user.id) {
            throw new common_1.ForbiddenException("You can only access your own orders.");
        }
        throw new common_1.ForbiddenException("You do not have permission to access this order.");
    }
    /**
     * USER:
     *   chỉ được xem Order của chính mình.
     *
     * ADMIN:
     *   được xem Order của bất kỳ user nào.
     */
    async getByUserId(userId, user) {
        // ADMIN được xem order của bất kỳ user nào
        if (user.role === "ADMIN") {
            return this.orderRepository.getByUserId(userId);
        }
        // USER chỉ được xem order của chính mình
        if (user.role === "USER") {
            if (userId !== user.id) {
                throw new common_1.ForbiddenException("You can only access your own orders.");
            }
            return this.orderRepository.getByUserId(user.id);
        }
        // CREATOR hoặc role không được phép
        throw new common_1.ForbiddenException("You do not have permission to access orders.");
    }
    /**
     * ADMIN: xem Order theo trạng thái
     */
    async getByStatus(status) {
        return this.orderRepository.getByStatus(status);
    }
    // =========================
    // Create
    // =========================
    /**
     * USER tạo Order cho chính mình.
     *
     * Frontend chỉ gửi:
     *
     * - paymentMethod
     * - billing
     * - items.productId
     * - items.quantity
     * - items.styleId
     *
     * Backend tự quyết định:
     *
     * - id
     * - userId
     * - status
     * - productName
     * - unitPrice
     * - subtotal
     * - discount
     * - total
     * - item.id
     * - styleId
     * - styleSlug
     * - styleName
     */
    async create(dto, user) {
        // =========================
        // Validate items
        // =========================
        if (!dto.items ||
            dto.items.length === 0) {
            throw new common_1.ForbiddenException("Cannot create an order with no items.");
        }
        // =========================
        // Create Order ID
        // =========================
        const orderId = crypto.randomUUID();
        // =========================
        // Create Order Items
        // =========================
        const items = await Promise.all(dto.items.map(async (item) => {
            // =====================================
            // Get Template
            // =====================================
            const template = await this.templateRepository.getById(item.productId);
            if (!template) {
                throw new common_1.NotFoundException(`Template with id ${item.productId} not found.`);
            }
            // =====================================
            // Get Price From Database
            // =====================================
            /*
             * KHÔNG lấy unitPrice từ frontend.
             *
             * Frontend chỉ gửi productId + quantity.
             *
             * Backend lấy giá hiện tại
             * của Template từ database.
             */
            const unitPrice = template.discountPrice ??
                template.price;
            // =====================================
            // Validate Price
            // =====================================
            if (unitPrice === null ||
                unitPrice === undefined ||
                !Number.isFinite(unitPrice) ||
                unitPrice < 0) {
                throw new common_1.ForbiddenException(`Template ${item.productId} has an invalid price.`);
            }
            // =====================================
            // Calculate Item Subtotal
            // =====================================
            const subtotal = unitPrice *
                item.quantity;
            // =====================================
            // Snapshot Style
            // =====================================
            let styleId = null;
            let styleSlug = null;
            let styleName = null;
            // -------------------------------------
            // 1. Frontend có chọn style
            // -------------------------------------
            if (item.styleId) {
                const style = await this.templateRepository.getStyleById(item.styleId);
                if (!style) {
                    throw new common_1.NotFoundException(`Template style with id ${item.styleId} not found.`);
                }
                styleId =
                    style.id;
                styleSlug =
                    style.slug;
                styleName =
                    style.name;
            }
            // -------------------------------------
            // 2. Không chọn style
            //    → dùng style mặc định của Template
            // -------------------------------------
            else if (template.styleId) {
                const style = await this.templateRepository.getStyleById(template.styleId);
                if (style) {
                    styleId =
                        style.id;
                    styleSlug =
                        style.slug;
                    styleName =
                        style.name;
                }
            }
            // =====================================
            // Return OrderItem
            // =====================================
            return {
                id: crypto.randomUUID(),
                orderId,
                productId: item.productId,
                productName: template.title,
                // =========================
                // Style Snapshot
                // =========================
                styleId,
                styleSlug,
                styleName,
                // =========================
                // Pricing
                // =========================
                unitPrice,
                quantity: item.quantity,
                subtotal,
            };
        }));
        // =========================
        // Calculate Subtotal
        // =========================
        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        // =========================
        // Calculate Discount
        // =========================
        /*
         * Giá đã sử dụng:
         *
         * discountPrice ?? price
         *
         * nên hiện tại không cần
         * tính thêm discount.
         *
         * Nếu sau này muốn lưu số tiền
         * discount riêng thì có thể:
         *
         * originalPrice - discountPrice
         *
         * và lấy hoàn toàn từ database.
         */
        const discount = 0;
        // =========================
        // Calculate Total
        // =========================
        const total = Math.max(0, subtotal - discount);
        // =========================
        // Create Order Data
        // =========================
        const data = {
            id: orderId,
            // =========================
            // User
            // =========================
            userId: user.id,
            // =========================
            // Status
            // =========================
            status: create_order_dto_1.OrderStatus.PENDING,
            // =========================
            // Payment
            // =========================
            paymentMethod: dto.paymentMethod,
            // =========================
            // Pricing
            // =========================
            subtotal,
            discount,
            total,
            // =========================
            // Billing
            // =========================
            billing: {
                ...dto.billing,
            },
            // =========================
            // Items
            // =========================
            items,
        };
        // =========================
        // Repository
        // =========================
        return this.orderRepository.create(data);
    }
    // =========================
    // Update
    // =========================
    /**
     * Chỉ ADMIN
     */
    async update(id, dto) {
        await this.getOrderForAdmin(id);
        return this.orderRepository.update(id, dto);
    }
    // =========================
    // Delete
    // =========================
    /**
     * Chỉ ADMIN
     */
    async delete(id) {
        await this.getOrderForAdmin(id);
        return this.orderRepository.delete(id);
    }
    // =========================
    // Internal
    // =========================
    /**
     * Kiểm tra Order tồn tại.
     *
     * Dùng cho các thao tác chỉ ADMIN
     * được phép thực hiện.
     */
    async getOrderForAdmin(id) {
        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found.`);
        }
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repository_tokens_1.ORDER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(repository_tokens_1.TEMPLATE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], OrderService);
