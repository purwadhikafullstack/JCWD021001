import User from '../models/user.model';
import ResetToken from '../models/resetToken.model';
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
export const findUserAuthQuery = async ({ email = null, username = null }) => {
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

  export const findEmailQuery = async ({ email = null }) => {
    try {
      const res = await User.findOne({
        where: {
          email, 
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

  // CHECK WHETHER OR NOT USER HAS BEEN VERIFIED
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

 export const keepLoginQuery = async (id) => {
  try {
    const res = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

// REQUEST PASSWORD RESET
export const forgotPasswordQuery = async (email, token) => {
  try {
    const user = await User.findOne({
      where: { email: email }
    });

    if (user) {
      const userId = user.id;
      await ResetToken.create({ 
          token: token,
          userId: userId,
          isUsed: false},
          {where: 
            {userId: userId}
          }
      );
    } else {
      console.log('User not found');
    }
      
  } catch (err) {
      throw err;
  }
};

export const resetPasswordQuery = async (email, password, token) => {
  try{

    await User.update(
      {password},
      {where: 
        {email: email}
      }
    );

    const user = await User.findOne({
      where: 
      { email: email }
      }
    );

    if (user) {
      const userId = user.id;  
      await ResetToken.update(
        { token,
          isUsed: true},
        {where: 
          {userId: userId}}
      );
    } else {
      console.log('User not found');
    };

  } catch (err){
    throw err;
  }
};

export const checkTokenUsageQuery = async (token) => {
  try{
    const res = await ResetToken.findOne({
      where: { 
        token: token,
        isUsed: true 
      }
    })

    return res
  } catch (err){
    throw err
  }
}

export const registerGoogleQuery = async (email, username) => {
  const t = await User.sequelize.transaction();
  try {

    const res = await User.create(
      {
        email,
        username,
        roleId: 3,
        isVerified: true
      },
      { transaction: t }
    );
    await t.commit();
    return res;
  } catch (err) {
    await t.rollback();
    throw err;
  }
}