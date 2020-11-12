module.exports = function (data, req) {
  // Make Ingridients into array
  let ingredients = req.body.ingredients;
  ingredients = ingredients.toLowerCase();
  ingredients = ingredients.replace(/\s*,\s*/g, ",");
  ingredients = ingredients.split(",");

  let dishName = req.body.dishName;
  dishName = dishName.toLowerCase();
  // BUILD DOC
  const doc = {
    // UNIQUE DATA
    dishInfo: {
      name: dishName,
      ingredients: ingredients,
      price: req.body.price,
    },
    dishAttributes: {
      vegan: true,
      vegetarian: true,
      spicy: true
    },
    // PULLED DATA
    restaurantInfo: {
      name: data.restaurantInfo.name,
      phone: data.restaurantInfo.phone,
      website: data.restaurantInfo.website
    },
    restaurantAddress: {
      street: data.restaurantAddress.street,
      city: data.restaurantAddress.city,
      zip: data.restaurantAddress.zip,
      state: "CA",
    },
    restaurantAttributes: {
      holeInWall: data.restaurantAttributes["hole in the wall"],
      alcohol: data.restaurantAttributes["in happy hour"],
      happyHour: data.restaurantAttributes["serves beer & alcohol"]
    },
    restaurantHours: {
      mon: data.restaurantHours.mon,
      tue: data.restaurantHours.tue,
      wed: data.restaurantHours.wed,
      thu: data.restaurantHours.thu,
      fri: data.restaurantHours.fri,
      sat: data.restaurantHours.sat,
      sun: data.restaurantHours.sun
    },
    restaurantID: [data._id],
  }
  return doc;
};