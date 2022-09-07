const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const Cart = require('../models/Cart');
const { cartSchema } = require('../middlewares/validation_schema')
const router = require('express').Router();
const createError = require('http-errors');

// Create
router.post('/', async (req, res,next) => {
    
    try {
        const result = await cartSchema.validateAsync(req.body);
        const newCart = new Cart(result);
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
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
router.put('/:id', verifyTokenAndAuthorization, async (req, res,next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!updatedCart) {
            throw createError(404, 'Cart does not exist')
        }
        
        res.status(200).json(updatedCart);
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Cart Id/Data'))
            return;
        }
        next(err);
    }
})

// Delete 
router.delete('/:id', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const result = await Cart.findByIdAndDelete(req.params.id);
        if (!result) {
            throw createError(404, 'Cart does not exist')
        }
        res.status(200).json("Cart has been deleted...")
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Cart Id'))
            return;
        }
        next(err);
    }
})

// Get User Cart 
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});

        if (!cart) {
            throw createError(404, 'Cart does not exist')
        }
        res.status(200).json(cart);

    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Cart Id'))
            return;
        }
        next(err);
    }
})

// Get All
router.get('/', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const carts = await Cart.find();
        if (carts.length === 0) {
            throw createError(404, 'No Cart exist')
        }
        res.status(200).json(carts);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})

module.exports = router;