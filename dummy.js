db.dishes.insertMany([
  {
    name: "Philly Sub",
    spotName: "Philly's House",
    ingredients: ["meat", "bun", "cheese"],
    attributes: {
      vegan: true,
      spicy: true,
      price: 9
    }
  },
  {
    name: "Large Pizza",
    spotName: "Toppers",
    ingredients: ["meat", "bread", "tomatoe souce"],
    attributes: {
      vegan: false,
      spicy: true,
      price: 3
    }
  },
  {
    name: "Glizzy Dog",
    spotName: "The Gleeze",
    ingredients: ["buns", "sasuage", "meat","onions"],
    attributes: {
      vegan: false,
      spicy: false,
      price: 7
    }
  },
  {
    name: "Mac Cheese",
    spotName: "The Joint",
    ingredients: ["burger", "bun", "cheese","pickles","lettuce"],
    attributes: {
      vegan: false,
      spicy: true,
      price: 9
    }
  },
  {
    name: "Burger Farm",
    spotName: "Farm Brothers",
    ingredients: ["burger","bun","cheese","onions","jalapenos"],
    attributes: {
      vegan: true,
      spicy: true,
      price: 5
    }
  },
  {
    name: "Land and Sea",
    spotName: "Limon y Sal",
    ingredients: ["meat", "shrimp", "rice","beans"],
    attributes: {
      vegan: false,
      spicy: true,
      price: 5
    }
  }])