// export const BASE_URL = "http://localhost:3000";


// production
// export const BASE_URL = "/api";


// export const BASE_URL =
//     location.hostname === "localhost" ? "http://localhost:3000" : "/api";


export const BASE_URL =
    location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://devtinder-production-37f5.up.railway.app";
        