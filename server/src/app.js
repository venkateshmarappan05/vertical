const express =require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const usersRoutes = require('./routes/odbcroute');
const leaveRoutes = require('./routes/leaveroute');
const adminRoutes = require('./routes/adminroute');

app.use('/user', usersRoutes);
app.use('/leave', leaveRoutes);
app.use('/admin', adminRoutes);

 let PORT= process.env.PORT || 5000;
 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

