import { Router } from "express";
import axios from "axios";
import logger from "./utils/logger";
// import { object } from "prop-types";

const router = Router();

const CLIENT_ID = "438f9e1d00fa92021341";
const CLIENT_SECRET = "8e75503a0524b30ab1f08e5ac547ef8202df0236";

// const { Pool } = require("pg");
// const pool = new Pool({
// 	connectionString: process.env.DATABASE_URL,
// 	sslmode: require,
// 	ssl: {
//  rejectUnauthorized: false,
// 	},
//   });

// router.post("/callback", async function (req, res) {
// const token = req.body.log;
// });

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

// login

// router.post("/login", function (req, res) {

// 	const email = req.body.email;
// 	const password = req.body.password;

// 	if (!req.body.email || !req.body.password) {
//  return res.status(404).send("email and password required");
// 	}

// 	pool
//   .query(
// 		"SELECT users.class_id,users.id, users.email, users.name, user_type.type FROM users INNER JOIN user_type ON users.user_type = user_type.id WHERE email = $1 AND password = $2 ",
// 		[email, password]
//  )
//  .then((result) => {
// 		if (result.rows.length > 0) {
//  return res.json(result.rows[0]);
// 		} else {
//  return res.status(404).send("user not available");
// 		}
// 	});
//   });

export default router;
