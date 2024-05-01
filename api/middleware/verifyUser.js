import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// 1. Create a middleware function called verifyUser
export const verifyToken = (req, res, next) => {
    // 2. Get token from cookies
  const token = req.cookies.access_token;
    // 3. If token does not exist, return error
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // 4. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // 5. If token is invalid, return error
    if (err) return next(errorHandler(403, 'Forbidden'));
    //6. If token is valid, set user in req object and call next middleware
    req.user = user;
    // 7. Call next function in this case is the updateUser function from user.route.js
    next();
  });
};