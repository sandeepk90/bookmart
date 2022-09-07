const router = require('express').Router();
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authSchema } = require('../middlewares/validation_schema')
const { signAccessToken } = require("../middlewares/jwt_helper");

// Register original code
// router.post('/register', async (req, res, next)=> {
//     // console.log(req.body);

//     const hashedPassward = await bcrypt.hash(req.body.passward, 10);

//     const newUser = new User({
//         username:req.body.username,
//         email: req.body.email,
//         passward:hashedPassward,
//     });

//     try{
//         const savedUser = await newUser.save();
//         // console.log(savedUser);
//         res.status(201).json(savedUser);
//     }catch(err){
//         // console.log(err);
//         res.status(500).json(err);
//     }

// })


// updated code
router.post('/register', async (req, res, next) => {
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
        });

        const savedUser = await newUser.save();
        const accessToken = await signAccessToken({
            id: savedUser._id,
            isAdmin: savedUser.isAdmin,
        });

        const { passward, ...userData } = savedUser._doc;
        res.status(201).json({ ...userData,accessToken});
    } catch (err) {
        if (err.isJoi === true) {
            // 422 => unprocessable entity 
            err.status = 422;
        }
        next(err);
    }

})



// // Login 
// router.post('/login', async (req, res, next) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });

//         if (!user) {
//             return res.status(401).json("wrong credentials!")
//         }

//         const isOriginalPasswardMatch = await bcrypt.compare(req.body.passward, user.passward);
//         // console.log(isOriginalPasswardMatch)

//         if (!isOriginalPasswardMatch) {
//             return res.status(401).json("wrong credentials!")
//         }

//         const accessToken = jwt.sign(
//             {
//                 id: user._id,
//                 isAdmin: user.isAdmin,
//             },
//             process.env.JWT_SEC,
//             { expiresIn: '3d' }
//         );

//         const { passward, ...userData } = user._doc;
//         res.status(200).json({ ...userData, accessToken });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })



// updated Login 
router.post('/login', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);

        const user = await User.findOne({ email: result.email });

        if (!user) {
            throw createError.NotFound("User not registered")
        }

        const isMatch = await bcrypt.compare(result.passward, user.passward);

        if (!isMatch) {
            throw createError.Unauthorized("Invalid Email/Password")
        }

        const accessToken = await signAccessToken({
            id: user._id,
            isAdmin: user.isAdmin,
        });
        
        const { passward, ...userData } = user._doc;
        res.send({ ...userData, accessToken });
        
    } catch (err) {
        if(err.isJoi === true){
            return next(createError.BadRequest("Invalid Email/Password"))
        }
        next(err);
    }
})

module.exports = router;