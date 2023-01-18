const mongoose=require("mongoose");

const busLocSchema=new mongoose.Schema({
    location:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("locations",busLocSchema);