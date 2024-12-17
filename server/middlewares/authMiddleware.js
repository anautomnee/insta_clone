import jwt from 'jsonwebtoken';

const ifAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization.split(' ')[1];
    console.log(authHeader);
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_KEY, (err, user) => {
            if(err) {
                return res.status(403).send('Forbidden: invalid or expired token');
            }
            req.user = user;
            console.log(user);
            next();
        })
    }
};

export default ifAuthenticated;