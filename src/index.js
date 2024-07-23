const express=require('express');

const { PORT }=require('./config/serverConfig');
const app=express();

const prepareAndstartserver=()=>{
    app.listen(PORT,()=>{
        console.log(`server started on PORT: ${PORT}`);
    });

} 
prepareAndstartserver();   