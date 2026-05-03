require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyToken, isAdmin } = require("./middleware/auth");
const User = require("./models/user");
const Issue = require("./models/issue");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/collegeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(password))
    return res.status(400).json({ message: "Weak password" });

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  await new User({ name, email, password: hashed, role: role || "student" }).save();

  res.status(201).json({ message: "Registered" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id: user._id.toString(),
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// POST /issues -> create issue
app.post("/issues", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  await new Issue({
    title,
    description,
    student_id: req.user.id
  }).save();

  res.status(201).json({ message: "Issue added" });
});

// GET /issues -> fetch all issues (admin)
app.get("/issues", verifyToken, isAdmin, async (req, res) => {
  try {
    const issues = await Issue.find().populate('student_id', 'name email');
    
    // Map to include a generic student ID string if frontend expects it, or keep populated object
    const mapped = issues.map(i => {
      const obj = i.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /issues/student/:id -> fetch student issues
app.get("/issues/student/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const issues = await Issue.find({ student_id: req.params.id });
    const mapped = issues.map(i => {
      const obj = i.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET STATS
app.get("/stats", verifyToken, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== "admin") {
      filter.student_id = req.user.id;
    }

    const issues = await Issue.find(filter);
    
    const stats = {
      total: issues.length,
      pending: issues.filter(i => i.status === "Pending").length,
      inProgress: issues.filter(i => i.status === "In Progress").length,
      resolved: issues.filter(i => i.status === "Completed").length,
      rejected: 0
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /issues/:id -> update status + resolution
app.put("/issues/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, resolution } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (resolution !== undefined) updateData.resolution = resolution;
    
    await Issue.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running 5000"));