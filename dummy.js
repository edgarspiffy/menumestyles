db.dishes.insertMany([
  {
    name: "Mac-Cheese",
    spotName: "McD",
    ingredients: ["burger", "bun", "cheese"],
    attributes: {
      vegan: true,
      spicy: true,
      price: 9
    }
  },
  {
    name: "BigMac",
    spotName: "McD",
    ingredients: ["burger","bun","cheese"],
    attributes: {
      vegan: true,
      spicy: false,
      price: 9
    }
  },
  {
    name: String,
    spotName: String,
    ingredients: ["lettuce", "tommato", "onions"],
    attributes: {
      vegan: true,
      spicy: true,
      price: 2
    }
  }])