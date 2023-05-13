import configuration from "../../config/configuration.js";
import { findByEmail } from "../../repositories/userRepository.js";
import { registerUser } from "../../services/auth/register/registerService.js";
import { updateUserService } from "../../services/user/single/singleService.js";

export const seed = async () => {
  // create admin user if it doesn't exist

  const userAdmin1 = await findByEmail("johnwayne@admin.fr");
  if (!userAdmin1) {
    await registerUser({
      teamId: 1,
      displayName: "John Wayne",
      email: "johnwayne@admin.fr",
      password: configuration.initial_admin_password,
      access: "admin",
      phone: "0607080910",
    });
  }

  if (userAdmin1 && userAdmin1.access !== "admin") {
    await updateUserService(userAdmin1.id, {
      access: "admin",
      displayName: "John Wayne",
      email: "johnwayne@admin.fr",
    });
  }

  const userAdmin2 = await findByEmail("chouchou@admin.fr");
  if (!userAdmin2) {
    await registerUser({
      teamId: 2,
      displayName: "Chouchou Beignet",
      email: "chouchou@admin.fr",
      password: configuration.initial_admin_password,
      access: "admin",
      phone: "0708091011",
    });
  }
  return null;
};
