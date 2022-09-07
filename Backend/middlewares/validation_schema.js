const Joi = require('joi');

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email:Joi.string().email().lowercase().required(),
    passward: Joi.string().min(6).required(),
    isAdmin: Joi.boolean(),
    img: Joi.string()
})

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().required(),
    publisher: Joi.string().required(),
    desc: Joi.string().required(),
    img: Joi.string().required(),
    categories: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    inStock: Joi.boolean()
})

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    books: Joi.array().items(Joi.object({
        bookId: Joi.string().required(),
        quantity: Joi.number()
    })
    ).required(),
    amount: Joi.number().required(),
    address: Joi.string().required(),
    status: Joi.string()
})

const cartSchema = Joi.object({
    userId: Joi.string().required(),
    books: Joi.array().items(Joi.object({
        bookId: Joi.string().required(),
        quantity: Joi.number()
    })
    ).required(),
});

module.exports = {
    authSchema,
    bookSchema,
    cartSchema,
    orderSchema
}