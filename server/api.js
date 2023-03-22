/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unexpected-multiline */
import { Router } from "express";
import axios from "axios";
import logger from "./utils/logger";
import db from "./db";
import { async } from "rxjs";
//import Password from "antd/es/input/Password";

const router = Router();

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
router.post("/signin", function (req, res) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		// eslint-disable-next-line no-undef
		return res.status(400).send("email and password required");
	}

	db.query("SELECT * FROM users ", [users]).then((res) => {
		// eslint-disable-next-line no-undef
		return res.status(400).send("user not available");
	});
});

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

// github loging backend ends

//redirect link-clockin//

router.get("/joinSession", async function (req, res) {
	const sessionid = parseInt(req.query.id);
	const userId=1;
	const Query = `insert into attendence  (session_id,user_id,clockin_time,notes)  values ('${sessionid}','${userId}',now(),'join');`;
	await db
		.query(Query);

	const data = await db
		.query("SELECT * FROM sessions WHERE id = $1", [sessionid])
		.then((data) => data.rows[0]);
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

export default router;
