import { Router } from 'express';

export interface RouteElement {
  basePath: string;
  router: Router;
}