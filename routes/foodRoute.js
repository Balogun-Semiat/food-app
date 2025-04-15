const {Router} = require("express");
const foodRoute = Router();
const {
    addFood,
    getFood,
    getAllFoods,
    updateFood,
    deleteFood
} = require("../controllers/foodsController")

foodRoute.post("/add-food", addFood);
foodRoute.get("/get-food/:id", getFood);
foodRoute.get("/all-foods", getAllFoods);
foodRoute.patch("/update/:id", updateFood);
foodRoute.delete("/delete/:id", deleteFood);



module.exports = foodRoute;