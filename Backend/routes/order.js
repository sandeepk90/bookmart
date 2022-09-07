const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const Order = require('../models/Order');
const { orderSchema } = require('../middlewares/validation_schema')
const createError = require('http-errors');
const router = require('express').Router();

// Create
router.post('/', verifyToken, async (req, res,next) => {
    
    try {
        const result = await orderSchema.validateAsync(req.body);
        const newOrder = new Order(result);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        // res.status(500).json(err);
        if (err.isJoi === true) {
            // 422 => unprocessable entity 
            err.status = 422;
        }
        next(err);
    }
})


// Update 
router.put('/:id', verifyTokenAndAdmin, async (req, res,next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!updatedOrder) {
            throw createError(404, 'Order does not exist')
        }
        
        res.status(200).json(updatedOrder);
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Order Id/Data'))
            return;
        }
        next(err);
    }
})

// Delete 
router.delete('/:id', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const result = await Order.findByIdAndDelete(req.params.id);

        if (!result) {
            throw createError(404, 'Order does not exist')
        }
        res.status(200).json("Order has been deleted...")
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Order Id'))
            return;
        }
        next(err);
    }
})

// Get User Orders 
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });

        if (!orders) {
            throw createError(404, 'Order does not exist')
        }

        res.status(200).json(orders);

    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Order Id'))
            return;
        }
        next(err);
    }
})

// Get All
router.get('/', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (orders.length === 0) {
            throw createError(404, 'No Order exist')
        }
        res.status(200).json(orders);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})

// Get Monthly Income
router.get('/income', verifyTokenAndAdmin, async (req, res,next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }
                }
            },
            { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
            { $group: { _id: '$month', total: { $sum: "$sales" } } }
        ]);
        res.status(200).json(income);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})

module.exports = router;