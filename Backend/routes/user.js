const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const User = require('../models/User');
const { authSchema } = require('../middlewares/validation_schema')
const router = require('express').Router();
const bcrypt=require('bcrypt');
const createError = require('http-errors');

// for admin only 
router.post('/', verifyTokenAndAdmin, async (req, res, next) => {

    
    // const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     passward: hashedPassward,
    //     isAdmin:req.body.isAdmin,
    // });
    
    try {
        const result = await authSchema.validateAsync(req.body);
        
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) {
            throw createError.Conflict(`${result.email} is already been registered`)
        }
        const hashedPassward = await bcrypt.hash(result.passward, 10);

        const newUser = new User({
            username: result.username,
            email: result.email,
            passward: hashedPassward,
            isAdmin: result.isAdmin,
            img:result.img
        });

        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        // console.log(err);
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
    if (req.body.passward) {
        req.body.passward = await bcrypt.hash(req.body.passward, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!updatedUser) {
            throw createError(404, 'User does not exist')
        }
        
        res.status(200).json(updatedUser);
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid User Id/Data'))
            return;
        }
        next(err);
    }
})

// Delete 
router.delete('/:id', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) {
            throw createError(404, 'User does not exist')
        }
        
        res.status(200).json("User has been deleted...")
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid User Id'))
            return;
        }
        next(err);
    }
})

// Get User 
router.get('/find/:id', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw createError(404, 'User does not exist')
        }

        const { passward, ...userData } = user._doc;
        res.status(200).json(userData);

    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid User Id'))
            return;
        }
        next(err);
    }
})

// Get All User 
router.get('/', verifyTokenAndAdmin, async (req, res, next) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();

        if (users.length === 0) {
            throw createError(404, 'No User exist')
        }
        res.status(200).json(users);

    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})


// GET STATS 
router.get('/stats', verifyTokenAndAdmin, async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } }
        ])

        res.status(200).json(data);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})

module.exports = router;