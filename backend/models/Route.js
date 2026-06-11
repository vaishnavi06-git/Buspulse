const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    currentCount: {
      type: Number,
      default: 0,
    },
    crowdStatus: {
      type: String,
      enum: ["RED", "YELLOW", "GREEN"],
      default: "GREEN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
