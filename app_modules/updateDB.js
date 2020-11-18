const attributes = require('./attributes');
module.exports = function (req) {
  const doc = {
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
      // holeInWall: data.restaurantAttributes["hole in the wall"],
      // alcohol: data.restaurantAttributes["in happy hour"],
      // happyHour: data.restaurantAttributes["serves beer & alcohol"]
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
  };
  attributes.spotFilters.forEach(attribute => {
    doc["restaurantAttributes"][attribute] = req.body[attribute];
  });
  return doc;
};
