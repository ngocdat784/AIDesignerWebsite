const BASE_URL = "http://localhost:3000";

const testUserId = "api-test-user-001";
const testEmail = "api-test@example.com";

interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error?: string;
  path?: string;
  timestamp?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  role: "USER" | "CREATOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

async function request(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  let data: unknown;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  console.log(`\n${method} ${path}`);
  console.log(`Status: ${response.status}`);
  console.dir(data, { depth: null });

  if (!response.ok) {
    throw new Error(
      `${method} ${path} failed with status ${response.status}`,
    );
  }

  return data;
}

function getData<T>(response: unknown): T {
  if (
    !response ||
    typeof response !== "object" ||
    !("success" in response) ||
    !("data" in response)
  ) {
    throw new Error("Invalid API response format.");
  }

  const apiResponse = response as ApiResponse<T>;

  if (apiResponse.success !== true) {
    throw new Error("API response success flag is false.");
  }

  return apiResponse.data;
}

function verifyApiResponse(response: unknown) {
  if (
    !response ||
    typeof response !== "object" ||
    !("success" in response)
  ) {
    throw new Error("Response does not follow ApiResponse format.");
  }

  const apiResponse = response as ApiResponse;

  if (apiResponse.success !== true) {
    throw new Error("Expected success=true.");
  }

  if (!("data" in apiResponse)) {
    throw new Error("ApiResponse is missing data.");
  }
}

async function main() {
  console.log("\n=== USER API TEST ===\n");

  try {
    // ==========================================
    // 0. CLEANUP
    // ==========================================

    console.log("Cleaning previous test user...");

    try {
      await request(
        "DELETE",
        `/users/${testUserId}`,
      );
    } catch {
      // User may not exist, ignore cleanup error.
    }

    // ==========================================
    // 1. CREATE
    // ==========================================

    const createResponse = await request(
      "POST",
      "/users",
      {
        id: testUserId,
        name: "API Test User",
        email: testEmail,
        role: "USER",
      },
    );

    verifyApiResponse(createResponse);

    const createdUser = getData<User>(createResponse);

    if (
      !createdUser ||
      createdUser.id !== testUserId
    ) {
      throw new Error("CREATE returned invalid user.");
    }

    console.log("CREATE verified.");

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const getByIdResponse = await request(
      "GET",
      `/users/${testUserId}`,
    );

    verifyApiResponse(getByIdResponse);

    const userById = getData<User>(getByIdResponse);

    if (
      !userById ||
      userById.id !== testUserId
    ) {
      throw new Error(
        "GET BY ID returned invalid user.",
      );
    }

    console.log("GET BY ID verified.");

    // ==========================================
    // 3. GET BY EMAIL
    // ==========================================

    const getByEmailResponse = await request(
      "GET",
      `/users/email/${encodeURIComponent(testEmail)}`,
    );

    verifyApiResponse(getByEmailResponse);

    const userByEmail =
      getData<User>(getByEmailResponse);

    if (
      !userByEmail ||
      userByEmail.email !== testEmail
    ) {
      throw new Error(
        "GET BY EMAIL returned invalid user.",
      );
    }

    console.log("GET BY EMAIL verified.");

    // ==========================================
    // 4. GET ALL
    // ==========================================

    const getAllResponse = await request(
      "GET",
      "/users",
    );

    verifyApiResponse(getAllResponse);

    const allUsers =
      getData<User[]>(getAllResponse);

    if (!Array.isArray(allUsers)) {
      throw new Error(
        "GET ALL did not return an array.",
      );
    }

    const foundUser = allUsers.find(
      (user) => user.id === testUserId,
    );

    if (!foundUser) {
      throw new Error(
        "GET ALL did not contain the test user.",
      );
    }

    console.log("GET ALL verified.");

    // ==========================================
    // 5. UPDATE
    // ==========================================

    const updateResponse = await request(
      "PATCH",
      `/users/${testUserId}`,
      {
        name: "Updated API Test User",
        role: "CREATOR",
      },
    );

    verifyApiResponse(updateResponse);

    const updatedUser =
      getData<User>(updateResponse);

    if (
      !updatedUser ||
      updatedUser.name !==
        "Updated API Test User" ||
      updatedUser.role !== "CREATOR"
    ) {
      throw new Error(
        "UPDATE returned invalid data.",
      );
    }

    console.log("UPDATE verified.");

    // ==========================================
    // 6. VERIFY UPDATE
    // ==========================================

    const verifyUpdateResponse = await request(
      "GET",
      `/users/${testUserId}`,
    );

    verifyApiResponse(verifyUpdateResponse);

    const verifiedUser =
      getData<User>(verifyUpdateResponse);

    if (
      !verifiedUser ||
      verifiedUser.name !==
        "Updated API Test User" ||
      verifiedUser.role !== "CREATOR"
    ) {
      throw new Error(
        "VERIFY UPDATE failed.",
      );
    }

    console.log("VERIFY UPDATE verified.");

    // ==========================================
    // 7. VALIDATION ERROR
    // ==========================================

    console.log(
      "\nTesting validation error...",
    );

    const validationResponse = await fetch(
      `${BASE_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "",
          name: "",
          email: "invalid-email",
          role: "INVALID_ROLE",
        }),
      },
    );

    const validationText =
      await validationResponse.text();

    let validationData: unknown;

    try {
      validationData = validationText
        ? JSON.parse(validationText)
        : null;
    } catch {
      validationData = validationText;
    }

    console.log("\nPOST /users [VALIDATION ERROR]");
    console.log(
      `Status: ${validationResponse.status}`,
    );
    console.dir(validationData, {
      depth: null,
    });

    if (validationResponse.status !== 400) {
      throw new Error(
        `Expected validation status 400, got ${validationResponse.status}`,
      );
    }

    if (
      !validationData ||
      typeof validationData !== "object"
    ) {
      throw new Error(
        "Validation error response is invalid.",
      );
    }

    const validationError =
      validationData as ApiErrorResponse;

    if (validationError.success !== false) {
      throw new Error(
        "Validation error must have success=false.",
      );
    }

    if (validationError.statusCode !== 400) {
      throw new Error(
        "Validation error must have statusCode=400.",
      );
    }

    if (!validationError.message) {
      throw new Error(
        "Validation error is missing message.",
      );
    }

    console.log(
      "VALIDATION ERROR verified.",
    );

    // ==========================================
    // 8. DELETE
    // ==========================================

    const deleteResponse = await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    verifyApiResponse(deleteResponse);

    const deletedUser =
      getData<User>(deleteResponse);

    if (
      !deletedUser ||
      deletedUser.id !== testUserId
    ) {
      throw new Error(
        "DELETE returned invalid user.",
      );
    }

    console.log("DELETE verified.");

    // ==========================================
    // 9. VERIFY DELETE
    // ==========================================

    const verifyDeleteResponse =
      await fetch(
        `${BASE_URL}/users/${testUserId}`,
      );

    console.log(
      `\nGET /users/${testUserId}`,
    );
    console.log(
      `Status: ${verifyDeleteResponse.status}`,
    );

    const deletedText =
      await verifyDeleteResponse.text();

    let deletedData: unknown;

    try {
      deletedData = deletedText
        ? JSON.parse(deletedText)
        : null;
    } catch {
      deletedData = deletedText;
    }

    console.dir(deletedData, {
      depth: null,
    });

    /*
     * Tùy implementation của HttpExceptionFilter,
     * GET một user không tồn tại thường sẽ trả 404.
     */
    if (verifyDeleteResponse.status !== 404) {
      throw new Error(
        "VERIFY DELETE expected HTTP 404.",
      );
    }

    if (
      !deletedData ||
      typeof deletedData !== "object"
    ) {
      throw new Error(
        "VERIFY DELETE returned invalid error response.",
      );
    }

    const deleteError =
      deletedData as ApiErrorResponse;

    if (deleteError.success !== false) {
      throw new Error(
        "VERIFY DELETE error must have success=false.",
      );
    }

    if (deleteError.statusCode !== 404) {
      throw new Error(
        "VERIFY DELETE error must have statusCode=404.",
      );
    }

    if (!deleteError.message) {
      throw new Error(
        "VERIFY DELETE error is missing message.",
      );
    }

    console.log(
      "VERIFY DELETE verified.",
    );

    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log(
      "\nUSER API TEST PASSED.",
    );
  } catch (error) {
    console.error(
      "\nUSER API TEST FAILED:",
    );

    console.error(error);

    process.exitCode = 1;
  }
}

main();