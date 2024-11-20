export default function authUser(req, res, next) {
  console.log(req.query.apiKey);

  if (!req.query.apiKey) {
    return res.status(401).send("No API Key provided"); // הוסף return כדי למנוע המשך הרצת הקוד
  }

  if (req.query.apiKey === "123456789") {
    return next(); // המשך לפונקציה הבאה אם המפתח נכון
  }

  // מפתח API שגוי
  return res.status(401).send("Wrong API KEY");
}
