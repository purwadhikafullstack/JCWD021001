/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE userAddresses
    ADD CONSTRAINT fk_userAddress_user
    FOREIGN KEY (userId)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);

  await queryInterface.sequelize.query(`
    ALTER TABLE userAddresses
    ADD CONSTRAINT fk_userAddress_city
    FOREIGN KEY (cityId)
    REFERENCES cities(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE userAddresses
    DROP CONSTRAINT IF EXISTS fk_userAddress_user;

    ALTER TABLE userAddresses
    DROP CONSTRAINT IF EXISTS fk_userAddress_city;
  `);
}
