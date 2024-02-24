const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://samiaahmad34:pakistan12@cluster0.fg1zopz.mongodb.net/yumfood?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        const connect = await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        });

        if (connect) {
            console.log("Connected to MongoDB");

            const fetchData = await mongoose.connection.db.collection("food-items").find({}).toArray();
            console.log("Fetched data:");
            const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
            global['food-items'] = fetchData; // Store data in a global variable
          global['foodCategory'] = foodCategory;
        } else {
            console.error("Failed to connect to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
