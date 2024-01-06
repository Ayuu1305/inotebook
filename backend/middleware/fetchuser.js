const jwt = require("jsonwebtoken");
const JWT_SECRET = "ayushsadhvani";

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: "Token not present. Please authenticate with a valid token." });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token. Please authenticate with a valid token." });
    }
}

module.exports = fetchuser;
