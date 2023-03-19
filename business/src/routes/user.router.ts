import { Router } from 'express';
import { controllers } from '../controllers';
import { middlewares } from '../middlewares'

import { RouteElement } from "../interfaces/route.interface";

const route: RouteElement = {
  basePath: "/user",
  router: Router(),
};


route.router.get('/', [middlewares.checkOrigin, middlewares.checkJwt], controllers.userController.gets)


export default route