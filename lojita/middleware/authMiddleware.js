import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({ msg: "Acesso negado!" });

    const secret = process.env.SECRET;

    jwt.verify(token, secret, (err, decoded) => {
        if(err) return res.status(400).json({ msg: "O token é inválido!" });

        req.userId = decoded.id;
        next();        
    });
}

export const validateCookie = (req, res, next) => {
    const { access_token } = req.cookies;

    if(!access_token) return res.status(401).json({ msg: "Acesso negado!" });

    const secret = process.env.SECRET;

    jwt.verify(access_token, secret, (err, decoded) => {
        if(err) return res.status(400).json({ msg: "O token é inválido!" });

        req.userId = decoded.id;
        next();        
    });
}