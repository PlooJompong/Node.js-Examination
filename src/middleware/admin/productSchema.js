import Joi from "joi"

// Add product
const addProductSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  desc: Joi.string().min(5).max(50).required(),
  price: Joi.number().integer().required(),
});

// Update product
const updateProductSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  desc: Joi.string().min(5).max(50),
  price: Joi.number(),
  productID: Joi.string().alphanum().length(16).required(),
});

// Delete product
const deleteProductSchema = Joi.object({
  productID: Joi.string().alphanum().length(16).required(),
})

const discountSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  products: Joi.array().min(1).required(),
  price: Joi.number().integer().required(),
});

// Validate product
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}

export { addProductSchema, updateProductSchema, deleteProductSchema, discountSchema, validateRequest }