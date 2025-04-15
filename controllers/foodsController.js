const Foods = require("../models/foodModel");

const addFood = async(req, res) => {
   try{
    const food = await Foods({...req.body});
    await food.save();
    res.status(200).send({message: "Food added successfully", food})
   } catch(error){
    console.log(error)
    res.status(500).send({message: "Server Error", error})
   }

}

const getFood = async(req, res) => {
   try{
      const {id} = req.params;
      const food = await Foods.findById(id)
      if(!food){
         return res.status(404).send({message: "Food not found"})
      }
      return res.status(200).send({message: "Found", food})
   } catch(error){
      console.log(error)
      res.status(500).send({message: "Server Error", error})
   }
}

const getAllFoods = async(req,res) =>{
   try{
      const getAll = await Foods.find({});
      if(!getAll){
         return res.status(404).send({message: "No foods found"})
      }
      return res.status(200).send({message: "Foods found", getAll})
   }catch(error){
      console.log(error)
      res.status(500).send({message: "Server Error"})
   }
}

const updateFood = async(req, res) => {
   try{
      const {id} = req.params;
      const updatedFood = await Foods.findByIdAndUpdate(id, {...req.body});
      if(!updatedFood) return res.status(500).send({message: "Food not found"});
      return res.status(200).send({message: "food updated", updatedFood})
   }catch(error){
      console.log(error)
      res.status(500).send({message: "Server Error"})
   }
}

const deleteFood = async(req, res) =>{
   const {id} = req.params;
   const deleteFood = await Foods.findByIdAndDelete(id);
   if(!deleteFood) return res.status(500).send({message: "food with id not found"})
   return res.status(200).send({message: "Food has been removed from the dashboard"})
}


module.exports = {
   addFood,
   getFood,
   getAllFoods,
   updateFood,
   deleteFood
}