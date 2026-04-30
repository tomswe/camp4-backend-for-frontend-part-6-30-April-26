import { Router } from "express";
import * as controller from "./authController.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

// LOCAL
router.post("/local/signup", controller.signup);
router.post("/local/signin", controller.signin);

// REFRESH
router.post("/refresh-token", controller.refresh);

// ME
router.get("/user/me", authenticate, controller.me);

// UPDATE PROFILE
router.put("/user/me", authenticate, controller.updateMe);

// LOGOUT
router.delete("/remove-session", authenticate, controller.removeSession);

export default router;
