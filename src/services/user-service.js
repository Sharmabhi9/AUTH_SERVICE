const jwt=require('jsonwebtoken');
const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverconfig');
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
    createToken(user){
        try {
            const result =jwt.sign(user,JWT_KEY,{expiresIn: 20});
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

}

module.exports=UserService;