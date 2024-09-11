import User from "../model/user-schema.js";
import jwt from 'jsonwebtoken';
const EMAIL_SECRET = 'EmailSecretKey';

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(token)
        const decoded = jwt.verify(token, EMAIL_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            console.log(user.isVerified);
            return res.status(400).json({ message: "User already verified." });
        
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "Email verified successfully! Your account is now active." });
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
