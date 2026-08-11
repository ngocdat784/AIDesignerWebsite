import "reflect-metadata";
import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserRepository } from "./repositories/user.repository";
import { DatabaseService } from "./database/database.service";

console.log(
  "UserRepository metadata:",
  Reflect.getMetadata("design:paramtypes", UserRepository),
);

console.log(
  "Expected DatabaseService:",
  DatabaseService,
);
async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const userRepository = app.get(UserRepository);

    console.log("UserRepository injected successfully.");

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

    // ==========================================
    // 3. GET BY EMAIL
    // ==========================================

    const userByEmail = await userRepository.getByEmail(testEmail);

    console.log("\n3. GET BY EMAIL");
    console.dir(userByEmail, { depth: null });

    // ==========================================
    // 4. GET ALL
    // ==========================================

    const allUsers = await userRepository.getAll();

    console.log("\n4. GET ALL");
    console.dir(allUsers, { depth: null });

    // ==========================================
    // 5. UPDATE
    // ==========================================

    const updatedUser = await userRepository.update(testUserId, {
      name: "Updated Repository User",
      role: "ADMIN",
    });

    console.log("\n5. UPDATE");
    console.dir(updatedUser, { depth: null });

    // ==========================================
    // 6. VERIFY UPDATE
    // ==========================================

    const verifiedUser = await userRepository.getById(testUserId);

    console.log("\n6. VERIFY UPDATE");
    console.dir(verifiedUser, { depth: null });

    // ==========================================
    // 7. DELETE
    // ==========================================

    const deletedUser = await userRepository.delete(testUserId);

    console.log("\n7. DELETE");
    console.dir(deletedUser, { depth: null });

    // ==========================================
    // 8. VERIFY DELETE
    // ==========================================

    const afterDelete = await userRepository.getById(testUserId);

    console.log("\n8. VERIFY DELETE");
    console.dir(afterDelete, { depth: null });

    // ==========================================
    // FINAL RESULT
    // ==========================================

    if (afterDelete === null) {
      console.log("\nUSER REPOSITORY TEST PASSED.");
    } else {
      console.log("\nUSER REPOSITORY TEST FAILED.");
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("\nUSER REPOSITORY TEST FAILED:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main();