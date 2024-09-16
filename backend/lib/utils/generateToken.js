import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    console.log('NODE_ENV:', process.env.NODE_ENV);
    res.cookie('advanced', token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== 'development'
    })
}