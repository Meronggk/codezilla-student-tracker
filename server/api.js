import { Router } from "express";

import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.get("/fakelogin", (req, res) => {
	req.session.userId = 12;
	req.session.username = "gghfgf";
	req.session.count = 0;
	res.json({ message: "Login Successful!" });
});
router.get("/debugsession", (req, res) => {
	req.session.count += 1;
	res.json({ session: req.session });
});
export default router;
