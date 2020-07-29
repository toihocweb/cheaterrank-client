export const apiUrl =
  process.env.REACT_APP_ENV === "prod"
    ? "https://toihocweb.net"
    : "http://localhost:5000";
