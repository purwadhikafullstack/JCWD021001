/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE users
    ADD CONSTRAINT fk_user_role
    FOREIGN KEY (roleId)
    REFERENCES roles(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS fk_user_role;

    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS fk_user_warehouse;

    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS fk_user_userAddress;
  `);
}
