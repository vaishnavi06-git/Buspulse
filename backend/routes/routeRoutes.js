const express = require("express");
const router = express.Router();
const Route = require("../models/Route");

function calculateCrowdStatus(count, capacity) {
  if (count > capacity) return "RED";
  if (count > 0.7 * capacity) return "YELLOW";
  return "GREEN";
}

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Route API working");
});

// ADD DUMMY ROUTES (ONE TIME)
router.post("/add-dummy", async (req, res) => {
  try {
    const routes = [
      { routeName: "Secunderabad - Kukatpally", capacity: 50 },
      { routeName: "LB Nagar - Mehdipatnam", capacity: 55 },
      { routeName: "Uppal - Hitech City", capacity: 60 },
    ];

    await Route.insertMany(routes);
    res.status(201).json({ message: "Dummy routes added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL ROUTES
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SIMULATE PASSENGER COUNT (ADMIN USE)
router.post("/simulate", async (req, res) => {
  try {
    const routes = await Route.find();

    for (let route of routes) {
      const randomCount = Math.floor(
        Math.random() * (route.capacity + 20)
      );

      route.currentCount = randomCount;
      route.crowdStatus = calculateCrowdStatus(
        randomCount,
        route.capacity
      );

      await route.save();
    }

    res.json({ message: "Crowd simulation updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
