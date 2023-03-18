/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unexpected-multiline */
import { Router } from "express";
import axios from "axios";
import logger from "./utils/logger";
import db from "./db";
//import Password from "antd/es/input/Password";

const router = Router();
// const users = [];
const CLIENT_ID = "438f9e1d00fa92021341";
const CLIENT_SECRET = "8e75503a0524b30ab1f08e5ac547ef8202df0236";

//form backend begins
let users = [];
router.get("/form/:id", (req, res) => {
	db.query("Select * from users").then((result) => {
		res.json(result.rows);
	});
});
router.post("/form", (req, res) => {
	const newUser = req.body;
	users.push(newUser);
	res.json(users);
});
//form back end ends

// login backend begins
// router.post("/signin", function (req, res) {
// 	const email = req.body.email;
// 	const password = req.body.password;

// 	if (!email || !password) {
// 		// eslint-disable-next-line no-undef
// 		return res.status(400).send("email and password required");
// 	}

// 	db.query("SELECT * FROM users ").then((res) => {
// 		// eslint-disable-next-line no-undef
// 		return res.status(400).send("user not available");
// 	});
// });

// login backend ends

router.get("/", async function (req, res) {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

// github login backend starts

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
					req.session.userName = data.data.login; // github username
					req.session.githubid = data.data.id; // user id
					req.session.avatar = data.data.avatar_url; // avatar
					req.session.githubUrl = data.data.html_url; // githubUrl
					req.session.cohortId = 4; // NW5
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

// github loging backend ends

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
router.post("/newsession", (req, res) => {
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
	const userName = req.session.userName ? req.session.userName : null;
	const avatarUrl = req.session.avatar ? req.session.avatar : null;
	const userGithubId = req.session.githubid ? req.session.githubid : null;
	const userGithubUrl = req.session.githubUrl ? req.session.githubUrl : null;
	res.json({
		userName: userName,
		avatarUrl: avatarUrl,
		userGithubId: userGithubId,
		userGithubUrl: userGithubUrl,
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
