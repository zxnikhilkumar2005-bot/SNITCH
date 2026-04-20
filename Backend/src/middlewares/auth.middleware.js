import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import user from "../models/user.model.js";
import userMOdel from "../models/user.model.js";



export const authenticateSeller = async (req, res, next) => {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = cookieToken || bearerToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userMOdel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
        next();

    }catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized" });
    }
}