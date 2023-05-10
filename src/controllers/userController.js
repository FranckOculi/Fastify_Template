import { fetchAll } from '../services/user/multiple/multipleService.js';
import { deleteUserService, getUserService, updateUserService } from '../services/user/single/singleService.js';
import {getMeService} from '../services/user/me/meService.js'

export const getSingleUser = async (req, res) => {
    const {error, status, data} = await getUserService(req.params.id)

    if(error) return res.code(status).send({ message: error });

    return res.code(200).send({
      message: 'User data',
      data
    });
}

export const getAllUsers = async (req, res) => {
  const {error, status, data } = fetchAll()

  if(error) return res.code(status).send({ message: error });

  return res.code(200).send({
    message: 'All users',
    data
  });
}

export const updateUser = async (req, res) => {
    const {error, status, data} = updateUserService(req.params.id)

    if(error) return res.code(status).send({ message: error });

    return res.code(201).send({ 
      message: 'User updated !',
      data 
    });
}

export const deleteUser = async (req, res) => {
  const {error, status, data} = await deleteUserService(req.params.id)

  return res.code(200).send({ message: 'User deleted !' });
}

export const getMe = async (req, res) => {
  const {error, status, data} = await getMeService(req.params.id)
   
  if(error) return res.code(status).send({ message: error });
    
  return res.code(200).send({
    message: 'me',
    data
  });
}