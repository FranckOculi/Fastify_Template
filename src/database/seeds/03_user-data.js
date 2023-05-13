import configuration from "../../config/configuration.js";

import { registerUser } from "../../services/auth/register/registerService.js";

export const seed = async () => {
  if (configuration.env === "production") {
    return false;
  }

  await registerUser({
    teamId: 1,
    displayName: "John Doe",
    email: "a@a.com",
    password: configuration.initial_user_password,
    access: "manager",
  });

  await registerUser({
    teamId: 2,
    displayName: "Jane Doe",
    email: "b@b.com",
    password: configuration.initial_user_password,
    access: "manager",
  });

  for (let i = 0; i < 5; i++) {
    await registerUser({
      teamId: 1,
      displayName: `randomUser${i}_team1`,
      email: `randomUser${i}@team1.com`,
      password: configuration.initial_user_password,
    });
  }

  for (let i = 0; i < 5; i++) {
    await registerUser({
      teamId: 2,
      displayName: `randomUser${i}_team2`,
      email: `randomUser${i}@team2.com`,
      password: configuration.initial_user_password,
    });
  }
};
