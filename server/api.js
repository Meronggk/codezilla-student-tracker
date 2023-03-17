import { Router } from "express";
import axios from "axios";
import logger from "./utils/logger";

import db from "./db";

const router = Router();
// const users = [];
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
				})
				.catch((error) => {
					res.status(500).json({ error: error.message });
				});
			// eslint-disable-next-line no-console
			console.log(response.data);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
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

// GET endpoint to retrieve cohorts
router.get("/cohorts", (req, res) => {
	// SQL query to fetch cohorts from cohorts table
	const query = "SELECT * FROM cohorts";

	// Execute the SQL query
	db.query(query, (err, results) => {
		if (err) {
			throw err;
		}

		// Return the results in JSON format
		res.json(results.rows);
	});
});

// POST request to create a new session
router.post("/sessions", (req, res) => {
	const { name, time, meetingUrl, cohortId } = req.body;
	if (!name || !time || !meetingUrl || !cohortId) {
		res.status(400).send("Missing required fields");
		return;
	}

	const sql =
		"INSERT INTO sessions (name, time, cohort_id, meeting_url) VALUES ($1, $2, $3, $4)";
	const values = [name, time, cohortId, meetingUrl];

	db.query(sql, values, (error) => {
		if (error) {
			res.status(500).send("Error creating session");
		} else {
			res.status(201).send("Session created");
		}
	});
});

router.post("/registerUsers", (req, res) => {
	const { name, role, region } = req.body;
	if (!name || !role || !region) {
	  res.status(400).send("Missing required fields");
	  return;
	}
	const user = { name, role, region };
	const sql = "INSERT INTO users (name, role, region) VALUES ($1, $2, $3)";
	const values = [name, role, region];

	db.query(sql, values, (error) => {
	  if (error) {
		res.status(500).send("Error creating user");
	  } else {
		res.status(201).send(user);
	  }
	});
  });

export default router;
