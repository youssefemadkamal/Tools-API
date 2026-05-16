const mongoose = require("mongoose");
require("dotenv").config();
// module.exports = mongoose
//   .connect("mongodb://localhost:27017/tools")
//   .then(()=>console.log("db connected"))
//   .catch((err)=> console.error(err)
//   );

const url =process.env.MONGODB_URL

const dbConnection = async ()=>{
    try{
            await mongoose.connect(url);
            console.log("db connectd")
    }catch(err){
        console.error("error : ",err.message);
    }
}

module.exports = dbConnection;