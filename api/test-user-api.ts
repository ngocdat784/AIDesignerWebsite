const BASE_URL = "http://localhost:3000";

const testUserId = "api-test-user-001";
const testEmail = "api-test@example.com";

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
    body: body ? JSON.stringify(body) : undefined,
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

    const createdUser = await request(
      "POST",
      "/users",
      {
        id: testUserId,
        name: "API Test User",
        email: testEmail,
        role: "USER",
      },
    );

    if (
      !createdUser ||
      typeof createdUser !== "object" ||
      !("id" in createdUser) ||
      createdUser.id !== testUserId
    ) {
      throw new Error("CREATE returned invalid user.");
    }

    console.log("CREATE verified.");

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const userById = await request(
      "GET",
      `/users/${testUserId}`,
    );

    if (
      !userById ||
      typeof userById !== "object" ||
      !("id" in userById) ||
      userById.id !== testUserId
    ) {
      throw new Error("GET BY ID returned invalid user.");
    }

    console.log("GET BY ID verified.");

    // ==========================================
    // 3. GET BY EMAIL
    // ==========================================

    const userByEmail = await request(
      "GET",
      `/users/email/${encodeURIComponent(testEmail)}`,
    );

    if (
      !userByEmail ||
      typeof userByEmail !== "object" ||
      !("email" in userByEmail) ||
      userByEmail.email !== testEmail
    ) {
      throw new Error("GET BY EMAIL returned invalid user.");
    }

    console.log("GET BY EMAIL verified.");

    // ==========================================
    // 4. GET ALL
    // ==========================================

    const allUsers = await request(
      "GET",
      "/users",
    );

    if (!Array.isArray(allUsers)) {
      throw new Error("GET ALL did not return an array.");
    }

    const foundUser = allUsers.find(
      (user: any) => user.id === testUserId,
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

    const updatedUser = await request(
      "PATCH",
      `/users/${testUserId}`,
      {
        name: "Updated API Test User",
        role: "CREATOR",
      },
    );

    if (
      !updatedUser ||
      typeof updatedUser !== "object" ||
      !("name" in updatedUser) ||
      !("role" in updatedUser) ||
      updatedUser.name !== "Updated API Test User" ||
      updatedUser.role !== "CREATOR"
    ) {
      throw new Error("UPDATE returned invalid data.");
    }

    console.log("UPDATE verified.");

    // ==========================================
    // 6. VERIFY UPDATE
    // ==========================================

    const verifiedUser = await request(
      "GET",
      `/users/${testUserId}`,
    );

    if (
      !verifiedUser ||
      typeof verifiedUser !== "object" ||
      !("name" in verifiedUser) ||
      !("role" in verifiedUser) ||
      verifiedUser.name !== "Updated API Test User" ||
      verifiedUser.role !== "CREATOR"
    ) {
      throw new Error(
        "VERIFY UPDATE failed.",
      );
    }

    console.log("VERIFY UPDATE verified.");

    // ==========================================
    // 7. DELETE
    // ==========================================

    const deletedUser = await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    if (
      !deletedUser ||
      typeof deletedUser !== "object" ||
      !("id" in deletedUser) ||
      deletedUser.id !== testUserId
    ) {
      throw new Error(
        "DELETE returned invalid user.",
      );
    }

    console.log("DELETE verified.");

    // ==========================================
    // 8. VERIFY DELETE
    // ==========================================

    const response = await fetch(
      `${BASE_URL}/users/${testUserId}`,
    );

    console.log(
      `\nGET /users/${testUserId}`,
    );
    console.log(`Status: ${response.status}`);

    const deletedText = await response.text();

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

    if (response.status !== 200) {
      throw new Error(
        "VERIFY DELETE returned unexpected HTTP status.",
      );
    }

    if (deletedData !== null) {
      throw new Error(
        "VERIFY DELETE failed: user still exists.",
      );
    }

    console.log("VERIFY DELETE verified.");

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