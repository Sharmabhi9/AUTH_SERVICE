const express=require('express');
const bodyParser=require('body-parser');

const { PORT }=require('./config/serverconfig');

const apiRoutes=require('./routes/index');
const UserService=require('./services/user-service');
const db=require('./models/index');
const {User,Role}=require('./models/index')

 
const app=express();

const prepareAndstartserver=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT, async ()=>{
        console.log(`server started on PORT: ${PORT}`);
        const service=new UserService();
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
        const U1=await User.findByPk(2);
        const R1=await Role.findByPk(1);

        U1.addRole(R1);
        const response=await U1.hasRole(R1);
        console.log(response);
        // // const newToken=service.createToken({email:'shiva@gmail.com',id:1});
        // // console.log("new token is ",newToken);
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MjE3NTg5MDEsImV4cCI6MTcyMTc2MjUwMX0.CqSsdV2Tte2gXbgE-VLfG1qLza7MpZF798fMhFCnH78'
        // const response=service.verifyToken(token);
        // console.log(response);
        // // const repo=new UserRepository();
        // // const response=await repo.getById(1);
        // // console.log(response);

    });

} 
prepareAndstartserver();   