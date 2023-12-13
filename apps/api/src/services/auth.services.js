import { registerQuery, findUserQuery } from "../queries/auth.queries";

export const registerService = async (email, username, roleId) => {
    try {
      const check = await findUserQuery({ email, username });
      
      if (check) throw new Error("Email or username already exist");
      
      const res = await registerQuery(email, username, roleId);
  
      return res;
    } catch (err) {
      throw err;
    }
  };