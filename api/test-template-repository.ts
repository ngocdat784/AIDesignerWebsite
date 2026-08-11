import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TemplateRepository } from "./repositories/template.repository";
import { UserRepository } from "./repositories/user.repository";

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const templateRepository = app.get(TemplateRepository);
    const userRepository = app.get(UserRepository);

    if (!templateRepository) {
      throw new Error("TemplateRepository was not injected by NestJS.");
    }

    if (!userRepository) {
      throw new Error("UserRepository was not injected by NestJS.");
    }

    console.log("TemplateRepository injected successfully.");
    console.log("UserRepository injected successfully.");

    const testUserId = "template-test-user-001";
    const testEmail = "template-creator@example.com";
    const testTemplateId = "template-test-001";
    const testSlug = "ai-dashboard-template";

    console.log("\n=== TEMPLATE REPOSITORY TEST ===\n");

    // ==========================================
    // CLEANUP
    // ==========================================

    const existingTemplate =
      await templateRepository.getById(testTemplateId);

    if (existingTemplate) {
      await templateRepository.delete(testTemplateId);
    }

    const existingUser = await userRepository.getById(testUserId);

    if (existingUser) {
      await userRepository.delete(testUserId);
    }

    console.log("Cleaned previous test data.");

    // ==========================================
    // CREATE TEST AUTHOR
    // ==========================================

    const author = await userRepository.create({
      id: testUserId,
      name: "Template Test Creator",
      email: testEmail,
      role: "CREATOR",
    });

    console.log("\nTest author created:");
    console.dir(author, { depth: null });

    // ==========================================
    // 1. CREATE
    // ==========================================

    const createdTemplate = await templateRepository.create({
      id: testTemplateId,
      slug: testSlug,
      title: "AI Dashboard Template",
      description: "A modern AI dashboard template.",
      thumbnail: "/images/ai-dashboard.png",
      images: [
        "/images/ai-dashboard-1.png",
        "/images/ai-dashboard-2.png",
      ],
      category: "Dashboard",
      tags: ["AI", "Dashboard", "Modern"],

      authorId: testUserId,

      rating: 4.8,
      reviews: 12,
      downloads: 150,

      price: 29.99,
      originalPrice: 39.99,

      featured: true,
      newest: true,

      stock: 100,
      license: "Commercial",
    });

    console.log("\n1. CREATE");
    console.dir(createdTemplate, { depth: null });

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const templateById =
      await templateRepository.getById(testTemplateId);

    console.log("\n2. GET BY ID");
    console.dir(templateById, { depth: null });

    // ==========================================
    // 3. GET BY SLUG
    // ==========================================

    const templateBySlug =
      await templateRepository.getBySlug(testSlug);

    console.log("\n3. GET BY SLUG");
    console.dir(templateBySlug, { depth: null });

    // ==========================================
    // 4. GET BY AUTHOR
    // ==========================================

    const templatesByAuthor =
      await templateRepository.getByAuthorId(testUserId);

    console.log("\n4. GET BY AUTHOR");
    console.dir(templatesByAuthor, { depth: null });

    // ==========================================
    // 5. GET BY CATEGORY
    // ==========================================

    const templatesByCategory =
      await templateRepository.getByCategory("Dashboard");

    console.log("\n5. GET BY CATEGORY");
    console.dir(templatesByCategory, { depth: null });

    // ==========================================
    // 6. GET ALL
    // ==========================================

    const allTemplates =
      await templateRepository.getAll();

    console.log("\n6. GET ALL");
    console.dir(allTemplates, { depth: null });

    // ==========================================
    // 7. UPDATE
    // ==========================================

    const updatedTemplate =
      await templateRepository.update(testTemplateId, {
        title: "Updated AI Dashboard Template",
        rating: 4.9,
        downloads: 200,
        price: 24.99,
      });

    console.log("\n7. UPDATE");
    console.dir(updatedTemplate, { depth: null });

    // ==========================================
    // 8. VERIFY UPDATE
    // ==========================================

    const verifiedTemplate =
      await templateRepository.getById(testTemplateId);

    console.log("\n8. VERIFY UPDATE");
    console.dir(verifiedTemplate, { depth: null });

    // ==========================================
    // 9. DELETE TEMPLATE
    // ==========================================

    const deletedTemplate =
      await templateRepository.delete(testTemplateId);

    console.log("\n9. DELETE TEMPLATE");
    console.dir(deletedTemplate, { depth: null });

    // ==========================================
    // 10. VERIFY TEMPLATE DELETE
    // ==========================================

    const afterTemplateDelete =
      await templateRepository.getById(testTemplateId);

    console.log("\n10. VERIFY TEMPLATE DELETE");
    console.dir(afterTemplateDelete, { depth: null });

    // ==========================================
    // DELETE TEST AUTHOR
    // ==========================================

    const afterDeleteAuthor =
      await userRepository.getById(testUserId);

    if (afterDeleteAuthor) {
      await userRepository.delete(testUserId);
    }

    console.log("\nTest author deleted.");

    // ==========================================
    // FINAL RESULT
    // ==========================================

    if (
      afterTemplateDelete === null
    ) {
      console.log(
        "\nTEMPLATE REPOSITORY TEST PASSED."
      );
    } else {
      console.log(
        "\nTEMPLATE REPOSITORY TEST FAILED."
      );

      process.exitCode = 1;
    }
  } catch (error) {
    console.error(
      "\nTEMPLATE REPOSITORY TEST FAILED:"
    );

    console.error(error);

    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main();