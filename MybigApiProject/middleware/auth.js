export default function authUser(req, res, next) {
  const apiKey = req.query.apiKey;
  if (apiKey && apiKey === "123456789") {
    next(); // המשך בבקשה אם ה-API Key תקין
  } else {
    res.status(401).send("Unauthorized: Invalid or missing API Key");
  }
}
