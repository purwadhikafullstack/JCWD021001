/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE warehouses
    ADD CONSTRAINT fk_warehouse_user
    FOREIGN KEY (userId)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `)
  
    await queryInterface.sequelize.query(`
    ALTER TABLE warehouses
    ADD CONSTRAINT fk_warehouse_city
    FOREIGN KEY (cityId)
    REFERENCES cities(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
  `);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    ALTER TABLE warehouses
    DROP CONSTRAINT IF EXISTS fk_warehouse_user;

    ALTER TABLE warehouses
    DROP CONSTRAINT IF EXISTS fk_warehouse_city;
  `);
}
