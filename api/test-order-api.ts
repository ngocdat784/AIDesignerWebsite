import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const BASE_URL = "http://localhost:3000";

const testUserId = "api-test-order-user-001";
const testOrderId = "api-test-order-001";

async function request(
  method: string,
  path: string,
  body?: unknown,
) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  try {
    const parsed = await response.json();
    data = parsed && parsed.data !== undefined ? parsed.data : parsed;
  } catch {
    data = null;
  }

  console.log(`${method} ${path}`);
  console.log("Status:", response.status);

  if (data !== null) {
    console.dir(data, { depth: null });
  }

  console.log("");

  return {
    status: response.status,
    data,
  };
}

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("\n=== ORDER API TEST ===\n");

  try {
    // =========================================================
    // CLEANUP
    // =========================================================

    console.log("Cleaning previous test data...");

    // Delete old order if it exists.
    // Nếu không tồn tại thì API có thể trả 500/P2025,
    // nhưng không ảnh hưởng đến test nên bỏ qua.
    await request(
      "DELETE",
      `/orders/${testOrderId}`,
    );

    // Delete old test user if it exists.
    await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    console.log("Cleanup completed.\n");

    // =========================================================
    // CREATE TEST USER
    // =========================================================

    const createUser = await request(
      "POST",
      "/users",
      {
        id: testUserId,
        name: "Order API Test User",
        avatar: null,
        email: "api-order-user@example.com",
        role: "USER",
      },
    );

    if (createUser.status !== 201) {
      throw new Error("CREATE TEST USER failed.");
    }

    console.log("CREATE TEST USER verified.\n");

    // =========================================================
    // CREATE ORDER
    // =========================================================

    const createOrder = await request(
      "POST",
      "/orders",
      {
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
          email: "api-order-user@example.com",
          phone: "0123456789",
          address: "123 Test Street",
          city: "Ho Chi Minh City",
          country: "Vietnam",
          postalCode: "700000",
        },

        items: [
          {
            id: "api-test-order-item-001",
            productId: "template-test-001",
            productName: "AI Dashboard Template",
            unitPrice: 29,
            quantity: 2,
            subtotal: 58,
          },
          {
            id: "api-test-order-item-002",
            productId: "template-test-002",
            productName: "Modern SaaS Template",
            unitPrice: 20,
            quantity: 1,
            subtotal: 20,
          },
        ],
      },
    );

    if (createOrder.status !== 201) {
      throw new Error("CREATE ORDER failed.");
    }

    if (createOrder.data?.id !== testOrderId) {
      throw new Error("CREATE ORDER returned incorrect ID.");
    }

    if (createOrder.data?.userId !== testUserId) {
      throw new Error("CREATE ORDER returned incorrect userId.");
    }

    if (!createOrder.data?.billing) {
      throw new Error("CREATE ORDER did not return billing.");
    }

    if (
      !Array.isArray(createOrder.data?.items) ||
      createOrder.data.items.length !== 2
    ) {
      throw new Error(
        "CREATE ORDER did not return expected order items.",
      );
    }

    console.log("CREATE ORDER verified.");
    console.log("CREATE relations verified.\n");

    // =========================================================
    // GET BY ID
    // =========================================================

    const getById = await request(
      "GET",
      `/orders/${testOrderId}`,
    );

    if (getById.status !== 200) {
      throw new Error("GET BY ID failed.");
    }

    if (getById.data?.id !== testOrderId) {
      throw new Error("GET BY ID returned incorrect order.");
    }

    if (getById.data?.user?.id !== testUserId) {
      throw new Error(
        "GET BY ID did not return correct user relation.",
      );
    }

    if (!getById.data?.billing) {
      throw new Error(
        "GET BY ID did not return billing relation.",
      );
    }

    if (
      !Array.isArray(getById.data?.items) ||
      getById.data.items.length !== 2
    ) {
      throw new Error(
        "GET BY ID did not return order items.",
      );
    }

    console.log("GET BY ID verified.\n");

    // =========================================================
    // GET BY USER ID
    // =========================================================

    const getByUserId = await request(
      "GET",
      `/orders/user/${testUserId}`,
    );

    if (getByUserId.status !== 200) {
      throw new Error("GET BY USER ID failed.");
    }

    if (!Array.isArray(getByUserId.data)) {
      throw new Error(
        "GET BY USER ID did not return an array.",
      );
    }

    const foundByUser = getByUserId.data.some(
      (order: any) => order.id === testOrderId,
    );

    if (!foundByUser) {
      throw new Error(
        "GET BY USER ID did not return test order.",
      );
    }

    console.log("GET BY USER ID verified.\n");

    // =========================================================
    // GET BY STATUS
    // =========================================================

    const getByStatus = await request(
      "GET",
      "/orders/status/PENDING",
    );

    if (getByStatus.status !== 200) {
      throw new Error("GET BY STATUS failed.");
    }

    if (!Array.isArray(getByStatus.data)) {
      throw new Error(
        "GET BY STATUS did not return an array.",
      );
    }

    const foundByStatus = getByStatus.data.some(
      (order: any) =>
        order.id === testOrderId &&
        order.status === "PENDING",
    );

    if (!foundByStatus) {
      throw new Error(
        "GET BY STATUS did not return test order.",
      );
    }

    console.log("GET BY STATUS verified.\n");

    // =========================================================
    // GET ALL
    // =========================================================

    const getAll = await request(
      "GET",
      "/orders",
    );

    if (getAll.status !== 200) {
      throw new Error("GET ALL failed.");
    }

    if (!Array.isArray(getAll.data)) {
      throw new Error(
        "GET ALL did not return an array.",
      );
    }

    const foundInAll = getAll.data.some(
      (order: any) => order.id === testOrderId,
    );

    if (!foundInAll) {
      throw new Error(
        "GET ALL did not return test order.",
      );
    }

    console.log("GET ALL verified.\n");

    // =========================================================
    // PATCH
    // =========================================================

    const updateOrder = await request(
      "PATCH",
      `/orders/${testOrderId}`,
      {
        status: "PAID",
        paymentMethod: "paypal",

        subtotal: 78,
        discount: 15,
        total: 63,
      },
    );

    if (updateOrder.status !== 200) {
      throw new Error("UPDATE ORDER failed.");
    }

    if (updateOrder.data?.status !== "PAID") {
      throw new Error(
        "UPDATE ORDER did not update status.",
      );
    }

    if (
      updateOrder.data?.paymentMethod !== "paypal"
    ) {
      throw new Error(
        "UPDATE ORDER did not update paymentMethod.",
      );
    }

    if (updateOrder.data?.discount !== 15) {
      throw new Error(
        "UPDATE ORDER did not update discount.",
      );
    }

    if (updateOrder.data?.total !== 63) {
      throw new Error(
        "UPDATE ORDER did not update total.",
      );
    }

    console.log("UPDATE verified.\n");

    // =========================================================
    // VERIFY PATCH
    // =========================================================

    const verifyUpdate = await request(
      "GET",
      `/orders/${testOrderId}`,
    );

    if (verifyUpdate.status !== 200) {
      throw new Error(
        "VERIFY UPDATE GET failed.",
      );
    }

    if (verifyUpdate.data?.status !== "PAID") {
      throw new Error(
        "VERIFY UPDATE: status was not persisted.",
      );
    }

    if (
      verifyUpdate.data?.paymentMethod !== "paypal"
    ) {
      throw new Error(
        "VERIFY UPDATE: paymentMethod was not persisted.",
      );
    }

    if (verifyUpdate.data?.discount !== 15) {
      throw new Error(
        "VERIFY UPDATE: discount was not persisted.",
      );
    }

    if (verifyUpdate.data?.total !== 63) {
      throw new Error(
        "VERIFY UPDATE: total was not persisted.",
      );
    }

    // Relations must still exist after update.
    if (!verifyUpdate.data?.billing) {
      throw new Error(
        "VERIFY UPDATE: billing relation missing.",
      );
    }

    if (
      !Array.isArray(verifyUpdate.data?.items) ||
      verifyUpdate.data.items.length !== 2
    ) {
      throw new Error(
        "VERIFY UPDATE: order items missing.",
      );
    }

    if (verifyUpdate.data?.user?.id !== testUserId) {
      throw new Error(
        "VERIFY UPDATE: user relation incorrect.",
      );
    }

    console.log("VERIFY UPDATE verified.\n");

    // =========================================================
    // DELETE ORDER
    // =========================================================

    const deleteOrder = await request(
      "DELETE",
      `/orders/${testOrderId}`,
    );

    if (deleteOrder.status !== 200) {
      throw new Error("DELETE ORDER failed.");
    }

    if (deleteOrder.data?.id !== testOrderId) {
      throw new Error(
        "DELETE ORDER returned incorrect order.",
      );
    }

    console.log("DELETE ORDER verified.\n");

    // =========================================================
    // VERIFY ORDER DELETE
    // =========================================================

    const verifyOrderDelete = await request(
      "GET",
      `/orders/${testOrderId}`,
    );

    if (verifyOrderDelete.status !== 200) {
      throw new Error(
        "VERIFY ORDER DELETE GET failed.",
      );
    }

    if (verifyOrderDelete.data !== null) {
      throw new Error(
        "VERIFY ORDER DELETE: order still exists.",
      );
    }

    console.log("VERIFY ORDER DELETE verified.\n");

    // =========================================================
    // DELETE TEST USER
    // =========================================================

    const deleteUser = await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    if (deleteUser.status !== 200) {
      throw new Error(
        "DELETE TEST USER failed.",
      );
    }

    if (deleteUser.data?.id !== testUserId) {
      throw new Error(
        "DELETE TEST USER returned incorrect user.",
      );
    }

    console.log("DELETE TEST USER verified.\n");

    // =========================================================
    // VERIFY USER DELETE
    // =========================================================

    const verifyUserDelete = await request(
      "GET",
      `/users/${testUserId}`,
    );

    // Accept either 200 + null (some endpoints) or 404 Not Found.
    if (!(
      (verifyUserDelete.status === 200 && verifyUserDelete.data === null) ||
      verifyUserDelete.status === 404
    )) {
      throw new Error(
        "VERIFY USER DELETE GET failed.",
      );
    }

    console.log(
      "VERIFY TEST USER DELETE verified.\n",
    );

    // =========================================================
    // SUCCESS
    // =========================================================

    console.log("==============================");
    console.log("ORDER API TEST PASSED.");
    console.log("==============================\n");
  } catch (error) {
    console.error("\nORDER API TEST FAILED:");

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  } finally {
    // Close the server application when test finishes
    try {
      await app.close();
    } catch (e) {
      // ignore
    }
  }
}

main();
export {};