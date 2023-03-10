require("dotenv").config();
const { query } = require("express");
const { Pool } = require("pg");

const config = {
	dbUrl: createDatabaseUrl(),
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV === "production",
};

function createDatabaseUrl() {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	const host = process.env.DB_HOST ?? "localhost";
	const name = process.env.DB_NAME ?? "cyf";
	const password = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "";
	const port = process.env.DB_PORT ?? "5432";
	const username = process.env.DB_USER ?? process.env.DB_USERNAME ?? "";
	const userinfo = `${username}:${password}`;
	return `postgres://${
		userinfo !== ":" ? `${userinfo}@` : ""
	}${host}:${port}/${name}`;
}

const db = new Pool({
	connectionString: config.dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: config.dbUrl.includes("localhost")
		? false
		: { rejectUnauthorized: false },
});

const users = [
	{ name: "John", region: "North West", role: "Trainee" },
	{ name: "Denise", region: "London", role: "Volunteer" },
	{ name: "Josh", region: "West Midlands", role: "Manager" },
	{ name: "Kyle", region: "Scotland", role: "Trainee" },
	{ name: "Stephen", region: "Cape Town", role: "Volunteer" },
];

const sessions = [
	{
		name: "JavaScript-1 Week-1",
		time: "2023-03-11 10:00:00",
		cohort_name: "NW-2",
		meeting_url: "https://www.youtube.com/watch?v=tAGnKpE4NCI",
	},
	{
		name: "JavaScript-1 Week-2",
		time: "2023-03-12 14:00:00",
		cohort_name: "NW-3",
		meeting_url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
	},
	{
		name: "JavaScript-1 Week-3",
		time: "2023-03-13 09:00:00",
		cohort_name: "NW-4",
		meeting_url: "https://www.youtube.com/watch?v=nYh-n7EOtMA",
	},
	{
		name: "JavaScript-2 Week-1",
		time: "2023-03-14 11:00:00",
		cohort_name: "NW-5",
		meeting_url: "https://www.youtube.com/watch?v=GzU8KqOY8YA",
	},
	{
		name: "JavaScript-3 Week-3",
		time: "2023-03-15 13:00:00",
		cohort_name: "NW-2",
		meeting_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
	},
];

const cohorts = [
	{ name: "NW-2", region: "North West" },
	{ name: "NW-3", region: "North West" },
	{ name: "NW-4", region: "North West" },
	{ name: "NW-5", region: "North West" },
	{ name: "WM-1", region: "West Midlands" },
];

const attendence = [
	{
		user_name: "John",
		session_name: "JavaScript-1 Week-1",
		clockin_time: "2023-03-15 10:00:52",
		notes: "Student arrived on time",
	},
	{
		user_name: "Denise",
		session_name: "JavaScript-1 Week-1",
		clockin_time: "2023-03-15 10:00:52",
		notes: "Student arrived on time",
	},
	{
		user_name: "Josh",
		session_name: "JavaScript-1 Week-1",
		clockin_time: "2023-03-15 10:00:52",
		notes: "Student arrived on time",
	},
	{
		user_name: "Kyle",
		session_name: "JavaScript-1 Week-1",
		clockin_time: "2023-03-15 10:16:52",
		notes: "Student arrived late due to traffic",
	},
	{
		user_name: "Stephen",
		session_name: "JavaScript-1 Week-1",
		clockin_time: "2023-03-15 10:28:26",
		notes: "Student arrived late due to train strike",
	},
];

db.connect((err) => {
	if (err) {
		console.error("connection error", err.stack);
	} else {
		console.log("connected");
	}
});

const allQueries = [];

const clearTables = (tableName) => {
	const query = {
		text: `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`,
	};
	allQueries.push(query);
};

clearTables("users");
clearTables("sessions");
clearTables("cohorts");
clearTables("attendence");

const runQuery = async (queries) => {
	for (let i = 0; i < queries.length; i++) {
		console.log(queries[i]);
		await db.query(queries[i]);
	}
};

users.forEach((user) => {
	const query = {
		text: "INSERT INTO users(name, region, role) VALUES($1, $2, $3)",
		values: [user.name, user.region, user.role],
	};
	allQueries.push(query);
});

sessions.forEach((session) => {
	const { name, time, cohort_name, meeting_url } = session;
	const query = {
		text: "INSERT INTO sessions(name, time, cohort_id, meeting_url) VALUES($1, $2, (SELECT id FROM cohorts WHERE name = $3), $4)",
		values: [name, time, cohort_name, meeting_url],
	};
	allQueries.push(query);
});

cohorts.forEach((cohort) => {
	const { name, region } = cohort;
	const query = {
		text: "INSERT INTO cohorts(name, region) VALUES($1, $2)",
		values: [name, region],
	};
	allQueries.push(query);
});

attendence.forEach((attendanceRecord) => {
	const { user_name, session_name, clockin_time, notes } = attendanceRecord;
	const query = {
		text: "INSERT INTO attendence(user_id, session_id, clockin_time,  notes) VALUES((SELECT id FROM users WHERE name = $1), (SELECT id FROM sessions WHERE name = $2), $3, $4)",
		values: [user_name, session_name, clockin_time, notes],
	};
	allQueries.push(query);
});

runQuery(allQueries);
