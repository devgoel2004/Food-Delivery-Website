const mongoose = require("mongoose");

const DB = `mongodb+srv://devgoel12072004:9690011021@cluster0.3xphctz.mongodb.net/?retryWrites=true&w=majority`;
const mongoDB = async () => {
  await mongoose.connect(DB, { useNewUrlParser: true }, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      const fetchData = await mongoose.connection.db.collection("food Items");
      fetchData.find({}).toArray(async function (err, data) {
        global.food_items = data;
        const foodCategory = await mongoose.connection.db.collection(
          "food Category"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) {
            console.log(err);
          } else {
            global.food_category = catData;
          }
        });
      });
    }
  });
};
module.exports = mongoDB;
