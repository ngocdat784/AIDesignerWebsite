import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserRepository } from "./repositories/user.repository";

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const userRepository = app.get(UserRepository);

    const testUserId = "repo-test-user-001";
    const testEmail = "repo-test@example.com";

    console.log("\n=== USER REPOSITORY TEST ===\n");

    // ==========================================
    // 0. CHECK DEPENDENCY INJECTION
    // ==========================================

    if (!userRepository) {
      throw new Error("UserRepository was not injected by NestJS.");
    }

    console.log("UserRepository injected successfully.");

    // ==========================================
    // CLEANUP
    // ==========================================

    const existingUser = await userRepository.getById(testUserId);

    if (existingUser) {
      await userRepository.delete(testUserId);
    }

    console.log("Cleaned previous test user.");

    // ==========================================
    // 1. CREATE
    // ==========================================

    const createdUser = await userRepository.create({
      id: testUserId,
      name: "Repository Test User",
      email: testEmail,
      role: "CREATOR",
    });

    console.log("\n1. CREATE");
    console.dir(createdUser, { depth: null });

    // ==========================================
    // 2. GET BY ID
    // ==========================================

    const userById = await userRepository.getById(testUserId);

    console.log("\n2. GET BY ID");
    console.dir(userById, { depth: null });

    if (!userById) {
      throw new Error("GET BY ID failed.");
    }

    // ==========================================
    // 3. GET BY EMAIL
    // ==========================================

    const userByEmail = await userRepository.getByEmail(testEmail);

    console.log("\n3. GET BY EMAIL");
    console.dir(userByEmail, { depth: null });

    if (!userByEmail) {
      throw new Error("GET BY EMAIL failed.");
    }

    // ==========================================
    // 4. GET ALL
    // ==========================================

    const allUsers = await userRepository.getAll();

    console.log("\n4. GET ALL");
    console.dir(allUsers, { depth: null });

    const foundInAll = allUsers.some(
      (user) => user.id === testUserId,
    );

    if (!foundInAll) {
      throw new Error("GET ALL failed to return test user.");
    }

    // ==========================================
    // 5. UPDATE
    // ==========================================

    const updatedUser = await userRepository.update(
      testUserId,
      {
        name: "Updated Repository User",
        role: "ADMIN",
      },
    );

    console.log("\n5. UPDATE");
    console.dir(updatedUser, { depth: null });

    if (
      updatedUser.name !== "Updated Repository User" ||
      updatedUser.role !== "ADMIN"
    ) {
      throw new Error("UPDATE failed.");
    }

    // ==========================================
    // 6. VERIFY UPDATE
    // ==========================================

    const verifiedUser =
      await userRepository.getById(testUserId);

    console.log("\n6. VERIFY UPDATE");
    console.dir(verifiedUser, { depth: null });

    if (
      !verifiedUser ||
      verifiedUser.name !== "Updated Repository User" ||
      verifiedUser.role !== "ADMIN"
    ) {
      throw new Error("VERIFY UPDATE failed.");
    }

    // ==========================================
    // 7. DELETE
    // ==========================================

    const deletedUser =
      await userRepository.delete(testUserId);

    console.log("\n7. DELETE");
    console.dir(deletedUser, { depth: null });

    if (deletedUser.id !== testUserId) {
      throw new Error("DELETE failed.");
    }

    // ==========================================
    // 8. VERIFY DELETE
    // ==========================================

    const afterDelete =
      await userRepository.getById(testUserId);

    console.log("\n8. VERIFY DELETE");
    console.dir(afterDelete, { depth: null });

    if (afterDelete !== null) {
      throw new Error(
        "VERIFY DELETE failed: user still exists.",
      );
    }

    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log("\n=================================");
    console.log("USER REPOSITORY TEST PASSED.");
    console.log("=================================\n");

  } catch (error) {
    console.error("\nUSER REPOSITORY TEST FAILED:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main();