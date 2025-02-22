const Emp = require("../models/Emp");


// Create Emp
exports.createEmp = async (req, res) => {
    const { empId, empName, empSkills } = req.body;
    const emp = new Emp({ empId, empName, empSkills });
    await emp.save();
    res.json(emp);
};


// Get All Emp
exports.getAllEmp = async (req, res) => {
    try {
        const emp = await Emp.find();
        res.json(emp);
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
};
