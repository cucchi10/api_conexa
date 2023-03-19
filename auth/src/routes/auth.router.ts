import { Router } from 'express';
import { controllers } from '../controllers';

import { RouteElement } from "../interfaces/route.interface";

const route: RouteElement = {
  basePath: "/auth",
  router: Router(),
};


route.router.post('/register', [], controllers.authController.register)
route.router.post('/login', [], controllers.authController.login)

export default route