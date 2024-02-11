import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';
import config from './db.config';
import { NODE_ENV } from './config';

export class DB {
  static sequelize;
  static db = {};

  static async initialize() {
    const basename = _basename(__filename);

    if (!this.sequelize) {
      this.sequelize = new Sequelize(
        config[NODE_ENV].database,
        config[NODE_ENV].username,
        config[NODE_ENV].password,
        config[NODE_ENV],
      );
    }

    const modelsFolder = `${__dirname}/models`;
    let promises = [];

    readdirSync(modelsFolder)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
        );
      })
      .forEach((file) => {
        promises.push(
          (async () => {
            const model = await import(join(modelsFolder, file));

            model.init(this.sequelize);
            this.db[model.default.name] = model.default;
          })(),
        );
      });

    await Promise.all(promises);

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = this.sequelize;
    this.db.Sequelize = Sequelize;
  }
}
