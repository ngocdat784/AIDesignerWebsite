import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

const BASE_URL = "http://localhost:3000";

async function request(
  method: string,
  path: string,
  body?: any,
) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  console.log(`${method} ${path}`);
  console.log("Status:", response.status);
  console.dir(data, { depth: null });
  console.log();

  return {
    status: response.status,
    data,
  };
}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const testUserId = "api-test-template-user-001";
    const testUserEmail = "api-template-user@example.com";

    const testTemplateId = "api-test-template-001";
    const testSlug = "api-test-template";

    console.log("\n=== TEMPLATE API TEST ===\n");

    // ==========================================
    // 0. CLEANUP PREVIOUS TEST DATA
    // ==========================================

    console.log("Cleaning previous test data...");

    // Xóa template trước vì template phụ thuộc vào user
    await request(
      "DELETE",
      `/templates/${testTemplateId}`,
    );

    // Sau khi template được xóa mới xóa user
    await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    console.log("Cleanup completed.\n");

    // ==========================================
    // 1. CREATE TEST USER
    // ==========================================

    const createUserResult = await request(
      "POST",
      "/users",
      {
        id: testUserId,
        name: "Template API Test User",
        email: testUserEmail,
        role: "CREATOR",
      },
    );

    if (
      createUserResult.status !== 201 ||
      !createUserResult.data ||
      createUserResult.data.id !== testUserId
    ) {
      throw new Error("CREATE TEST USER failed.");
    }

    console.log("CREATE TEST USER verified.\n");

    // ==========================================
    // 2. CREATE TEMPLATE
    // ==========================================

    const createTemplateResult = await request(
      "POST",
      "/templates",
      {
        id: testTemplateId,
        slug: testSlug,
        title: "API Test Template",
        description:
          "Template created for API testing.",

        thumbnail:
          "/images/api-test-template.png",

        images: [
          "/images/api-test-template-1.png",
          "/images/api-test-template-2.png",
        ],

        category: "Dashboard",

        tags: [
          "API",
          "Test",
          "Dashboard",
        ],

        authorId: testUserId,

        rating: 4.5,
        reviews: 10,
        downloads: 100,

        price: 29.99,
        originalPrice: 39.99,

        featured: false,
        newest: true,

        stock: 50,
        license: "Commercial",
      },
    );

    if (
      createTemplateResult.status !== 201 ||
      !createTemplateResult.data ||
      createTemplateResult.data.id !== testTemplateId
    ) {
      throw new Error("CREATE TEMPLATE failed.");
    }

    console.log("CREATE TEMPLATE verified.\n");

    // ==========================================
    // 3. GET BY ID
    // ==========================================

    const getByIdResult = await request(
      "GET",
      `/templates/${testTemplateId}`,
    );

    if (
      getByIdResult.status !== 200 ||
      !getByIdResult.data ||
      getByIdResult.data.id !== testTemplateId
    ) {
      throw new Error("GET BY ID failed.");
    }

    console.log("GET BY ID verified.\n");

    // ==========================================
    // 4. GET BY SLUG
    // ==========================================

    const getBySlugResult = await request(
      "GET",
      `/templates/slug/${encodeURIComponent(testSlug)}`,
    );

    if (
      getBySlugResult.status !== 200 ||
      !getBySlugResult.data ||
      getBySlugResult.data.slug !== testSlug
    ) {
      throw new Error("GET BY SLUG failed.");
    }

    console.log("GET BY SLUG verified.\n");

    // ==========================================
    // 5. GET BY AUTHOR
    // ==========================================

    const getByAuthorResult = await request(
      "GET",
      `/templates/author/${encodeURIComponent(testUserId)}`,
    );

    if (
      getByAuthorResult.status !== 200 ||
      !Array.isArray(getByAuthorResult.data)
    ) {
      throw new Error("GET BY AUTHOR failed.");
    }

    const templateByAuthor =
      getByAuthorResult.data.find(
        (template: any) =>
          template.id === testTemplateId,
      );

    if (!templateByAuthor) {
      throw new Error(
        "GET BY AUTHOR did not return the test template.",
      );
    }

    console.log("GET BY AUTHOR verified.\n");

    // ==========================================
    // 6. GET BY CATEGORY
    // ==========================================

    const getByCategoryResult = await request(
      "GET",
      "/templates/category/Dashboard",
    );

    if (
      getByCategoryResult.status !== 200 ||
      !Array.isArray(getByCategoryResult.data)
    ) {
      throw new Error("GET BY CATEGORY failed.");
    }

    const templateByCategory =
      getByCategoryResult.data.find(
        (template: any) =>
          template.id === testTemplateId,
      );

    if (!templateByCategory) {
      throw new Error(
        "GET BY CATEGORY did not return the test template.",
      );
    }

    console.log("GET BY CATEGORY verified.\n");

    // ==========================================
    // 7. GET ALL
    // ==========================================

    const getAllResult = await request(
      "GET",
      "/templates",
    );

    if (
      getAllResult.status !== 200 ||
      !Array.isArray(getAllResult.data)
    ) {
      throw new Error("GET ALL failed.");
    }

    const templateInAll =
      getAllResult.data.find(
        (template: any) =>
          template.id === testTemplateId,
      );

    if (!templateInAll) {
      throw new Error(
        "GET ALL did not return the test template.",
      );
    }

    console.log("GET ALL verified.\n");

    // ==========================================
    // 8. UPDATE
    // ==========================================

    const updateResult = await request(
      "PATCH",
      `/templates/${testTemplateId}`,
      {
        title: "Updated API Test Template",

        description:
          "Updated description for API testing.",

        rating: 4.9,
        reviews: 25,
        downloads: 250,

        price: 24.99,

        featured: true,
        newest: true,

        stock: 75,

        license: "Extended Commercial",
      },
    );

    if (
      updateResult.status !== 200 ||
      !updateResult.data ||
      updateResult.data.title !==
        "Updated API Test Template"
    ) {
      throw new Error("UPDATE TEMPLATE failed.");
    }

    console.log("UPDATE verified.\n");

    // ==========================================
    // 9. VERIFY UPDATE
    // ==========================================

    const verifyUpdateResult = await request(
      "GET",
      `/templates/${testTemplateId}`,
    );

    if (
      verifyUpdateResult.status !== 200 ||
      !verifyUpdateResult.data ||
      verifyUpdateResult.data.title !==
        "Updated API Test Template" ||
      verifyUpdateResult.data.rating !== 4.9 ||
      verifyUpdateResult.data.reviews !== 25 ||
      verifyUpdateResult.data.downloads !== 250 ||
      verifyUpdateResult.data.price !== 24.99 ||
      verifyUpdateResult.data.featured !== true ||
      verifyUpdateResult.data.stock !== 75
    ) {
      throw new Error(
        "VERIFY UPDATE failed.",
      );
    }

    console.log("VERIFY UPDATE verified.\n");

    // ==========================================
    // 10. DELETE TEMPLATE
    // ==========================================

    const deleteTemplateResult = await request(
      "DELETE",
      `/templates/${testTemplateId}`,
    );

    if (
      deleteTemplateResult.status !== 200 ||
      !deleteTemplateResult.data ||
      deleteTemplateResult.data.id !== testTemplateId
    ) {
      throw new Error(
        "DELETE TEMPLATE failed.",
      );
    }

    console.log("DELETE TEMPLATE verified.\n");

    // ==========================================
    // 11. VERIFY TEMPLATE DELETE
    // ==========================================

    const verifyTemplateDeleteResult =
      await request(
        "GET",
        `/templates/${testTemplateId}`,
      );

    if (
      verifyTemplateDeleteResult.status !== 200 ||
      verifyTemplateDeleteResult.data !== null
    ) {
      throw new Error(
        "VERIFY TEMPLATE DELETE failed.",
      );
    }

    console.log(
      "VERIFY TEMPLATE DELETE verified.\n",
    );

    // ==========================================
    // 12. DELETE TEST USER
    // ==========================================

    const deleteUserResult = await request(
      "DELETE",
      `/users/${testUserId}`,
    );

    if (
      deleteUserResult.status !== 200 ||
      !deleteUserResult.data ||
      deleteUserResult.data.id !== testUserId
    ) {
      throw new Error(
        "DELETE TEST USER failed.",
      );
    }

    console.log("DELETE TEST USER verified.\n");

    // ==========================================
    // 13. VERIFY USER DELETE
    // ==========================================

    const verifyUserDeleteResult =
      await request(
        "GET",
        `/users/${testUserId}`,
      );

    if (
      verifyUserDeleteResult.status !== 200 ||
      verifyUserDeleteResult.data !== null
    ) {
      throw new Error(
        "VERIFY TEST USER DELETE failed.",
      );
    }

    console.log(
      "VERIFY TEST USER DELETE verified.\n",
    );

    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log(
      "TEMPLATE API TEST PASSED.",
    );
  } catch (error) {
    console.error(
      "\nTEMPLATE API TEST FAILED:",
    );

    console.error(error);

    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main();