import { readdirSync } from "fs";
import path from "path";

const basename = path.basename(__filename);
const controllers: Record<string, any> = {};


readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-13) === 'controller.ts',
  )
  .forEach((file) => {
    const controller = require(path.join(__dirname, file));
    Object.entries(controller).forEach(([key, value]) => {
      controllers[key] = value;
    })
  });

export { controllers };
