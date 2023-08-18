
/*const Student = require('../models/Student');

   // Get all students
   exports.getAllStudents = async (req, res) => {
     try {
       const students = await Student.find();
       res.json(students);
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };

   // Get a specific student by ID
   exports.getStudentById = async (req, res) => {
     try {
       const student = await Student.findById(req.params.id);
       if (!student) {
         return res.status(404).json({ message: 'Student not found' });
       }
       res.json(student);
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };

   // Create a new student
   exports.createStudent = async (req, res) => {
     try {
       const { email, password, active } = req.body;
       const student = await Student.create({ email, password, active });
       res.status(201).json(student);
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };

   // Update a student
   exports.updateStudent = async (req, res) => {
     try {
       const { email, password, active } = req.body;
       const student = await Student.findByIdAndUpdate(
         req.params.id,
         { email, password, active },
         { new: true }
       );
       if (!student) {
         return res.status(404).json({ message: 'Student not found' });
       }
       res.json(student);
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };

   // Delete a student
   exports.deleteStudent = async (req, res) => {
     try {
       const student = await Student.findByIdAndDelete(req.params.id);
       if (!student) {
         return res.status(404).json({ message: 'Student not found' });
       }
       res.json({ message: 'Student deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };
   
const studentController = require('../controllers/studentController');
   router.get('/students', studentController.getAllStudents);
   router.get('/students/:id', studentController.getStudentById);
   router.post('/students', studentController.createStudent);
   router.put('/students/:id', studentController.updateStudent);
   router.delete('/students/:id', studentController.deleteStudent);

   module.exports = router;*/


   const Student = require("../models/Student");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STUDENT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const { password, ...others } = student._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Students
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STUDENTS STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Student.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


   