const Faculty = require('../models/Faculty');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();


   exports.updateLogo = async (req, res) => {
     try {
       // Find the faculty by their ID
       const faculty = await Faculty.findById(req.user.id);
       if (!faculty) {
         return res.status(404).json({ message: 'Faculty not found' });
       }

       // Update the faculty's logo
       faculty.logo = req.body.logo;
       await faculty.save();

       res.status(200).json({ message: 'Faculty logo updated successfully' });
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };

   exports.updatePassword = async (req, res) => {
     try {
       // Find the faculty by their ID
       const faculty = await Faculty.findById(req.user.id);
       if (!faculty) {
         return res.status(404).json({ message: 'Faculty not found' });
       }

       // Check if the current password is correct
       const isMatch = await faculty.comparePassword(req.body.currentPassword);
       if (!isMatch) {
         return res.status(401).json({ message: 'Invalid current password' });
       }

       // Update the faculty's password
       faculty.password = req.body.newPassword;
       await faculty.save();

       res.status(200).json({ message: 'Faculty password updated successfully' });
     } catch (err) {
       res.status(500).json({ message: 'Internal server error' });
     }
   };
  /* 
const express = require('express');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken"); 
const router = express.Router();

const facultyControllers = require('../controllers/facultyControllers');
const verifyToken = require('../routes/verifyToken');

// Update faculty profile routes
router.patch('/profile/logo', verifyToken.authenticate, facultyControllers.updateLogo);
router.patch('/profile/password', verifyToken.authenticate, facultyControllers.updatePassword);*/

module.exports = router;
