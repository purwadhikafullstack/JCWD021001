/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE cities
    ADD CONSTRAINT fk_city_province
    FOREIGN KEY (provinceId)
    REFERENCES provinces(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE cities
    DROP CONSTRAINT IF EXISTS fk_city_province;
  `);
}
