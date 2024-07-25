const jwt=require('jsonwebtoken');
const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverconfig');
const bcrypt=require('bcrypt');
class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("wrong in service layer");
            throw error;
        }
    }

    async signIn(email,PlainPassword){
        try {
            //fetching user by email
            const user =await this.userRepository.getByEmail(email);
            //compare incoming plain password with main
            const passwordMatch= this.checkPassword(PlainPassword,user.password)
            if(!passwordMatch){
                console.log("password wrong")
                throw{ error:'incorrect password'}
            }
            //password match create token and send users
            const newJWT=this.createToken({email:user.email,id:user.id})
            return newJWT
        } catch (error) {
            console.log("something went wrong in sign in ");
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token);
            if(!response){
                throw {error:'Invalid Token'}
            }
            const user=this.userRepository.getById(response.id);
            if(!user){
                throw {error:'No user cooresponding token found'}
            }
            return user.id;

        } catch (error) {
            console.log("something went wrong in auth procees");
            throw error;
        }
    }
    createToken(user){
        try {
            const result =jwt.sign(user,JWT_KEY,{expiresIn: 40});
            return result;
            
        } catch (error) {
            console.log("something wrong in token creation");
            throw error;
        }
    }
    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
            
        } catch (error) {
            console.log("something wrong in token validation",error);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something wrong in checking password ");
            throw error;
        }
    }
    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("something wrong in isAdmin checking");
            throw error;
        }
    }

}

module.exports=UserService;