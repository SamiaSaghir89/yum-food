const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')
router.post('/orderData', async (req, res) => {
    const { order_data, order_date, email } = req.body;

    if (!Array.isArray(order_data)) {
        return res.status(400).json({ success: false, message: 'Invalid order data format' });
    }

    order_data.unshift({ Order_date: order_date });

    try {
        let emailId = await Order.findOne({ 'email': email });
        console.log(emailId);

        if (emailId === null) {
            await Order.create({
                email: email,
                order_data: [order_data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error: " + error.message);
    }
});
router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("server error",error.message)

    }
})

module.exports = router;
