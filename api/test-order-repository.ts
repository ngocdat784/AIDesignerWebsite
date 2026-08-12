import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { OrderRepository } from "./repositories/order.repository";
import { UserRepository } from "./repositories/user.repository";

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const orderRepository = app.get(OrderRepository);
    const userRepository = app.get(UserRepository);

    console.log("OrderRepository injected successfully.");
    console.log("UserRepository injected successfully.");

    const testUserId = "order-test-user-001";
    const testOrderId = "order-test-001";
    const testEmail = "order-test@example.com";

    const testBillingId = null;

    const testItemIds = [
      "order-item-test-001",
      "order-item-test-002",
    ];

    console.log("\n=== ORDER REPOSITORY TEST ===\n");

    // ==========================================
    // 0. CHECK DEPENDENCY INJECTION
    // ==========================================

    if (!orderRepository) {
      throw new Error("OrderRepository was not injected by NestJS.");
    }

    if (!userRepository) {
      throw new Error("UserRepository was not injected by NestJS.");
    }

    console.log("OrderRepository injected successfully.");
    console.log("UserRepository injected successfully.");

    // ==========================================
    // CLEANUP PREVIOUS TEST DATA
    // ==========================================

    const existingOrder = await orderRepository.getById(testOrderId);

    if (existingOrder) {
      await orderRepository.delete(testOrderId);
    }

    const existingUser = await userRepository.getById(testUserId);

    if (existingUser) {
      await userRepository.delete(testUserId);
    }

    console.log("Cleaned previous test data.");

    // ==========================================
    // CREATE TEST USER
    // ==========================================

    const testUser = await userRepository.create({
      id: testUserId,
      name: "Order Test User",
      email: testEmail,
      role: "USER",
    });

    console.log("\nTest user created:");
    console.dir(testUser, { depth: null });

    // ==========================================
    // 1. CREATE ORDER
    // ==========================================

    const createdOrder = await orderRepository.create({
      id: testOrderId,
      userId: testUserId,

      status: "PENDING",

      paymentMethod: "card",

      subtotal: 78,
      discount: 10,
      total: 68,

      billing: {
        firstName: "Order",
        lastName: "Tester",
        email: testEmail,
        phone: "0123456789",
        address: "123 Test Street",
        city: "Ho Chi Minh City",
        country: "Vietnam",
        postalCode: "700000",
      },

      items: [
        {
          id: testItemIds[0],
          productId: "template-test-001",
          productName: "AI Dashboard Template",
          unitPrice: 29,
          quantity: 2,
          subtotal: 58,
        },
        {
          id: testItemIds[1],
          productId: "template-test-002",
          productName: "Modern SaaS Template",
          unitPrice: 20,
          quantity: 1,
          subtotal: 20,
        },
      ],
    });

    console.log("\n1. CREATE");
    console.dir(createdOrder, { depth: null });

    // ==========================================
    // VERIFY CREATE RELATIONS
    // ==========================================

    if (!createdOrder.user) {
      throw new Error("CREATE: user relation was not loaded.");
    }

    if (!createdOrder.billing) {
      throw new Error("CREATE: billing relation was not created.");
    }

    if (createdOrder.items.length !== 2) {
      throw new Error(
        `CREATE: expected 2 order items, got ${createdOrder.items.length}.`,
      );
    }

    console.log("\nCREATE relations verified.");

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const orderById = await orderRepository.getById(testOrderId);

    console.log("\n2. GET BY ID");
    console.dir(orderById, { depth: null });

    if (!orderById) {
      throw new Error("GET BY ID: order was not found.");
    }

    // ==========================================
    // 3. GET BY USER ID
    // ==========================================

    const ordersByUser = await orderRepository.getByUserId(testUserId);

    console.log("\n3. GET BY USER ID");
    console.dir(ordersByUser, { depth: null });

    if (ordersByUser.length !== 1) {
      throw new Error(
        `GET BY USER ID: expected 1 order, got ${ordersByUser.length}.`,
      );
    }

    // ==========================================
    // 4. GET BY STATUS
    // ==========================================

    const pendingOrders = await orderRepository.getByStatus("PENDING");

    console.log("\n4. GET BY STATUS");
    console.dir(pendingOrders, { depth: null });

    const foundPendingOrder = pendingOrders.some(
      (order) => order.id === testOrderId,
    );

    if (!foundPendingOrder) {
      throw new Error(
        "GET BY STATUS: test order was not found in PENDING orders.",
      );
    }

    // ==========================================
    // 5. GET ALL
    // ==========================================

    const allOrders = await orderRepository.getAll();

    console.log("\n5. GET ALL");
    console.dir(allOrders, { depth: null });

    const foundOrder = allOrders.some(
      (order) => order.id === testOrderId,
    );

    if (!foundOrder) {
      throw new Error("GET ALL: test order was not found.");
    }

    // ==========================================
    // 6. UPDATE
    // ==========================================

    const updatedOrder = await orderRepository.update(testOrderId, {
      status: "PAID",
      paymentMethod: "paypal",
      discount: 15,
      total: 63,
    });

    console.log("\n6. UPDATE");
    console.dir(updatedOrder, { depth: null });

    if (updatedOrder.status !== "PAID") {
      throw new Error("UPDATE: status was not updated.");
    }

    if (updatedOrder.paymentMethod !== "paypal") {
      throw new Error("UPDATE: payment method was not updated.");
    }

    if (updatedOrder.discount !== 15) {
      throw new Error("UPDATE: discount was not updated.");
    }

    if (updatedOrder.total !== 63) {
      throw new Error("UPDATE: total was not updated.");
    }

    // ==========================================
    // 7. VERIFY UPDATE
    // ==========================================

    const verifiedOrder = await orderRepository.getById(testOrderId);

    console.log("\n7. VERIFY UPDATE");
    console.dir(verifiedOrder, { depth: null });

    if (!verifiedOrder) {
      throw new Error("VERIFY UPDATE: order was not found.");
    }

    if (verifiedOrder.status !== "PAID") {
      throw new Error("VERIFY UPDATE: status mismatch.");
    }

    // ==========================================
    // 8. DELETE ORDER
    // ==========================================

    const deletedOrder = await orderRepository.delete(testOrderId);

    console.log("\n8. DELETE");
    console.dir(deletedOrder, { depth: null });

    // ==========================================
    // 9. VERIFY ORDER DELETE
    // ==========================================

    const afterDelete = await orderRepository.getById(testOrderId);

    console.log("\n9. VERIFY ORDER DELETE");
    console.dir(afterDelete, { depth: null });

    if (afterDelete !== null) {
      throw new Error("VERIFY ORDER DELETE: order still exists.");
    }

    // ==========================================
    // 10. VERIFY BILLING DELETE
    // ==========================================

    const database = app.get(
      // Lấy DatabaseService trực tiếp để verify dữ liệu phụ
      // mà không thay đổi OrderRepository.
      require("./database/database.service").DatabaseService,
    );

    const billingAfterDelete = await database.orderBilling.findFirst({
      where: {
        orderId: testOrderId,
      },
    });

    console.log("\n10. VERIFY BILLING DELETE");
    console.dir(billingAfterDelete, { depth: null });

    if (billingAfterDelete !== null) {
      throw new Error("VERIFY BILLING DELETE: billing still exists.");
    }

    // ==========================================
    // 11. VERIFY ORDER ITEMS DELETE
    // ==========================================

    const itemsAfterDelete = await database.orderItem.findMany({
      where: {
        orderId: testOrderId,
      },
    });

    console.log("\n11. VERIFY ORDER ITEMS DELETE");
    console.dir(itemsAfterDelete, { depth: null });

    if (itemsAfterDelete.length !== 0) {
      throw new Error("VERIFY ORDER ITEMS DELETE: order items still exist.");
    }

    // ==========================================
    // CLEANUP TEST USER
    // ==========================================

    await userRepository.delete(testUserId);

    console.log("\nTest user deleted.");

    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log("\nORDER REPOSITORY TEST PASSED.");
  } catch (error) {
    console.error("\nORDER REPOSITORY TEST FAILED:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main();
