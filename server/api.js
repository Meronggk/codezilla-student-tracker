import { Router } from "express";
import axios from "axios";
import logger from "./utils/logger";

import db from "./db";

const router = Router();

const CLIENT_ID = "438f9e1d00fa92021341";
const CLIENT_SECRET = "8e75503a0524b30ab1f08e5ac547ef8202df0236";

router.get("/", async function (req, res) {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/callback", async (req, res) => {
	const params =
		"?client_id=" +
		CLIENT_ID +
		"&client_secret=" +
		CLIENT_SECRET +
		"&code=" +
		req.body.log;
	axios
		.post(`https://github.com/login/oauth/access_token${params}`, undefined, {
			headers: { Accept: "application/json" },
		})
		.then((response) => {
			const token = response.data.access_token;
			axios
				.get("https://api.github.com/user", {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((data) => {
					req.session.user = data.data.login;
					req.session.githubid = data.data.id;

					res.json(data.data);
				});
			// eslint-disable-next-line no-console
			console.log(response.data);
		});
});

router.get("/getUserData", async function (req, res) {
	req.get("Authorization");
	await fetch("https://api.github.com/user", {
		method: "GET",
		headers: {
			Authorization: req.get("Authorization"),
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			// eslint-disable-next-line no-console
			console.log(data);
			res.json(data);
		});
});


// allsessions inculidng toggle button//
function fetchallsessions(callback) {
	db.query("SELECT * FROM sessions", (err, data) => {
		if (err) {
			return callback(err);
		}

		return callback(undefined, data.rows);
	});
}

router.get("/getAllSession", (req, res, next) => {
	fetchallsessions((err, data) => {
		if (err) {
			return next(err);
		}

		res.status(200).send(data);
	});
});

//find session//
router.get("/getSessionData", (req, response, next) => {
	// const id = parseInt(req.params.id);
	const { id } = req.body;
	db.query(`select * from SESSIONS where id = ${id}`, (err, res) => {
		if (err) {
			return next(err);
		} else {
			response.json(res.rows);
		}
	});
});

//upcomingsession//
function fetchupcomingsessions(callback) {
	let currentdate = new Date();
	let datetime =
		currentdate.getFullYear() +
		"-" +
		currentdate.getMonth() +
		"-" +
		currentdate.getDay();

	db.query(
		`select * from SESSIONS where time >= '${datetime}'`,
		(err, data) => {
			if (err) {
				return callback(err);
			}

			return callback(undefined, data.rows);
		}
	);
}
router.get("/getUpcomingSession", (req, res) => {
	fetchupcomingsessions((err, data) => {
		if (err) {
			// return next(err);
			res.status(500).send("error");
		}

		res.status(200).send(data);
	});
});

router.get("/getZoomMeeting/:id", function (req, res) {
	const sessionid = parseInt(req.params.id);
	let userid;
	let data = {};
	db.query(
		"SELECT * FROM sessions WHERE id = $1",
		[sessionid],
		(error, result) => {
			if (error) {
				throw error;
			}
			data.link = result[0].meeting_url;
			data.name = result[0].name;
			data.time = result[0].time;
			userid = result[0].userid;
		}
	);

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

router.get("/fakelogin", (req, res) => {
	req.session.userId = 12;
	req.session.username = "gghfgf";
	req.session.count = 0;
	res.json({ message: "Login Successful!" });
});

// Endpoint for debugging the session
router.get("/debugsession", (req, res) => {
	req.session.count += 1;
	res.json({ session: req.session });
});

// Endpoint for logging out
router.post("/logout", (req, res) => {
	req.session = null;
	res.clearCookie("session");
	res.sendStatus(204); // No Content
});

export default router;
