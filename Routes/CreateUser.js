const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs"); // Import bcryptjs


router.use(express.json());

router.post('/createUser', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password

        await User.create({
            name: req.body.name,
            password: hashedPassword, // Store the hashed password
            email: req.body.email,
            location: req.body.location
        });

        res.json({ success: true });
    } catch (error) {
        console.log("Hello error:", error);
        res.json({ success: false });
    }
});

module.exports = router;
