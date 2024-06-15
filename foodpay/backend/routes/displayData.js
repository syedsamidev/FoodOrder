const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post("/fooddata", async (req, res) => {
    try {
        const food_items = await mongoose.connection.db.collection("food_items");
        const foodCategory = await mongoose.connection.db.collection("food_category");

        const [data, catData] = await Promise.all([
            food_items.find({}).toArray(),
            foodCategory.find({}).toArray()
        ]);

        global.food_items = data;
        global.foodCategory = catData;

        return res.status(200).json({ success: true, data: global.food_items , catData: global.foodCategory});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;
