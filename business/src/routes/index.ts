import { readdirSync } from "fs";
import path from "path";
import { RouteElement } from '../interfaces/route.interface';

const basename = path.basename(__filename);

const routes: RouteElement[] = []

readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-9) === 'router.ts',
  )
  .forEach((file) => {
    const routeGroup = require(path.join(__dirname, file)).default;
    routes.push(routeGroup);
  });

export { routes }