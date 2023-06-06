const EmployeeDetails = require("../server");



//create
exports.create = async (req, res) => {
   
     try {
    const {employeename,email,department} = req.body;
    const resultdata = await new EmployeeDetails({employeename,email,department}).save()
     res.json(resultdata);
  
  } catch (err) {
   
    res.status(400).send("Create Failed.Please check the data again.");
  }
};

//read
exports.list = async (req, res) =>
  res.json(await EmployeeDetails.find({}).sort({ createdAt: -1 }).exec());

//update
exports.update = async (req, res) => {
  const { employeename,email,department } = req.body;
  try {
    const updated = await EmployeeDetails.findOneAndUpdate(
      { employeename:employeename},
      { employeename,email,department}
    );
    res.json(updated);
  } catch (err) {
    
    res.status(400).send("There was some error in update");
  }
};

//delete
exports.remove=async(req,res)=>{
     try {
    const deleted = await EmployeeDetails.findOneAndDelete({ employeename:req.params.employeename });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("OOPS!Not deleted");
  }
}

//findone
exports.findone=async(req,res)=>{
    try{
        const result=await EmployeeDetails.findOne({employeename:req.params.employeename})
        res.json(result)
    }
    catch(err)
    {
        res.status(404).send("Data Not found")
    }
}

//get same department details
exports.depart=async(req,res)=>{
    try{
        const result=await EmployeeDetails.aggregate([{
    $match:{
        department:req.params.department
    }

},
{
    $project:{
        employeename:1,
        department:1
    }
}])
res.json(result)
    }
    catch(err)
    {
        res.status(500).send("bad request")
    }
}