const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    const responseData = [global['food-items'], global['foodCategory']];
    res.send(responseData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error"); // Use status(500) to indicate a server error
  }
});

module.exports = router;
