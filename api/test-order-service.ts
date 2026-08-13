const BASE_URL = "http://localhost:3000";

const TEST_USER_ID = "service-order-test-user-001";
const TEST_ORDER_ID = "service-test-order-001";
const TEST_ORDER_ID_2 = "service-test-order-002";

const TEST_USER_EMAIL = "service-order-test@example.com";

async function request(
  method: string,
  path: string,
  body?: unknown,
) {
  console.log(`\n${method} ${path}`);

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body:
      body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  const data = await response.json();

  console.log("Status:", response.status);
  console.log(data);

  return {
    status: response.status,
    data,
  };
}

// =====================================================
// RESPONSE VALIDATION
// =====================================================

function verifyApiResponse(response: {
  status: number;
  data: any;
}) {
  if (
    !response.data ||
    typeof response.data.success !== "boolean" ||
    typeof response.data.statusCode !== "number" ||
    typeof response.data.message !== "string"
  ) {
    throw new Error(
      "Response does not follow ApiResponse format.",
    );
  }
}

function verifySuccessResponse(
  response: {
    status: number;
    data: any;
  },
  expectedStatus: number,
) {
  verifyApiResponse(response);

  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${response.status}`,
    );
  }

  if (response.data.success !== true) {
    throw new Error(
      `Expected success=true, got ${response.data.success}`,
    );
  }

  if (!("data" in response.data)) {
    throw new Error(
      "Success response does not contain data.",
    );
  }
}

function verifyErrorResponse(
  response: {
    status: number;
    data: any;
  },
  expectedStatus: number,
) {
  verifyApiResponse(response);

  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${response.status}`,
    );
  }

  if (response.data.success !== false) {
    throw new Error(
      `Expected success=false, got ${response.data.success}`,
    );
  }
}

// =====================================================
// USER SETUP
// =====================================================

async function cleanupUser() {
  console.log(
    "\nCleaning previous service order test user...",
  );

  await request(
    "DELETE",
    `/users/${TEST_USER_ID}`,
  );
}

async function createTestUser() {
  console.log("\nCreating test user...");

  const existingUserResponse = await request(
    "GET",
    `/users/${TEST_USER_ID}`,
  );

  if (existingUserResponse.status === 200) {
    console.log(
      "Test user already exists. Using existing user.",
    );

    return;
  }

  if (existingUserResponse.status !== 404) {
    throw new Error(
      `Unexpected status while checking test user: ${existingUserResponse.status}`,
    );
  }

  const createUserResponse = await request(
    "POST",
    "/users",
    {
      id: TEST_USER_ID,
      name: "Order Service Test User",
      email: TEST_USER_EMAIL,
      role: "USER",
    },
  );

  verifySuccessResponse(
    createUserResponse,
    201,
  );

  console.log("CREATE TEST USER verified.");
}

// =====================================================
// ORDER CLEANUP
// =====================================================

async function cleanupOrder(id: string) {
  await request(
    "DELETE",
    `/orders/${id}`,
  );
}

// =====================================================
// CREATE ORDER HELPER
// =====================================================

function buildOrderData(
  id: string,
  status:
    | "PENDING"
    | "PAID"
    | "PROCESSING"
    | "COMPLETED"
    | "CANCELLED"
    | "FAILED" = "PENDING",
) {
  return {
    id,
    userId: TEST_USER_ID,

    status,

    paymentMethod: "card",

    subtotal: 59.98,
    discount: 10,
    total: 49.98,

    billing: {
      firstName: "Order",
      lastName: "Service",
      email: TEST_USER_EMAIL,
      phone: "0123456789",
      address: "123 Test Street",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      postalCode: "700000",
    },

    items: [
      {
        id: `${id}-item-001`,
        productId: "product-test-001",
        productName: "Test Product 1",
        unitPrice: 29.99,
        quantity: 1,
        subtotal: 29.99,
      },
      {
        id: `${id}-item-002`,
        productId: "product-test-002",
        productName: "Test Product 2",
        unitPrice: 29.99,
        quantity: 1,
        subtotal: 29.99,
      },
    ],
  };
}

// =====================================================
// MAIN TEST
// =====================================================

async function main() {
  console.log("\n=== ORDER SERVICE TEST ===");

  // ===================================================
  // CLEANUP
  // ===================================================

  await cleanupOrder(TEST_ORDER_ID);
  await cleanupOrder(TEST_ORDER_ID_2);

  await cleanupUser();

  // ===================================================
  // CREATE TEST USER
  // ===================================================

  await createTestUser();

  // ===================================================
  // CREATE
  // ===================================================

  console.log("\nTesting create()...");

  const createResponse = await request(
    "POST",
    "/orders",
    buildOrderData(TEST_ORDER_ID),
  );

  verifySuccessResponse(
    createResponse,
    201,
  );

  if (
    createResponse.data.data.id !==
    TEST_ORDER_ID
  ) {
    throw new Error(
      "CREATE returned incorrect order id.",
    );
  }

  if (
    createResponse.data.data.userId !==
    TEST_USER_ID
  ) {
    throw new Error(
      "CREATE returned incorrect userId.",
    );
  }

  if (
    createResponse.data.data.status !==
    "PENDING"
  ) {
    throw new Error(
      "CREATE did not set status to PENDING.",
    );
  }

  if (
    !createResponse.data.data.billing
  ) {
    throw new Error(
      "CREATE did not create billing information.",
    );
  }

  if (
    !Array.isArray(
      createResponse.data.data.items,
    )
  ) {
    throw new Error(
      "CREATE did not create order items.",
    );
  }

  if (
    createResponse.data.data.items.length !==
    2
  ) {
    throw new Error(
      "CREATE did not create all order items.",
    );
  }

  console.log("CREATE verified.");

  // ===================================================
  // GET BY ID
  // ===================================================

  console.log("\nTesting getById()...");

  const getByIdResponse = await request(
    "GET",
    `/orders/${TEST_ORDER_ID}`,
  );

  verifySuccessResponse(
    getByIdResponse,
    200,
  );

  if (
    getByIdResponse.data.data.id !==
    TEST_ORDER_ID
  ) {
    throw new Error(
      "GET BY ID returned incorrect order.",
    );
  }

  if (
    !getByIdResponse.data.data.user
  ) {
    throw new Error(
      "GET BY ID did not include user.",
    );
  }

  if (
    !getByIdResponse.data.data.billing
  ) {
    throw new Error(
      "GET BY ID did not include billing.",
    );
  }

  if (
    !Array.isArray(
      getByIdResponse.data.data.items,
    )
  ) {
    throw new Error(
      "GET BY ID did not include items.",
    );
  }

  console.log("GET BY ID verified.");

  // ===================================================
  // GET BY USER ID
  // ===================================================

  console.log("\nTesting getByUserId()...");

  const getByUserResponse = await request(
    "GET",
    `/orders/user/${TEST_USER_ID}`,
  );

  verifySuccessResponse(
    getByUserResponse,
    200,
  );

  if (
    !Array.isArray(
      getByUserResponse.data.data,
    )
  ) {
    throw new Error(
      "GET BY USER ID did not return an array.",
    );
  }

  const userOrderExists =
    getByUserResponse.data.data.some(
      (order: any) =>
        order.id === TEST_ORDER_ID,
    );

  if (!userOrderExists) {
    throw new Error(
      "GET BY USER ID did not contain test order.",
    );
  }

  console.log("GET BY USER ID verified.");

  // ===================================================
  // GET BY STATUS
  // ===================================================

  console.log(
    "\nTesting getByStatus()...",
  );

  const getByStatusResponse = await request(
    "GET",
    "/orders/status/PENDING",
  );

  verifySuccessResponse(
    getByStatusResponse,
    200,
  );

  if (
    !Array.isArray(
      getByStatusResponse.data.data,
    )
  ) {
    throw new Error(
      "GET BY STATUS did not return an array.",
    );
  }

  const statusOrderExists =
    getByStatusResponse.data.data.some(
      (order: any) =>
        order.id === TEST_ORDER_ID &&
        order.status === "PENDING",
    );

  if (!statusOrderExists) {
    throw new Error(
      "GET BY STATUS did not contain test order.",
    );
  }

  console.log("GET BY STATUS verified.");

  // ===================================================
  // GET ALL
  // ===================================================

  console.log("\nTesting getAll()...");

  const getAllResponse = await request(
    "GET",
    "/orders",
  );

  verifySuccessResponse(
    getAllResponse,
    200,
  );

  if (
    !Array.isArray(
      getAllResponse.data.data,
    )
  ) {
    throw new Error(
      "GET ALL did not return an array.",
    );
  }

  const allOrderExists =
    getAllResponse.data.data.some(
      (order: any) =>
        order.id === TEST_ORDER_ID,
    );

  if (!allOrderExists) {
    throw new Error(
      "GET ALL did not contain test order.",
    );
  }

  console.log("GET ALL verified.");

  // ===================================================
  // UPDATE
  // ===================================================

  console.log("\nTesting update()...");

  const updateResponse = await request(
    "PATCH",
    `/orders/${TEST_ORDER_ID}`,
    {
      status: "PAID",
      paymentMethod: "paypal",
      subtotal: 79.98,
      discount: 20,
      total: 59.98,
    },
  );

  verifySuccessResponse(
    updateResponse,
    200,
  );

  if (
    updateResponse.data.data.status !==
    "PAID"
  ) {
    throw new Error(
      "UPDATE did not update status.",
    );
  }

  if (
    updateResponse.data.data.paymentMethod !==
    "paypal"
  ) {
    throw new Error(
      "UPDATE did not update paymentMethod.",
    );
  }

  if (
    updateResponse.data.data.total !==
    59.98
  ) {
    throw new Error(
      "UPDATE did not update total.",
    );
  }

  console.log("UPDATE verified.");

  // ===================================================
  // VERIFY UPDATE
  // ===================================================

  console.log("\nTesting verify update()...");

  const verifyUpdateResponse = await request(
    "GET",
    `/orders/${TEST_ORDER_ID}`,
  );

  verifySuccessResponse(
    verifyUpdateResponse,
    200,
  );

  if (
    verifyUpdateResponse.data.data.status !==
    "PAID"
  ) {
    throw new Error(
      "VERIFY UPDATE failed for status.",
    );
  }

  if (
    verifyUpdateResponse.data.data.total !==
    59.98
  ) {
    throw new Error(
      "VERIFY UPDATE failed for total.",
    );
  }

  console.log("VERIFY UPDATE verified.");

  // ===================================================
  // NOT FOUND - GET BY ID
  // ===================================================

  console.log(
    "\nTesting getById() NotFoundException...",
  );

  const notFoundIdResponse = await request(
    "GET",
    "/orders/service-order-does-not-exist",
  );

  verifyErrorResponse(
    notFoundIdResponse,
    404,
  );

  console.log(
    "GET BY ID NotFoundException verified.",
  );

  // ===================================================
  // NOT FOUND - UPDATE
  // ===================================================

  console.log(
    "\nTesting update() NotFoundException...",
  );

  const updateNotFoundResponse = await request(
    "PATCH",
    "/orders/service-order-does-not-exist",
    {
      status: "PAID",
    },
  );

  verifyErrorResponse(
    updateNotFoundResponse,
    404,
  );

  console.log(
    "UPDATE NotFoundException verified.",
  );

  // ===================================================
  // NOT FOUND - DELETE
  // ===================================================

  console.log(
    "\nTesting delete() NotFoundException...",
  );

  const deleteNotFoundResponse = await request(
    "DELETE",
    "/orders/service-order-does-not-exist",
  );

  verifyErrorResponse(
    deleteNotFoundResponse,
    404,
  );

  console.log(
    "DELETE NotFoundException verified.",
  );

  // ===================================================
  // DUPLICATE ORDER ID
  // ===================================================

  console.log(
    "\nTesting duplicate order ID ConflictException...",
  );

  const duplicateOrderResponse = await request(
    "POST",
    "/orders",
    buildOrderData(TEST_ORDER_ID),
  );

  verifyErrorResponse(
    duplicateOrderResponse,
    409,
  );

  console.log(
    "Duplicate order ID ConflictException verified.",
  );

  // ===================================================
  // INVALID USER
  // ===================================================

  console.log(
    "\nTesting invalid userId BadRequestException...",
  );

  const invalidUserResponse = await request(
    "POST",
    "/orders",
    {
      ...buildOrderData(
        "service-test-order-invalid-user",
      ),

      userId:
        "service-order-user-does-not-exist",
    },
  );

  verifyErrorResponse(
    invalidUserResponse,
    400,
  );

  console.log(
    "Invalid userId BadRequestException verified.",
  );

  // ===================================================
  // CREATE SECOND ORDER
  // ===================================================

  console.log(
    "\nCreating second order for status testing...",
  );

  const secondOrderResponse = await request(
    "POST",
    "/orders",
    buildOrderData(
      TEST_ORDER_ID_2,
      "PROCESSING",
    ),
  );

  verifySuccessResponse(
    secondOrderResponse,
    201,
  );

  console.log(
    "SECOND ORDER CREATE verified.",
  );

  // ===================================================
  // STATUS PROCESSING
  // ===================================================

  console.log(
    "\nTesting getByStatus(PROCESSING)...",
  );

  const processingResponse = await request(
    "GET",
    "/orders/status/PROCESSING",
  );

  verifySuccessResponse(
    processingResponse,
    200,
  );

  const processingOrderExists =
    processingResponse.data.data.some(
      (order: any) =>
        order.id === TEST_ORDER_ID_2 &&
        order.status === "PROCESSING",
    );

  if (!processingOrderExists) {
    throw new Error(
      "GET BY STATUS PROCESSING did not contain second order.",
    );
  }

  console.log(
    "GET BY STATUS PROCESSING verified.",
  );

  // ===================================================
  // DELETE FIRST ORDER
  // ===================================================

  console.log(
    "\nTesting delete()...",
  );

  const deleteResponse = await request(
    "DELETE",
    `/orders/${TEST_ORDER_ID}`,
  );

  verifySuccessResponse(
    deleteResponse,
    200,
  );

  if (
    deleteResponse.data.data.id !==
    TEST_ORDER_ID
  ) {
    throw new Error(
      "DELETE returned incorrect order.",
    );
  }

  console.log("DELETE verified.");

  // ===================================================
  // VERIFY DELETE
  // ===================================================

  console.log(
    "\nTesting verify delete()...",
  );

  const verifyDeleteResponse = await request(
    "GET",
    `/orders/${TEST_ORDER_ID}`,
  );

  verifyErrorResponse(
    verifyDeleteResponse,
    404,
  );

  console.log(
    "VERIFY DELETE NotFoundException verified.",
  );

  // ===================================================
  // CLEANUP SECOND ORDER
  // ===================================================

  console.log(
    "\nPerforming final cleanup...",
  );

  await cleanupOrder(TEST_ORDER_ID_2);

  // ===================================================
  // CLEANUP USER
  // ===================================================

  await request(
    "DELETE",
    `/users/${TEST_USER_ID}`,
  );

  console.log("\nORDER SERVICE TEST PASSED.");
}

// =====================================================
// RUN
// =====================================================

main().catch((error) => {
  console.error(
    "\nORDER SERVICE TEST FAILED:",
  );

  console.error(error);

  process.exit(1);
});