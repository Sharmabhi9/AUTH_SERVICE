const { response }=require('express');
const UserService=require('../services/user-service');

const userService=new UserService();

const create=async (req,res)=>{
    try {
        const response=await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            succees:true,
            message:'successfully created a new user ',
            data:response,
            err:{}
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'something went wrong',
            data:{},
            succees:false,
             err:error
        });
    }
}

const signIn=async (req,res)=>{
    try {
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            succees:true,
            message:'successfully signed in ',
            data:response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'something went wrong',
            data:{},
            succees:false,
             err:error
        });
    }
}

const isAuthenticated= async (req,res)=>{
    try {
        const token=req.headers['x-access-token']
        const response = userService.verifyToken(token);
        return res.status(200).json({
            message:'User is authenticated and token is valid ',
            data:response,
            succees:true,
             err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'something went wrong',
            data:{},
            succees:false,
             err:error
        });
    }
}
module.exports={
    create,
    signIn,
    isAuthenticated
}