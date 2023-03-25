/* eslint-disable no-console */
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

//let users = [];

// //form backend begins
router.get("/users/trainee", async (req, res) => {
	db.query("SELECT * FROM users WHERE role='Trainee' ")
		.then((data) => {
			res.json(data.rows);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

router.post("/attendence", async (req, res) => {
	// eslint-disable-next-line no-console
	console.log(req.body);
	for (let i = 0; i < req.body.length; i++) {
		const { user_id, session_id, notes } = req.body[i];
		await db.query(
			"INSERT INTO attendence(user_id, session_id, notes) VALUES($1, $2, $3)",
			[user_id, session_id, notes]
		);
	}
	// .then(() => {
	res.status(201).json({ mesg: "done" });
	// });
});

//form back end ends
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
					const query = "SELECT * FROM users WHERE github_user_id = $1";
					db.query(query, [data.data.id], (error, results) => {
						if (error) {
							console.log(error);
							throw error;
						}
						if (results.rows <= 0) {
							res.json({ error: "User not found" });
						} else {
							req.session.userId = results.rows[0].id;
							req.session.userName = data.data.login; // github username
							req.session.githubid = data.data.id; // user id
							req.session.avatar = data.data.avatar_url; // avatar
							req.session.githubUrl = data.data.html_url; // githubUrl
							req.session.cohortId = 4; // NW5
							res.json(data.data);
						}
					});
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
	// let datetime ="'"+
	currentdate.getFullYear() +
		"-" +
		currentdate.getMonth() +
		"-" +
		currentdate.getDay();

	db.query("select * from SESSIONS where time > now()", (err, data) => {
		if (err) {
			return callback(err);
		}

		return callback(undefined, data.rows);
	});
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

router.get("/fakelogin", async (req, res) => {
	req.session.userId = 12;
	req.session.username = "gghfgf";
	req.session.count = 0;
	// Retrieve the user's role from the database or other storage mechanism and set it in the session object
	// For example, assuming the user's role is stored in a database table called "users":
	const user = await user.findById(req.session.userId);
	req.session.role = user.role;
	res.json({ message: "Login Successful!" });
});

router.post("/changerole", (req, res) => {
	const { role } = req.body; // Get the new role from the request body
	req.session.role = role; // Update the user's role in the session
	res.json({ message: "Role updated successfully!" });
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
		"INSERT INTO sessions (name, time, cohort_id, meeting_url) VALUES ($1,$2, $3, $4)";
	const values = [name, time, cohortId, meetingUrl];

	db.query(sql, values, (error) => {
		if (error) {
			res.status(500).send("Error creating session" + error.message);
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

// // Endpoint for switching cohorts for signed-in user

router.get("/user/me", (req, res) => {
	const userName = req.session.userName ? req.session.userName : null;
	const avatarUrl = req.session.avatar ? req.session.avatar : null;
	const userGithubId = req.session.githubid ? req.session.githubid : null;
	const userGithubUrl = req.session.githubUrl ? req.session.githubUrl : null;
	const userId = req.session.userId ? req.session.userId : null;
	res.json({
		userName: userName,
		avatarUrl: avatarUrl,
		userGithubId: userGithubId,
		userGithubUrl: userGithubUrl,
		userId: userId,
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
