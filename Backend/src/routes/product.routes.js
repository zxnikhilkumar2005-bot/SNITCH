import express from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
import { createProductValidator } from '../validator/product.validator.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),  
    limits:{
        fileSize: 10 * 1024 * 1024, // 10MB per file
    }
});

const router = express.Router();

router.post("/", authenticateSeller, upload.array('image',7), createProductValidator, createProduct);

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            message: 'File too large. Please upload an image up to 10MB.'
        });
    }

    next(error);
});


export default router;