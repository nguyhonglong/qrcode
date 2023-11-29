import express from 'express';
import { User } from '../models/userModel.js';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        // Find user based on phone number
        const user = await User.findOne({ phoneNumber });
        // Check if user exists and if the password matches
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Số điện thoại hoặc mật khẩu không chính xác.' });
        }

        // User logged in successfully
        return res.status(200).json({ message: 'Đăng nhập thành công.' });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
    }
});

export { authRouter };