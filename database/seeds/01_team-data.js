import { findById } from "../../repositories/teamRepository.js";
import { createTeamService } from "../../services/team/teamService.js";

export const seed = async () => {
  // create team if it doesn't exist

  const team1 = await findById(1);
  if (!team1) {
    await createTeamService({
      id: 1,
      name: "Team React",
      description: "Groupe de travail",
    });
  }

  const team2 = await findById(2);
  if (!team2) {
    await createTeamService({
      name: "Groupe GitHub",
      description: "Groupe de présentation des projets",
    });
  }

  return null;
};
