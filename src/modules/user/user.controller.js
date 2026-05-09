// getUsers
// getUserById
// createUser
// updateUser
// deleteUser

import * as userservice from "./user.service"

export const getUsersService= async (req ,res ,next)=>{
    const users = await userservice.getUsersService(req.body)
    res.status(200).json({message: "there are all users" , users})
}
export const getUserByIdService= async (req,res,next)=>{
    const userid = await userservice.getUserByIdService(req.body)
    res.status(200).json({message: "there is the user you want" , userid})

}

export const createUserService = async (req,res,next)=>{
    const usercreate = await userservice.createUserService(req.body)
    res.status(201).json({message: "user created successfully" , usercreate}) 

}

export const updateUserService = async (req,res,next)=>{

    const userupdate = await userservice.(userid ,req.body)
    res.status(200).json({message: "user updated successfully" , userupdate})
}

export const deleteUserService = async (req,res,next)=>{
    const userdelete = await userservice.deleteUser(userid)
    res.status(200).json({message: "user deleted successfully" , userdelete})
  
} 