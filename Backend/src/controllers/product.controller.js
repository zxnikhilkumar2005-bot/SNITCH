import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {
    try {
        const {
            title,
            description,
            decription,
            priceAmount,
            priceCurrency,
        } = req.body || {};
        const seller = req.user;
        const normalizedDescription = description || decription;
        const amount = Number(priceAmount);

        if (!title || !normalizedDescription || Number.isNaN(amount)) {
            return res.status(400).json({
                message: "title, description and valid priceAmount are required",
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "At least one image is required",
            });
        }

        const images = await Promise.all(req.files.map(async (file) => {
            const uploadedFile = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
            });

            return {
                url: uploadedFile.url,
                alt: file.originalname,
            };
        }));

        const product = await productModel.create({
            title,
            description: normalizedDescription,
            price: {
                amount,
                currency: priceCurrency || "INR"
            },
            images,
            seller: seller._id
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create product",
        });
    }

}