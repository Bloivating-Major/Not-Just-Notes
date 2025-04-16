import {Router} from "express"
import { validateUser } from "../middlewares/validateUser";
import { userSchema, loginSchema } from "../models/user.schema";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/" ,  (req, res ) => {
    res.status(200).json({ message: "User Route" });
});

// @ts-ignore
router.post("/signup", validateUser(userSchema), userController.createUserController);

// @ts-ignore
router.post("/signin", validateUser(loginSchema), userController.loginUserController);


export default router;