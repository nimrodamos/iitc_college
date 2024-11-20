// import fs from "fs"

// export default function logRequest (req, res, next) {
//     const log = `Request Recived at ${new Date().toISOString()} \n`
//     fs.appendFile("logs.txt", log, (err) => {
//         if (err) throw err
//         console.log("Log Saved");
//     })

//     next()
// }

import fs from "fs/promises"; // שימוש בגרסת promises של fs

export default async function logRequest(req, res, next) {
  const log = `Request received at ${new Date().toISOString()} \n`;

  try {
    await fs.appendFile("logs.txt", log);
    console.log("Log saved");
  } catch (err) {
    console.error("Error writing to log file:", err);
    next(err); // העברת השגיאה לטיפול בשגיאות
  }

  next();
}
