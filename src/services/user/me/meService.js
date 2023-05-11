import { findById } from "../../../repositories/userRepository.js"
import { findById as findTeamById } from "../../../repositories/teamRepository.js"

export const getMeService = async (id) => {
    const user = await findById(id)

    if(!user) return { error: "This user doesn't exist", status: 404 }

    const team = await findTeamById(user.teamId)

    return {error: null, data: {
        user,
        team
    }}
}
