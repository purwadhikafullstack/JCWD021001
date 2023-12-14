import { registerService, emailVerificationService } from "../services/auth.services";

//POST USER REGISTRATION
export const registerController = async (req, res) => {
    try {
      const { email, username } = req.body;
  
      const result = await registerService(email, username);
  
      return res.status(200).json({
        message: "Success",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  };

export const emailVerificationController = async (req, res) => {
  try{
        const token = req.query.token;
        if (typeof token !== "string") {
          return res.status(400).json({
            message: "Invalid token format",
          });
        }
        const { password} = req.body;
        const result = await emailVerificationService(token, password);
        return res.status(200).json({
            message: "Success",
            data: result,
          });
  } catch(err){
    console.log(err);
      return res.status(500).json({
        message: err.message,
      });
  }
}