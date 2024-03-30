const express = require("express");
const router = express.Router();
const personModel = require("../models/person");

router.get("/", async (req, res) => {
  try {
    const data = await personModel.find();
    console.log("Data Fetched");
    res.status(200).json({ FetchedData: data });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Error in get request" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = personModel(data);
    const resp = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json({ Added_data: resp });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const resp = await personModel.find({ work: workType });
      console.log("response fetched");
      res.status(200).json({ FatchedData: resp });
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Error in get request" });
  }
});

router.put("/:id", async (req,res)=>{
    try {
       const personId = req.params.id;
       const updatedpersonData = req.body;
       
       const resp = await personModel.findByIdAndUpdate(personId,updatedpersonData,{
        new:true,
        runValidators:true
       })
       if(!resp){
        return res.status(404).json({error:"person not found"})
       }
       console.log("Updated data")
       res.status(200).json({updatedData:resp})
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error in get request" });
        
    }
})
router.delete("/:id", async(req,res)=>{
    try {
        const personId = req.params.id;
        const resp = await personModel.findByIdAndDelete(personId)
        if(!resp){
            return res.status(404).json({error:`id: ${personId} is not exist`})
           }
        console.log("Data Deleted");
        res.status(200).json({massage:`id : ${personId} deleted Successfully`,DeletedData:resp})
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error in delete request" });
        
    }
})

module.exports = router