const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const Book = require('../models/Book');
const createError = require('http-errors');
const router = require('express').Router();
const mongoose = require('mongoose');
const { bookSchema } = require('../middlewares/validation_schema')


// Create
router.post('/', verifyTokenAndAdmin, async (req, res, next) => {
    
    try{
        const result = await bookSchema.validateAsync(req.body);
        const newBook = new Book(result);
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    }catch(err){
        // res.status(500).json(err);
        if (err.isJoi === true) {
            // 422 => unprocessable entity 
            err.status = 422;
        }
        next(err);
    }
} )

// Update 
router.put('/:id', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        // const result = await bookSchema.validateAsync(req.body);
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        // console.log(updatedBook)
        if (!updatedBook) {
            throw createError(404, 'Book does not exist')
        }
        
        res.status(200).json(updatedBook);
    } catch (err) {
        // console.log(err);
        // res.status(500).json(err);
        if (err.isJoi === true) {
            // 422 => unprocessable entity 
            err.status = 422;
        }
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Book Id/Data'))
            return;
        }
        next(err);
    }
})

// Delete 
router.delete('/:id', verifyTokenAndAdmin, async (req, res, next) => {
    try {
        // console.log(req.params.id);
        const result = await Book.findByIdAndDelete(req.params.id);
        // console.log(result)
        if (!result) {
            throw createError(404, 'Book does not exist')
        }
        res.status(200).json("Book has been deleted...")
    } catch (err) {
        // res.status(500).json(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Book Id'))
            return;
        }
        next(err);
    }
})

// Get Book 
router.get('/find/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            throw createError(404, 'Book does not exist') 
        }

        res.status(200).json(book);

    } catch (err) {
        // res.status(500).json(err);
        if(err instanceof mongoose.CastError){
            next(createError(400, 'Invalid Book Id'))
            return;
        }
        next(err);
    }
})

// Get All Books 
router.get('/', async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let books;
        if(qNew){
            books = await Book.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            books = await Book.find({
                categories:{$in : [qCategory]}
            });
        }else{
            books = await Book.find();
        }

        if (books.length === 0) {
            throw createError(404, 'No Book exist')
        }

        res.status(200).json(books);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
})


module.exports = router;