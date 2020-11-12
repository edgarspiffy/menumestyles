module.exports = function (req) {
  // Make Ingridients into array
  let ingredients = req.body.ingredients;
  ingredients = ingredients.replace(/\s*,\s*/g, ",");
  ingredients = ingredients.split(",");
  // BUILD DOC
  const doc = {
    // UNIQUE DATA
    dishInfo: {
      name: req.body.dishName,
      ingredients: ingredients,
      price: req.body.price,
    },
    dishAttributes: {
      vegan: true,
      vegetarian: true,
      spicy: true
    },
  }
  return doc;
}