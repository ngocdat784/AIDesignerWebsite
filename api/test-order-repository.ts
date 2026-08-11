import { prisma } from "./lib/prisma";
import { orderRepository } from "./repositories/order.repository";

const USER_ID = "order-test-user-001";
const ORDER_ID = "order-test-001";

async function main() {
  console.log("\nORDER REPOSITORY TEST\n");

  // =========================
  // Cleanup previous test data
  // =========================

  await prisma.orderItem.deleteMany({
    where: {
      orderId: ORDER_ID,
    },
  });

  await prisma.orderBilling.deleteMany({
    where: {
      orderId: ORDER_ID,
    },
  });

  await prisma.order.deleteMany({
    where: {
      id: ORDER_ID,
    },
  });

  await prisma.user.deleteMany({
    where: {
      id: USER_ID,
    },
  });

  console.log("Cleaned previous test data.\n");

  // =========================
  // Create test user
  // =========================

  const user = await prisma.user.create({
    data: {
      id: USER_ID,
      name: "Order Test User",
      email: "order-test@example.com",
      role: "USER",
    },
  });

  console.log("Test user created:");
  console.dir(user, { depth: null });

  // =========================
  // 1. CREATE
  // =========================

  const order = await orderRepository.create({
    id: ORDER_ID,
    userId: USER_ID,

    paymentMethod: "card",

    subtotal: 78,
    discount: 10,
    total: 68,

    billing: {
      firstName: "Order",
      lastName: "Tester",
      email: "order-test@example.com",
      phone: "0123456789",
      address: "123 Test Street",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      postalCode: "700000",
    },

    items: [
      {
        id: "order-item-test-001",
        productId: "template-test-001",
        productName: "AI Dashboard Template",
        unitPrice: 29,
        quantity: 2,
        subtotal: 58,
      },
      {
        id: "order-item-test-002",
        productId: "template-test-002",
        productName: "Modern SaaS Template",
        unitPrice: 20,
        quantity: 1,
        subtotal: 20,
      },
    ],
  });

  console.log("\n1. CREATE");
  console.dir(order, { depth: null });

  // =========================
  // 2. GET BY ID
  // =========================

  const byId = await orderRepository.getById(
    ORDER_ID
  );

  console.log("\n2. GET BY ID");
  console.dir(byId, { depth: null });

  // =========================
  // 3. GET BY USER
  // =========================

  const byUser =
    await orderRepository.getByUserId(USER_ID);

  console.log("\n3. GET BY USER ID");
  console.dir(byUser, { depth: null });

  // =========================
  // 4. GET BY STATUS
  // =========================

  const pending =
    await orderRepository.getByStatus("PENDING");

  console.log("\n4. GET BY STATUS");
  console.dir(pending, { depth: null });

  // =========================
  // 5. GET ALL
  // =========================

  const all = await orderRepository.getAll();

  console.log("\n5. GET ALL");
  console.dir(all, { depth: null });

  // =========================
  // 6. UPDATE
  // =========================

  const updated =
    await orderRepository.update(
      ORDER_ID,
      {
        status: "PAID",
        paymentMethod: "paypal",
        discount: 15,
        total: 63,
      }
    );

  console.log("\n6. UPDATE");
  console.dir(updated, { depth: null });

  // =========================
  // 7. DELETE
  // =========================

  const deleted =
    await orderRepository.delete(ORDER_ID);

  console.log("\n7. DELETE");
  console.dir(deleted, { depth: null });

  // =========================
  // 8. VERIFY ORDER DELETE
  // =========================

  const deletedOrder =
    await prisma.order.findUnique({
      where: {
        id: ORDER_ID,
      },
    });

  console.log("\n8. VERIFY ORDER DELETE");
  console.log(deletedOrder);

  // =========================
  // 9. VERIFY BILLING DELETE
  // =========================

  const billing =
    await prisma.orderBilling.findUnique({
      where: {
        orderId: ORDER_ID,
      },
    });

  console.log("\n9. VERIFY BILLING DELETE");
  console.log(billing);

  // =========================
  // 10. VERIFY ITEMS DELETE
  // =========================

  const items =
    await prisma.orderItem.findMany({
      where: {
        orderId: ORDER_ID,
      },
    });

  console.log("\n10. VERIFY ORDER ITEMS DELETE");
  console.log(items);

  // =========================
  // Cleanup USER
  // =========================

  await prisma.user.delete({
    where: {
      id: USER_ID,
    },
  });

  console.log("\nTest user deleted.");

  console.log("\nORDER REPOSITORY TEST COMPLETED.");
}

main()
  .catch((error) => {
    console.error("\nTEST FAILED:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });