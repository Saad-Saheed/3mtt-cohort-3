import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import CustomError from './helpers/customError.js';
import { isPositiveInteger, isValidNumber, isValidString } from "./helpers/validator.js";

const app = express();
const PORT = 3000;
const HOST = 'localhost';
// Mock database
let products = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/products', async (req, res, next) => {
    try {
        res.status(200).json({
            error: false,
            statusCode: 200,
            data: products,
            message: 'Products fetched successfully',
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ID parameter
        const productId = parseInt(id);
        if (!isPositiveInteger(productId)) {
            throw new CustomError("Invalid product ID", 400);
        }

        const product = products.find((product) => product.id === productId);

        if (!product) {
            throw new CustomError("Product not found", 404);
        }

        res.status(200).json({
            error: false,
            statusCode: 200,
            data: product,
            message: 'Product fetched successfully',
        });

    } catch (error) {
        next(error);
    }
});

app.post('/api/products', async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        // Validate the request body
        if (!isValidString(name, 3)) {
            throw new CustomError("Name must be a string with at least 3 characters", 400);
        }
        if (!isValidString(description, 10)) {
            throw new CustomError("Description must be a string with at least 10 characters", 400);
        }
        if (!isValidNumber(price)) {
            throw new CustomError("Price must be a positive number", 400);
        }

        const id = products.length + 1;
        const newProduct = {
            id,
            name,
            description,
            price,
        };
        products.push(newProduct);
        res.status(201).json({
            error: false,
            statusCode: 201,
            data: newProduct,
            message: 'Product created successfully',
        });

    } catch (error) {
        next(error);
    }
});

app.put('/api/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ID parameter
        const productId = parseInt(id);
        if (!isPositiveInteger(productId)) {
            throw new CustomError("Invalid product ID", 400);
        }

        const { name, description, price } = req.body;
        const productIndex = products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            throw new CustomError("Product not found", 404);
        }

        // Validate the request body
        if (name !== undefined && !isValidString(name, 3)) {
            throw new CustomError("Name must be a string with at least 3 characters", 400);
        }
        if (description !== undefined && !isValidString(description, 10)) {
            throw new CustomError("Description must be a string with at least 10 characters", 400);
        }
        if (price !== undefined && !isValidNumber(price)) {
            throw new CustomError("Price must be a positive number", 400);
        }

        // Update the product
        const updatedProduct = {
            ...products[productIndex],
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(price !== undefined && { price }),
        };
        products[productIndex] = updatedProduct;


        res.status(200).json({
            error: false,
            statusCode: 200,
            data: updatedProduct,
            message: 'Product updated successfully',
        });

    } catch (error) {
        next(error);
    }
});

app.delete('/api/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ID parameter
        const productId = parseInt(id);
        if (!isPositiveInteger(productId)) {
            throw new CustomError("Invalid product ID", 400);
        }

        const productIndex = products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            throw new CustomError("Product not found", 404);
        }
        products.splice(productIndex, 1);
        res.status(200).json({
            error: false,
            statusCode: 200,
            data: null,
            message: 'Product deleted successfully',
        });

    } catch (error) {
        next(error);
    }
});

app.use((req, res) => {
    throw new CustomError(
        'Route not found',
        404,
    );
});
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
