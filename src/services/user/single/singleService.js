import { findById, removeUser, updateUser } from "../../../repositories/userRepository.js"

export const getUserService = async (id) => {
    const user = await findById(id )

    if(!user) return { error: "This user doesn't exist", status: 404 }

    return {error: null, data: user}
}

export const updateUserService = async (id, data) => {
    const user = await findById(id)

    if(!user) return { error: "This user doesn't exist", status: 404 }

	data.updatedAt = Date.now()
    await updateUser({id}, data)

    const newUser = await findById(id)

    return {error: null, data: newUser}
}

export const  deleteUserService = async (id) => {
    const user = await findById(id)

    if(!user) return { error: "This user doesn't exist", status: 404 }

    await removeUser(id)

	return { error: null, data: null }
}
