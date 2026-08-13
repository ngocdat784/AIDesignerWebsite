const BASE_URL = "http://localhost:3000";

const TEST_USER_ID = "service-test-user-001";
const TEST_USER_EMAIL = "template-service-test@example.com";

const TEST_TEMPLATE_ID = "service-test-template-001";
const TEST_TEMPLATE_SLUG = "service-test-template-001";

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
// RESPONSE VERIFICATION
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

// =====================================================
// CLEANUP
// =====================================================

async function cleanupTemplate() {
  console.log(
    "\nCleaning previous service test template...",
  );

  await request(
    "DELETE",
    `/templates/${TEST_TEMPLATE_ID}`,
  );
}

async function cleanupUser() {
  console.log(
    "\nCleaning previous service test user...",
  );

  await request(
    "DELETE",
    `/users/${TEST_USER_ID}`,
  );
}

// =====================================================
// CREATE TEST USER
// =====================================================

async function createTestAuthor() {
  console.log(
    "\nCreating test author user...",
  );

  const existingUserResponse = await request(
    "GET",
    `/users/${TEST_USER_ID}`,
  );

  if (existingUserResponse.status === 200) {
    console.log(
      "Test author already exists.",
    );

    return;
  }

  if (existingUserResponse.status !== 404) {
    throw new Error(
      `Unexpected response while checking test author: ${existingUserResponse.status}`,
    );
  }

  const createUserResponse = await request(
    "POST",
    "/users",
    {
      id: TEST_USER_ID,
      name: "Template Service Test User",
      email: TEST_USER_EMAIL,
      role: "CREATOR",
    },
  );

  verifySuccessResponse(
    createUserResponse,
    201,
  );

  if (
    createUserResponse.data.data.id !==
    TEST_USER_ID
  ) {
    throw new Error(
      "Created test author has incorrect ID.",
    );
  }

  if (
    createUserResponse.data.data.role !==
    "CREATOR"
  ) {
    throw new Error(
      "Created test author does not have CREATOR role.",
    );
  }

  console.log(
    "CREATE TEST AUTHOR verified.",
  );
}

// =====================================================
// MAIN TEST
// =====================================================

async function main() {
  console.log("\n=== TEMPLATE SERVICE TEST ===");

  // =====================================================
  // CLEANUP
  // =====================================================

  await cleanupTemplate();
  await cleanupUser();

  // =====================================================
  // CREATE TEST AUTHOR
  // =====================================================

  await createTestAuthor();

  // =====================================================
  // CREATE TEMPLATE
  // =====================================================

  console.log(
    "\nTesting create()...",
  );

  const createResponse = await request(
    "POST",
    "/templates",
    {
      id: TEST_TEMPLATE_ID,
      slug: TEST_TEMPLATE_SLUG,

      title: "Service Test Template",

      description:
        "Template created for service layer testing.",

      thumbnail:
        "https://example.com/service-test-thumbnail.jpg",

      images: [
        "https://example.com/image-1.jpg",
        "https://example.com/image-2.jpg",
      ],

      category: "Website",

      tags: [
        "service-test",
        "nestjs",
      ],

      authorId: TEST_USER_ID,

      rating: 5,
      reviews: 0,
      downloads: 0,

      price: 29.99,
      originalPrice: 39.99,

      featured: false,
      newest: true,

      stock: 10,

      license: "STANDARD",
    },
  );

  verifySuccessResponse(
    createResponse,
    201,
  );

  if (
    createResponse.data.data.id !==
    TEST_TEMPLATE_ID
  ) {
    throw new Error(
      "CREATE returned incorrect template ID.",
    );
  }

  if (
    createResponse.data.data.slug !==
    TEST_TEMPLATE_SLUG
  ) {
    throw new Error(
      "CREATE returned incorrect template slug.",
    );
  }

  console.log("CREATE verified.");

  // =====================================================
  // GET BY ID
  // =====================================================

  console.log(
    "\nTesting getById()...",
  );

  const getByIdResponse = await request(
    "GET",
    `/templates/${TEST_TEMPLATE_ID}`,
  );

  verifySuccessResponse(
    getByIdResponse,
    200,
  );

  if (
    getByIdResponse.data.data.id !==
    TEST_TEMPLATE_ID
  ) {
    throw new Error(
      "GET BY ID returned incorrect template.",
    );
  }

  console.log(
    "GET BY ID verified.",
  );

  // =====================================================
  // GET BY SLUG
  // =====================================================

  console.log(
    "\nTesting getBySlug()...",
  );

  const getBySlugResponse = await request(
    "GET",
    `/templates/slug/${encodeURIComponent(
      TEST_TEMPLATE_SLUG,
    )}`,
  );

  verifySuccessResponse(
    getBySlugResponse,
    200,
  );

  if (
    getBySlugResponse.data.data.slug !==
    TEST_TEMPLATE_SLUG
  ) {
    throw new Error(
      "GET BY SLUG returned incorrect template.",
    );
  }

  console.log(
    "GET BY SLUG verified.",
  );

  // =====================================================
  // GET BY AUTHOR ID
  // =====================================================

  console.log(
    "\nTesting getByAuthorId()...",
  );

  const getByAuthorResponse = await request(
    "GET",
    `/templates/author/${TEST_USER_ID}`,
  );

  verifySuccessResponse(
    getByAuthorResponse,
    200,
  );

  if (
    !Array.isArray(
      getByAuthorResponse.data.data,
    )
  ) {
    throw new Error(
      "GET BY AUTHOR ID did not return an array.",
    );
  }

  const authorTemplateExists =
    getByAuthorResponse.data.data.some(
      (template: any) =>
        template.id === TEST_TEMPLATE_ID,
    );

  if (!authorTemplateExists) {
    throw new Error(
      "GET BY AUTHOR ID did not contain test template.",
    );
  }

  console.log(
    "GET BY AUTHOR ID verified.",
  );

  // =====================================================
  // GET BY CATEGORY
  // =====================================================

  console.log(
    "\nTesting getByCategory()...",
  );

  const getByCategoryResponse = await request(
    "GET",
    "/templates/category/Website",
  );

  verifySuccessResponse(
    getByCategoryResponse,
    200,
  );

  if (
    !Array.isArray(
      getByCategoryResponse.data.data,
    )
  ) {
    throw new Error(
      "GET BY CATEGORY did not return an array.",
    );
  }

  const categoryTemplateExists =
    getByCategoryResponse.data.data.some(
      (template: any) =>
        template.id === TEST_TEMPLATE_ID,
    );

  if (!categoryTemplateExists) {
    throw new Error(
      "GET BY CATEGORY did not contain test template.",
    );
  }

  console.log(
    "GET BY CATEGORY verified.",
  );

  // =====================================================
  // GET ALL
  // =====================================================

  console.log(
    "\nTesting getAll()...",
  );

  const getAllResponse = await request(
    "GET",
    "/templates",
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

  const allTemplateExists =
    getAllResponse.data.data.some(
      (template: any) =>
        template.id === TEST_TEMPLATE_ID,
    );

  if (!allTemplateExists) {
    throw new Error(
      "GET ALL did not contain test template.",
    );
  }

  console.log(
    "GET ALL verified.",
  );

  // =====================================================
  // UPDATE
  // =====================================================

  console.log(
    "\nTesting update()...",
  );

  const updateResponse = await request(
    "PATCH",
    `/templates/${TEST_TEMPLATE_ID}`,
    {
      title:
        "Updated Service Test Template",

      description:
        "Updated template for service testing.",

      price: 49.99,

      originalPrice: 59.99,

      featured: true,

      newest: false,

      stock: 20,
    },
  );

  verifySuccessResponse(
    updateResponse,
    200,
  );

  if (
    updateResponse.data.data.title !==
    "Updated Service Test Template"
  ) {
    throw new Error(
      "UPDATE did not update title.",
    );
  }

  if (
    updateResponse.data.data.price !==
    49.99
  ) {
    throw new Error(
      "UPDATE did not update price.",
    );
  }

  if (
    updateResponse.data.data.featured !==
    true
  ) {
    throw new Error(
      "UPDATE did not update featured.",
    );
  }

  if (
    updateResponse.data.data.stock !==
    20
  ) {
    throw new Error(
      "UPDATE did not update stock.",
    );
  }

  console.log(
    "UPDATE verified.",
  );

  // =====================================================
  // VERIFY UPDATE
  // =====================================================

  console.log(
    "\nTesting verify update...",
  );

  const verifyUpdateResponse =
    await request(
      "GET",
      `/templates/${TEST_TEMPLATE_ID}`,
    );

  verifySuccessResponse(
    verifyUpdateResponse,
    200,
  );

  if (
    verifyUpdateResponse.data.data.title !==
    "Updated Service Test Template"
  ) {
    throw new Error(
      "VERIFY UPDATE failed.",
    );
  }

  if (
    verifyUpdateResponse.data.data.price !==
    49.99
  ) {
    throw new Error(
      "VERIFY UPDATE price failed.",
    );
  }

  console.log(
    "VERIFY UPDATE verified.",
  );

  // =====================================================
  // NOT FOUND - GET BY ID
  // =====================================================

  console.log(
    "\nTesting getById() NotFoundException...",
  );

  const notFoundIdResponse =
    await request(
      "GET",
      "/templates/service-template-does-not-exist",
    );

  verifyErrorResponse(
    notFoundIdResponse,
    404,
  );

  console.log(
    "GET BY ID NotFoundException verified.",
  );

  // =====================================================
  // NOT FOUND - GET BY SLUG
  // =====================================================

  console.log(
    "\nTesting getBySlug() NotFoundException...",
  );

  const notFoundSlugResponse =
    await request(
      "GET",
      "/templates/slug/service-template-does-not-exist",
    );

  verifyErrorResponse(
    notFoundSlugResponse,
    404,
  );

  console.log(
    "GET BY SLUG NotFoundException verified.",
  );

  // =====================================================
  // NOT FOUND - UPDATE
  // =====================================================

  console.log(
    "\nTesting update() NotFoundException...",
  );

  const updateNotFoundResponse =
    await request(
      "PATCH",
      "/templates/service-template-does-not-exist",
      {
        title: "Should Fail",
      },
    );

  verifyErrorResponse(
    updateNotFoundResponse,
    404,
  );

  console.log(
    "UPDATE NotFoundException verified.",
  );

  // =====================================================
  // NOT FOUND - DELETE
  // =====================================================

  console.log(
    "\nTesting delete() NotFoundException...",
  );

  const deleteNotFoundResponse =
    await request(
      "DELETE",
      "/templates/service-template-does-not-exist",
    );

  verifyErrorResponse(
    deleteNotFoundResponse,
    404,
  );

  console.log(
    "DELETE NotFoundException verified.",
  );

  // =====================================================
  // DUPLICATE SLUG
  // =====================================================

  console.log(
    "\nTesting duplicate slug ConflictException...",
  );

  const duplicateSlugResponse =
    await request(
      "POST",
      "/templates",
      {
        id:
          "service-test-template-duplicate",

        slug: TEST_TEMPLATE_SLUG,

        title: "Duplicate Template",

        description:
          "Should fail because slug already exists.",

        thumbnail:
          "https://example.com/duplicate.jpg",

        category: "Website",

        authorId: TEST_USER_ID,

        price: 10,
      },
    );

  verifyErrorResponse(
    duplicateSlugResponse,
    409,
  );

  console.log(
    "Duplicate slug ConflictException verified.",
  );

  // =====================================================
  // INVALID AUTHOR
  // =====================================================

  console.log(
    "\nTesting invalid authorId BadRequestException...",
  );

  const invalidAuthorResponse =
    await request(
      "POST",
      "/templates",
      {
        id:
          "service-test-template-invalid-author",

        slug:
          "service-test-invalid-author",

        title:
          "Invalid Author Template",

        description:
          "Should fail because author does not exist.",

        thumbnail:
          "https://example.com/invalid-author.jpg",

        category: "Website",

        authorId:
          "service-author-does-not-exist",

        price: 10,
      },
    );

  verifyErrorResponse(
    invalidAuthorResponse,
    400,
  );

  console.log(
    "Invalid author BadRequestException verified.",
  );

  // =====================================================
  // DELETE
  // =====================================================

  console.log(
    "\nTesting delete()...",
  );

  const deleteResponse = await request(
    "DELETE",
    `/templates/${TEST_TEMPLATE_ID}`,
  );

  verifySuccessResponse(
    deleteResponse,
    200,
  );

  if (
    deleteResponse.data.data.id !==
    TEST_TEMPLATE_ID
  ) {
    throw new Error(
      "DELETE returned incorrect template.",
    );
  }

  console.log(
    "DELETE verified.",
  );

  // =====================================================
  // VERIFY DELETE
  // =====================================================

  console.log(
    "\nTesting verify delete...",
  );

  const verifyDeleteResponse =
    await request(
      "GET",
      `/templates/${TEST_TEMPLATE_ID}`,
    );

  verifyErrorResponse(
    verifyDeleteResponse,
    404,
  );

  console.log(
    "VERIFY DELETE NotFoundException verified.",
  );

  // =====================================================
  // FINAL CLEANUP
  // =====================================================

  console.log(
    "\nPerforming final cleanup...",
  );

  await request(
    "DELETE",
    "/templates/service-test-template-duplicate",
  );

  await request(
    "DELETE",
    "/templates/service-test-template-invalid-author",
  );

  await request(
    "DELETE",
    `/users/${TEST_USER_ID}`,
  );

  console.log(
    "\nTEMPLATE SERVICE TEST PASSED.",
  );
}

main().catch((error) => {
  console.error(
    "\nTEMPLATE SERVICE TEST FAILED:",
  );

  console.error(error);

  process.exit(1);
});