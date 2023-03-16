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
					req.session.user = data.data.login; // github username
					req.session.githubid = data.data.id; // user id
					req.session.avatar = data.data.avatar_url; // avatar
					req.session.cohortId = 4; // NW5
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

// Endpoint for getting User details including name, cohort and github avatar url
router.get("/users/:id", async (req, res) => {
	const userId = req.params.id;
	const query = "SELECT * FROM users WHERE id = $1";
	try {
		const result = await db.query(query, [userId]);
		if (result.rows.length === 0) {
			res.status(404).json({ message: "User not found" });
		} else {
			const user = result.rows[0];
			const avatarUrl = req.session.avatar ? req.session.avatar : null; // retrieve avatar from session or set it to null
			res.json({
				id: user.id,
				name: user.name,
				region: user.region,
				role: user.role,
				avatarUrl: avatarUrl,
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/user/me", (req, res) => {
	const user = req.session.user ? req.session.user : null;
	const avatarUrl = req.session.avatar ? req.session.avatar : null;
	const userId = req.session.githubid ? req.session.githubid : null;
	res.json({
		user: user,
		avatarUrl: avatarUrl,
		userId: userId,
	});
});

// Endpoint for switching cohorts for signed-in user
router.put("/switchCohort/:id", async (req, res) => {
	const cohortId = +req.params.id;
	const query = "SELECT * FROM cohorts WHERE id = $1";
	// Check request body
	if (!req.body || !req.body.cohortId) {
		return res
			.status(400)
			.json({ message: "Missing cohortId property in request body" });
	}
	// Check if the cohort with the specified ID exists in the database
	const result = await db.query(query, [cohortId]);
	if (result.rows.length === 0) {
		res.status(404).json({ message: "Cohort not found" });
	} else {
		const cohort = result.rows[0];
		req.session.cohortId = req.body.cohortId;
		res.json({
			id: cohort.id,
			name: cohort.name,
			region: cohort.region,
			message: "Switched to cohort with ID " + req.session.cohortId,
		});
	}
});

export default router;
