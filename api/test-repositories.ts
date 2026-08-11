import { prisma } from "./lib/prisma";
import { userRepository } from "./repositories/user.repository";

async function main() {
  console.log("=================================");
  console.log("USER REPOSITORY TEST");
  console.log("=================================");

  const userId = "repo-test-user-001";
  const email = "repo-test@example.com";

  // =========================
  // Cleanup trước khi test
  // =========================

  await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  console.log("Cleaned previous test user.");

  // =========================
  // 1. CREATE
  // =========================

  const createdUser = await userRepository.create({
    id: userId,
    name: "Repository Test User",
    email,
    role: "CREATOR",
  });

  console.log("\n1. CREATE");
  console.log(createdUser);

  // =========================
  // 2. GET BY ID
  // =========================

  const userById = await userRepository.getById(userId);

  console.log("\n2. GET BY ID");
  console.log(userById);

  // =========================
  // 3. GET BY EMAIL
  // =========================

  const userByEmail = await userRepository.getByEmail(email);

  console.log("\n3. GET BY EMAIL");
  console.log(userByEmail);

  // =========================
  // 4. GET ALL
  // =========================

  const allUsers = await userRepository.getAll();

  console.log("\n4. GET ALL");
  console.log(allUsers);

  // =========================
  // 5. UPDATE
  // =========================

  const updatedUser = await userRepository.update(userId, {
    name: "Updated Repository User",
    role: "ADMIN",
  });

  console.log("\n5. UPDATE");
  console.log(updatedUser);

  // =========================
  // 6. DELETE
  // =========================

  const deletedUser = await userRepository.delete(userId);

  console.log("\n6. DELETE");
  console.log(deletedUser);

  // =========================
  // 7. VERIFY DELETE
  // =========================

  const deletedCheck = await userRepository.getById(userId);

  console.log("\n7. VERIFY DELETE");
  console.log(deletedCheck);

  console.log("\n=================================");
  console.log("USER REPOSITORY TEST COMPLETED");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("\nUSER REPOSITORY TEST FAILED");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });