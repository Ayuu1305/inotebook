const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "ayushsadhvani";

// ROUTE 1 Create a user using: POST "/api/auth/createuser" (doesn't require auth)

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").trim().isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the user with the email exists already
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Create the user and wait for the result
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      // Generate authentication token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // Send the token in the response
      res.json({ authToken });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2 Authenticate a user using: POST "/api/auth/login"
router.post(
    "/login",
    [
      body("email", "Enter a valid email").trim().isEmail(),
      body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Use destructuring assignment to extract email and password from req.body
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
  
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
  
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authToken = jwt.sign(data, JWT_SECRET);
  
        // Send the token in the response
        res.json({ authToken });
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );

// ROUTE 3 Get loggedin user details using: POST "/api/auth/getuser".login required

router.post(
    "/getuser",fetchuser,
    async (req, res) => {
  

try {
    const userid=req.user.id
    const user= await User.findById(userid).select("-password")
    res.send(user)
} catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
}
 
    })

  module.exports = router;
  