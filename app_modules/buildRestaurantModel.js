module.exports = function (req) {
  const doc = {
    restaurantInfo: {
      name: req.body.name,
      phone: req.body.phone,
      website: req.body.website
    },
    restaurantAddress: {
      street: req.body.street,
      city: req.body.city,
      zip: req.body.zip,
      state: "CA",
    },
    restaurantAttributes: {
      holeInWall: req.body["hole in the wall"],
      alcohol: req.body["in happy hour"],
      happyHour: req.body["serves beer & alcohol"]
    },
    restaurantHours: {
      mon: [req.body.openMonday, req.body.closeMonday],
      tue: [req.body.openTuesday, req.body.closeTuesday],
      wed: [req.body.openWednesday, req.body.closeWednesday],
      thu: [req.body.openThursday, req.body.closeThursday],
      fri: [req.body.openFriday, req.body.closeFriday],
      sat: [req.body.openSaturday, req.body.closeSaturday],
      sun: [req.body.openSunday, req.body.closeSunday]
    }
  };
  return doc;
};