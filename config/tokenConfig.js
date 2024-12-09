const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');

dotenv.config();


//genrate token

exports.genrateToken = (userId)=>{

    const payload ={
        userId
    }

    return jwt.sign(payload, JWT_KEY =process.env.JWT_KEY,{ expiresIn: '15d' })
}

// Verify Token

exports.verifyToken = (req, res, next)=>{

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Token with our bearer
    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, JWT_KEY =process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate' });
        }

        // Token is valid
        req.user = { _id: decoded.userId }; // Ensure req.user is an object
        next();
    });
}