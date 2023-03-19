import { readdirSync } from "fs";
import path from "path";


const basename = path.basename(__filename);

const middlewares: Record<string, any> = {};

readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-13) === 'middleware.ts',
  )
  .forEach((file) => {
    const middlewareGroup = require(path.join(__dirname, file));
    Object.entries(middlewareGroup).forEach(([key, value]) => {
      middlewares[key] = value;
    })
  });


export { middlewares }