/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
// http://localhost:3100/api/getUpcomingSession
const instance = axios.create({
    baseURL: "http://localhost:3100/api",
    headers: {
        "content-type": "application/octet-stream",
    },
});

export default {
    getAllSessionData: () =>
        instance({
            "method": "GET",
            "url": "/getAllSession",
            // "params": {
            //     "search": "parameter",
            // },
        }),
    getUpCommingSessionData: () =>
        instance({
            "method": "GET",
            "url": "/getUpcomingSession",
            // "params": {
            //     "search": "parameter",
            // },
        }),
};