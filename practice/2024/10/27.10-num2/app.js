const fs = require("fs");

// שלב 1: קריאת התוכן מתוך input.txt
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }
  console.log("Input content:", data);

  // שלב 2: כתיבת התוכן ל-output.txt
  fs.writeFile("output.txt", data, (err) => {
    if (err) {
      console.error("Error writing to output file:", err);
      return;
    }
    console.log("Content written to output.txt");

    // שלב 3: הוספת הודעת הצלחה בסוף output.txt
    fs.appendFile("output.txt", "\nSuccess!", (err) => {
      if (err) {
        console.error("Error appending to output file:", err);
        return;
      }
      console.log("Success message appended to output.txt");
    });
  });
});
