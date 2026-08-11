import { prisma } from "./lib/prisma";
import { templateRepository } from "./repositories/template.repository";

async function main() {
  console.log("=================================");
  console.log("TEMPLATE REPOSITORY TEST");
  console.log("=================================");

  const userId = "template-test-user-001";
  const templateId = "template-test-001";

  // =========================
  // Cleanup
  // =========================

  await prisma.template.deleteMany({
    where: {
      id: templateId,
    },
  });

  await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  console.log("Cleaned previous test data.");

  // =========================
  // Create test author
  // =========================

  const author = await prisma.user.create({
    data: {
      id: userId,
      name: "Template Test Creator",
      email: "template-creator@example.com",
      role: "CREATOR",
    },
  });

  console.log("\nTest author created:");
  console.log(author);

  // =========================
  // 1. CREATE
  // =========================

  const createdTemplate = await templateRepository.create({
    id: templateId,
    slug: "ai-dashboard-template",
    title: "AI Dashboard Template",
    description: "A modern AI dashboard template.",
    thumbnail: "/images/ai-dashboard.png",
    images: [
      "/images/ai-dashboard-1.png",
      "/images/ai-dashboard-2.png",
    ],
    category: "Dashboard",
    tags: ["AI", "Dashboard", "Modern"],
    authorId: userId,
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
  console.log(createdTemplate);

  // =========================
  // 2. GET BY ID
  // =========================

  const templateById = await templateRepository.getById(templateId);

  console.log("\n2. GET BY ID");
  console.log(templateById);

  // =========================
  // 3. GET BY SLUG
  // =========================

  const templateBySlug =
    await templateRepository.getBySlug("ai-dashboard-template");

  console.log("\n3. GET BY SLUG");
  console.log(templateBySlug);

  // =========================
  // 4. GET BY AUTHOR
  // =========================

  const templatesByAuthor =
    await templateRepository.getByAuthorId(userId);

  console.log("\n4. GET BY AUTHOR");
  console.log(templatesByAuthor);

  // =========================
  // 5. GET BY CATEGORY
  // =========================

  const templatesByCategory =
    await templateRepository.getByCategory("Dashboard");

  console.log("\n5. GET BY CATEGORY");
  console.log(templatesByCategory);

  // =========================
  // 6. GET ALL
  // =========================

  const allTemplates = await templateRepository.getAll();

  console.log("\n6. GET ALL");
  console.log(allTemplates);

  // =========================
  // 7. UPDATE
  // =========================

  const updatedTemplate = await templateRepository.update(
    templateId,
    {
      title: "Updated AI Dashboard Template",
      price: 24.99,
      rating: 4.9,
      downloads: 200,
    }
  );

  console.log("\n7. UPDATE");
  console.log(updatedTemplate);

  // =========================
  // 8. DELETE TEMPLATE
  // =========================

  const deletedTemplate =
    await templateRepository.delete(templateId);

  console.log("\n8. DELETE TEMPLATE");
  console.log(deletedTemplate);

  // =========================
  // 9. VERIFY TEMPLATE DELETE
  // =========================

  const templateCheck =
    await templateRepository.getById(templateId);

  console.log("\n9. VERIFY TEMPLATE DELETE");
  console.log(templateCheck);

  // =========================
  // Cleanup author
  // =========================

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  console.log("\nTest author deleted.");

  console.log("\n=================================");
  console.log("TEMPLATE REPOSITORY TEST COMPLETED");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("\nTEMPLATE REPOSITORY TEST FAILED");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });