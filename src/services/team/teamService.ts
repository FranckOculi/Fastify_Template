import { createTeam } from "../../repositories/teamRepository";
import { ServiceResponse } from "src/types/Service";
import { Team } from "src/types/Team";

export const createTeamService = async (
  data: Partial<Team>
): Promise<ServiceResponse<Partial<Team>>> => {
  data.createdAt = new Date();
  data.updatedAt = new Date();

  const response = await createTeam(data);

  return { error: null, status: null, data: response };
};
