const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const Student = require("./models/studentModel");
const Group = require("./models/groupModel");
require("dotenv").config();
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
const mongoURI = process.env.DB_URL;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Route to create groups
app.post("/createGroups", async (req, res) => {
  const { Size } = req.body;
  if (!Size) {
    return res
      .status(400)
      .json({ errors: new Error("Please Provide Valid Size for group") });
  }
  try {
    // Create groups
    const groups = await Promise.all(
      Array.from({ length: Size }, () =>
        Group.create({ limit: Size, students: [] })
      )
    );

    res.json({ message: "Groups created successfully", groups });
  } catch (error) {
    console.error("Error creating groups:", error);
    res
      .status(500)
      .json({ message: "Error creating groups", error: error.message });
  }
});

// Add students to groups
app.post("/addStudents", async (req, res) => {
  const { students } = req.body;
  try {
    const studentDocs = await Student.insertMany(students);

    // Add students to groups in a round-robin fashion
    const groups = await Group.find();
    studentDocs.forEach((student, index) => {
      groups[index % groups.length].students.push(student._id);
    });

    // Save the updated groups
    await Promise.all(groups.map((group) => group.save()));

    res.json({ message: "Students added successfully", groups });
  } catch (error) {
    console.error("Error adding students:", error);
    res.status(500).json({ message: "Error adding students", error });
  }
});

app.post("/groupStudents", async (req, res) => {
  const { method } = req.body;
  try {
    // Fetch all groups and populate the 'students' field
    const groups = await Group.find().populate("students");

    if (!groups || groups.length === 0) {
      return res.status(404).json({ message: "No groups found" });
    }

    let groupedStudents = [];

    switch (method) {
      case "nameAsc":
        groupedStudents = groups.map((group) => ({
          ...group.toObject(),
          students: group.students.sort((a, b) => a.name.localeCompare(b.name)),
        }));
        break;
      case "nameDesc":
        groupedStudents = groups.map((group) => ({
          ...group.toObject(),
          students: group.students.sort((a, b) => b.name.localeCompare(a.name)),
        }));
        break;
      case "userID":
        groupedStudents = groups.map((group) => ({
          ...group.toObject(),
          students: group.students.sort((a, b) => a.userID - b.userID),
        }));
        break;
      case "clustering":
        groupedStudents = clusterStudents(groups); // Call clusterStudents function
        break;
      default:
        return res.status(400).json({ message: "Invalid grouping method" });
    }

    res.json({ message: "Students grouped successfully", groupedStudents }); // Return groupedStudents data
  } catch (error) {
    console.error("Error grouping students:", error);
    res.status(500).json({ message: "Error grouping students", error });
  }
});

function clusterStudents(groups) {
  let allStudents = groups.flatMap((group) => group.students);
  allStudents.sort((a, b) => b.mark - a.mark);

  let clusteredGroups = Array.from({ length: groups.length }, () => []);

  let low = 0;
  let high = allStudents.length - 1;

  for (let i = 0; i < allStudents.length; i++) {
    if (i % 2 === 0) {
      clusteredGroups[i % groups.length].push(allStudents[high--]);
    } else {
      clusteredGroups[i % groups.length].push(allStudents[low++]);
    }
  }

  return clusteredGroups.map((cluster) => ({ students: cluster })); // Return clusteredGroups
}

// Route to get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students); // Send JSON response with fetched students
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students', error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
