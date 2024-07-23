const express=require('express');
const bodyParser=require('body-parser');

const { PORT }=require('./config/serverconfig');

const apiRoutes=require('./routes/index');
 
const app=express();

const prepareAndstartserver=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`server started on PORT: ${PORT}`);
    });

} 
prepareAndstartserver();   