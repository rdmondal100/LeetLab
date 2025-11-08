export const BASEURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api/v1"
    : "https://dsabatte-server.onrender.com/api/v1";
