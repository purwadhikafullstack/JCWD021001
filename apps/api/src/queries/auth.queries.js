import User from '../models/user.model';
import { Op } from 'sequelize';

//POST USER REGISTRATION
export const registerQuery = async (email, username) => {
  const t = await User.sequelize.transaction();
  try {

    const res = await User.create(
      {
        email,
        username,
        roleId: 3,
        isVerified: false
      },
      { transaction: t }
    );
    await t.commit();
    return res;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

// FIND USER
export const findUserQuery = async ({ email = null, username = null }) => {
    try {
      const res = await User.findOne({
        where: {
          [Op.or]: {
            email,
            username,
          },
        },
      });
  
      return res;
    } catch (err) {
      throw err;
    }
  };

  export const emailVerificationQuery = async (email, password) => {
    try{
        await User.update(
          {isVerified: true,
          password},
          {where: 
            {email: email}}
        )
    } catch(err){
        throw err;
    }
  };

  export const verifiedUserQuery = async (email) => {
    try {
      return await User.findOne({
        where: {
          email: email,
          isVerified: true,
        },
      });
    } catch (err) {
      throw err;
    }
  };