import { registerQuery, findUserQuery, emailVerificationQuery, verifiedUserQuery, keepLoginQuery, forgotPasswordQuery, resetPasswordQuery, checkTokenUsageQuery } from "../queries/auth.queries";
import bcrypt from "bcrypt"
import jwt, {Secret} from "jsonwebtoken";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "../../utils/transporter";

//POST USER REGISTRATION
export const registerService = async (email, username) => {
    try {

      // CHECK WHETHER OR NOT EMAIL AND USERNAME EXIST
      const check = await findUserQuery({ email, username });
      if (check) throw new Error("Email or username already exist");
      
      const res = await registerQuery(email, username);

      // GENERATE TOKEN FOR NEW USER TO VERIFY THEIR EMAILS
      const secretKey= process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not set in the environment");
        }

      const tokenVerification = jwt.sign({email}, secretKey, {
        expiresIn: "1hr"
      });
      
      // TEMPLATE EMAIL
      const temp = await fs.readFileSync(
        path.join(__dirname, "../template", "email-verification.html"),
        "utf-8"
      );
      
      // SEND EMAIL FOR EMAIL VERIFICATION
      const emailVerificationLink = `${process.env.FE_BASE_URL}/auth/email-verification?token=${tokenVerification}`
        const tempCompile = await handlebars.compile(temp);
        const tempResult = tempCompile({ email: email, link: emailVerificationLink });
        const gmailUser = process.env.GMAIL_USER;
        if (typeof gmailUser !== 'string') {
            throw new Error("GMAIL_USER is not set in the environment");
        }

        if (typeof email !== 'string') {
            throw new Error("Recipient email is invalid");
        }

        await transporter.sendMail({
            from: gmailUser,
            to: email,
            subject: "Email Confirmation",
            html: tempResult,
          });
          
      return res;
    } catch (err) {
      throw err;
    }
  };

  export const emailVerificationService = async(token, password) => {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) throw new Error("JWT_SECRET_KEY is not set");
  
      const decoded = jwt.verify(token, secretKey);
      if (!decoded?.email) throw new Error("Invalid token");
  
      const isAlreadyVerified = await verifiedUserQuery(decoded.email);
      if (isAlreadyVerified) throw new Error("User has already been verified");
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      await emailVerificationQuery(decoded.email, hashPassword);
  
      return { message: "Email is now verified and password is set succesfully." };
    } catch (err) {
      throw err;
    }
};

export const loginService = async (email, password) => {
  try {
    const check = await findUserQuery({ email });
    if (!check) throw new Error("Email doesn't exist");

    const isValid = await bcrypt.compare(password, check.password);
    if (!isValid) throw new Error("Password is incorrect");

    let payload = {
      id: check.id,
      email: check.email,
      username: check.username,
      roleId: check.roleId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    return { user: check, token };
  } catch (err) {
    throw err;
  }
};

export const keepLoginService = async (id) => {
  try {
    const res = await keepLoginQuery(id);

    if (!res) throw new Error("User doesnt exist");

    return res;
  } catch (err) {
    throw err;
  }
};

export const forgotPasswordService = async (email) => {
  try {

    // GENERATE TOKEN TO SET PASSWORD BASED ON THE TOKEN
    const secretKey= process.env.JWT_SECRET_KEY;
      if (!secretKey) {
          throw new Error("JWT_SECRET_KEY is not set in the environment");
      }
    const resetToken = jwt.sign({email}, secretKey, {
      expiresIn: "1hr"
    });
    
    await forgotPasswordQuery (email, resetToken)
    
    // TEMPLATE EMAIL
    const temp = await fs.readFileSync(
      path.join(__dirname, "../template", "reset-password.html"),
      "utf-8"
    );
    
    // SEND EMAIL FOR PASSWORD RESET
    const resetPasswordLink = `${process.env.FE_BASE_URL}/auth/reset-password?token=${resetToken}`
      const tempCompile = await handlebars.compile(temp);
      const tempResult = tempCompile({ email: email, link: resetPasswordLink });
      const gmailUser = process.env.GMAIL_USER;
      if (typeof gmailUser !== 'string') {
          throw new Error("GMAIL_USER is not set in the environment");
      }

      if (typeof email !== 'string') {
          throw new Error("Recipient email is invalid");
      }

      await transporter.sendMail({
          from: gmailUser,
          to: email,
          subject: "Reset Password",
          html: tempResult,
        });
    
    
  } catch (err) {
    throw err;
  }
};

export const resetPasswordService = async (token, password) => {
  try{
    const secretKey = process.env.JWT_SECRET_KEY
    const decoded = jwt.verify(token, secretKey);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await resetPasswordQuery (decoded.email, hashPassword, token);
    
  } catch (err){
    throw err
  }
}
