/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE resetTokens
    ADD CONSTRAINT fk_resetToken_user
    FOREIGN KEY (userId)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE resetTokens
    DROP CONSTRAINT IF EXISTS fk_resetToken_user;
  `);
}
