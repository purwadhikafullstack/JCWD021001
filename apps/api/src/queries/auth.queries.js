import User from '../models/user.model';
import { Op } from 'sequelize';

export const registerQuery = async (email, username, roleId) => {
  const t = await User.sequelize.transaction();
  try {

    const res = await User.create(
      {
        email,
        username,
        roleId,
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