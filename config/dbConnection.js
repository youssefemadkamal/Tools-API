const mongoose = require("mongoose");

// module.exports = mongoose
//   .connect("mongodb://localhost:27017/tools")
//   .then(()=>console.log("db connected"))
//   .catch((err)=> console.error(err)
//   );


const dbConnection = async ()=>{
    try{
            await mongoose.connect("mongodb://localhost:27017/tools");
            console.log("db connectd")
    }catch(err){
        console.error("error : ",err.message);
    }
}

module.exports = dbConnection;