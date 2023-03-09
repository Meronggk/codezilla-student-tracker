import { Router } from "express";

import logger from "./utils/logger";

import db from "./db";


const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.get("/getZoomMeeting/:id", function (req, res) {

	const sessionid = parseInt(req.params.id);
	let userid;
	let data = {};
	db.query("SELECT * FROM sessions WHERE id = $1", [sessionid], (error, result) => {
		if (error) {
			throw error;
		}
		data.link = result[0].meeting_url;
		data.name = result[0].name;
		data.time = result[0].time;
		userid = result[0].userid;

	});

	//insert student req date in attendance//
	const clockintime = new Date();

	db.query(
		"INSERT INTO attendance (user_id, session_id, clockin_time) VALUES ($1, $2, $3) RETURNING *",
		[userid, sessionid, clockintime],
		(error) => {
			if (error) {
				throw error;
			}
		}
	);
	res.json(data);
});

export default router;
