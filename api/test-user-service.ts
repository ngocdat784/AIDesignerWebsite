const BASE_URL = "http://localhost:3000";

const testUserId = "service-test-user-001";
const testEmail = "service-test@example.com";

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
    body:
      body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  const text = await response.text();

  let data: any;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  console.log(`\n${method} ${path}`);
  console.log(`Status: ${response.status}`);
  console.dir(data, { depth: null });

  return {
    response,
    data,
  };
}

function verifyApiResponse(data: any) {
  if (
    !data ||
    typeof data !== "object" ||
    data.success !== true ||
    typeof data.statusCode !== "number" ||
    !("data" in data)
  ) {
    throw new Error(
      "Response does not follow ApiResponse format.",
    );
  }
}

function verifyApiError(
  data: any,
  expectedStatus: number,
) {
  if (
    !data ||
    typeof data !== "object" ||
    data.success !== false ||
    data.statusCode !== expectedStatus ||
    !data.message ||
    !data.error
  ) {
    throw new Error(
      `Response does not follow ApiErrorResponse format. Expected ${expectedStatus}.`,
    );
  }
}

async function main() {
  console.log("\n=== USER SERVICE TEST ===\n");

  try {
    // ==========================================
    // 0. CLEANUP
    // ==========================================

    console.log("Cleaning previous service test user...");

    await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    // ==========================================
    // 1. CREATE USER
    // ==========================================

    const createResult = await request(
      "POST",
      "/users",
      {
        id: testUserId,
        name: "Service Test User",
        email: testEmail,
        role: "USER",
      },
    );

    if (createResult.response.status !== 201) {
      throw new Error(
        `Expected CREATE status 201, got ${createResult.response.status}`,
      );
    }

    verifyApiResponse(createResult.data);

    if (
      createResult.data.data.id !== testUserId
    ) {
      throw new Error(
        "CREATE returned incorrect user.",
      );
    }

    console.log("CREATE verified.");

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const getByIdResult = await request(
      "GET",
      `/users/${testUserId}`,
    );

    if (getByIdResult.response.status !== 200) {
      throw new Error(
        `Expected GET BY ID status 200, got ${getByIdResult.response.status}`,
      );
    }

    verifyApiResponse(getByIdResult.data);

    if (
      getByIdResult.data.data.id !== testUserId
    ) {
      throw new Error(
        "GET BY ID returned incorrect user.",
      );
    }

    console.log("GET BY ID verified.");

    // ==========================================
    // 3. GET BY ID - NOT FOUND
    // ==========================================

    console.log(
      "Testing getById() NotFoundException...",
    );

    const notFoundIdResult = await request(
      "GET",
      "/users/service-user-does-not-exist",
    );

    if (notFoundIdResult.response.status !== 404) {
      throw new Error(
        `Expected 404, got ${notFoundIdResult.response.status}`,
      );
    }

    verifyApiError(
      notFoundIdResult.data,
      404,
    );

    console.log(
      "GET BY ID NotFoundException verified.",
    );

    // ==========================================
    // 4. GET BY EMAIL
    // ==========================================

    const getByEmailResult = await request(
      "GET",
      `/users/email/${encodeURIComponent(testEmail)}`,
    );

    if (getByEmailResult.response.status !== 200) {
      throw new Error(
        `Expected GET BY EMAIL status 200, got ${getByEmailResult.response.status}`,
      );
    }

    verifyApiResponse(getByEmailResult.data);

    if (
      getByEmailResult.data.data.email !==
      testEmail
    ) {
      throw new Error(
        "GET BY EMAIL returned incorrect user.",
      );
    }

    console.log("GET BY EMAIL verified.");

    // ==========================================
    // 5. GET BY EMAIL - NOT FOUND
    // ==========================================

    console.log(
      "Testing getByEmail() NotFoundException...",
    );

    const notFoundEmailResult = await request(
      "GET",
      "/users/email/not-exist-service@example.com",
    );

    if (
      notFoundEmailResult.response.status !== 404
    ) {
      throw new Error(
        `Expected 404, got ${notFoundEmailResult.response.status}`,
      );
    }

    verifyApiError(
      notFoundEmailResult.data,
      404,
    );

    console.log(
      "GET BY EMAIL NotFoundException verified.",
    );

    // ==========================================
    // 6. UPDATE EXISTING USER
    // ==========================================

    const updateResult = await request(
      "PATCH",
      `/users/${testUserId}`,
      {
        name: "Updated Service Test User",
      },
    );

    if (updateResult.response.status !== 200) {
      throw new Error(
        `Expected UPDATE status 200, got ${updateResult.response.status}`,
      );
    }

    verifyApiResponse(updateResult.data);

    if (
      updateResult.data.data.name !==
      "Updated Service Test User"
    ) {
      throw new Error(
        "UPDATE returned incorrect user.",
      );
    }

    console.log("UPDATE verified.");

    // ==========================================
    // 7. UPDATE NON-EXISTENT USER
    // ==========================================

    console.log(
      "Testing update() NotFoundException...",
    );

    const updateNotFoundResult = await request(
      "PATCH",
      "/users/service-user-does-not-exist",
      {
        name: "Should Fail",
      },
    );

    if (
      updateNotFoundResult.response.status !== 404
    ) {
      throw new Error(
        `Expected UPDATE 404, got ${updateNotFoundResult.response.status}`,
      );
    }

    verifyApiError(
      updateNotFoundResult.data,
      404,
    );

    console.log(
      "UPDATE NotFoundException verified.",
    );

    // ==========================================
    // 8. DELETE NON-EXISTENT USER
    // ==========================================

    console.log(
      "Testing delete() NotFoundException...",
    );

    const deleteNotFoundResult = await request(
      "DELETE",
      "/users/service-user-does-not-exist",
    );

    if (
      deleteNotFoundResult.response.status !== 404
    ) {
      throw new Error(
        `Expected DELETE 404, got ${deleteNotFoundResult.response.status}`,
      );
    }

    verifyApiError(
      deleteNotFoundResult.data,
      404,
    );

    console.log(
      "DELETE NotFoundException verified.",
    );

    // ==========================================
    // 9. DUPLICATE EMAIL - CONFLICT
    // ==========================================

    console.log(
      "Testing duplicate email ConflictException...",
    );

    const duplicateEmailResult = await request(
      "POST",
      "/users",
      {
        id: "service-test-user-002",
        name: "Duplicate Email User",
        email: testEmail,
        role: "USER",
      },
    );

    if (
      duplicateEmailResult.response.status !== 409
    ) {
      throw new Error(
        `Expected duplicate email status 409, got ${duplicateEmailResult.response.status}`,
      );
    }

    verifyApiError(
      duplicateEmailResult.data,
      409,
    );

    console.log(
      "Duplicate email ConflictException verified.",
    );

    // ==========================================
    // 10. DELETE EXISTING USER
    // ==========================================

    const deleteResult = await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    if (deleteResult.response.status !== 200) {
      throw new Error(
        `Expected DELETE status 200, got ${deleteResult.response.status}`,
      );
    }

    verifyApiResponse(deleteResult.data);

    if (
      deleteResult.data.data.id !== testUserId
    ) {
      throw new Error(
        "DELETE returned incorrect user.",
      );
    }

    console.log("DELETE verified.");

    // ==========================================
    // 11. VERIFY DELETE
    // ==========================================

    const verifyDeleteResult = await request(
      "GET",
      `/users/${testUserId}`,
    );

    if (
      verifyDeleteResult.response.status !== 404
    ) {
      throw new Error(
        `Expected VERIFY DELETE status 404, got ${verifyDeleteResult.response.status}`,
      );
    }

    verifyApiError(
      verifyDeleteResult.data,
      404,
    );

    console.log(
      "VERIFY DELETE NotFoundException verified.",
    );

    // ==========================================
    // FINAL
    // ==========================================

    console.log(
      "\nUSER SERVICE TEST PASSED.",
    );
  } catch (error) {
    console.error(
      "\nUSER SERVICE TEST FAILED:",
    );

    console.error(error);

    process.exitCode = 1;
  }
}

main();