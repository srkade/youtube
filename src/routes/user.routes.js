import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.mddleware.js"
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import {veryfyJwt} from "../middlewares/aouth.middleware.js"
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(veryfyJwt, logoutUser)

export default router