const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
  id: Number,
  img: String,
  name: String,
  coursename: String,
  review: String,
});

const EmployeeModel = mongoose.model("ReviewData", EmployeeSchema);

module.exports = EmployeeModel;
