import { registerService } from "../services/auth.services";

export const registerController = async (req, res) => {
    try {
      const { email, username, roleId } = req.body;
  
      const result = await registerService(email, username, roleId);
  
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