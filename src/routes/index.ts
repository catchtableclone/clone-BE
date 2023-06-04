import { Router } from "express";

import { restaurantRoutes } from "./restaurantRoutes";

export const indexRoutes: Router = Router();


indexRoutes.use("/restaurants", restaurantRoutes);
