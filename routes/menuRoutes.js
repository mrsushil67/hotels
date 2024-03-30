const express = require("express");
const router = express.Router();
const menuModel = require("../models/menu")

router.get("/", async (req,res)=>{
    try {
        const data =await menuModel.find()
        console.log("Data found \n",data)
        res.status(200).json({foundData:data})
    } catch (error) {
       console.log(error) 
    }
})

router.post("/", async (req,res)=>{
    try {
        const data = req.body;
        const newMenu = menuModel(data)
        const resp = await newMenu.save()
        console.log("menu data saved")
        console.log(resp)
        res.status(200).json({MenuData:resp})
    } catch (error) {
        console.log("Error is : ",error)
    }
})
router.get("/:itemtaste", async(req,res)=>{
    try {
        const itemtaste = req.params.itemtaste;
        if(itemtaste == "sweet" || itemtaste == "spicy" || itemtaste == "sour"){
            const resp = await menuModel.find({taste:itemtaste})
            console.log("Data Fetched")
            res.status(200).json({fetchedData:resp})
        }
        else{
            res.status(404).json({error:"invalid taste type"}); 
        }
    } catch (error) {
        console.log("Error : ",error)
            res.status(500).json({error:"error in get request"});
    }
})

module.exports = router