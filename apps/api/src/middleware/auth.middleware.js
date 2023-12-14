const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(500).send("Access denied");

    token = token.split(" ")[1];

    if (token === "null" || !token)
      return res.status(500).send("Unauthorized Token");

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifiedUser) return res.status(500).send("Unauthorized token");

    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(500).send("Invalid Token");
  }
};


// export const emailVerificationMiddleware = (req, res, next) => {
//     try{

//         req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         (console.log("middleware di sini"))
//         const nonVerifiedUser = req.user?.isVerified === true
//         (console.log("ini middleware", nonVerifiedUser))
//         if (nonVerifiedUser){ 
//             next()
//         } else {
//             return res.status(500).send("User has been verified")
//         }
//     } catch (err){
//         return res.status(500).send("Invalid")
//     }
// }