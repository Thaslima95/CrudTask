const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { readdirSync } = require("fs");
const bodyParser = require("body-parser");

const app=express();

mongoose.connect(process.env.DATABASE);



const EmployeeSchema = new mongoose.Schema(
  {
    employeename: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    email:{
        type:String,
        required:"Email is required"
    },
    department:{
        type:String,
        required:"Enter Employee Department"
        
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeDetails", EmployeeSchema);

app.use(bodyParser.json({limit:"2mb"}));

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));



app.listen(process.env.PORT,()=>{
    console.log("Backend Sever")
})





