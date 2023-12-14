import { registerQuery, findUserQuery, emailVerificationQuery, verifiedUserQuery } from "../queries/auth.queries";
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
          
      const res = await registerQuery(email, username);
      
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
      if (isAlreadyVerified) throw new Error("Uwes");
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      await emailVerificationQuery(decoded.email, hashPassword);
  
      return { message: "Email is now verified and password is set succesfully." };
    } catch (err) {
      throw err;
    }
};