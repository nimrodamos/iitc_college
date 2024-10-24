// פונקציית חץ שמחשבת את הסכום
const calculateSum = () => {
  // שמירת האלמנטים עצמם במקום הערכים שלהם
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");

  // קבלת הערכים מהאינפוטים והמרה למספרים
  const num1 = Number(num1Input.value);
  const num2 = Number(num2Input.value);

  // חישוב הסכום
  const sum = num1 + num2;

  // הצגת התוצאה על המסך
  document.getElementById("result").textContent = sum;
};

// האזנה לכפתור לחשב
document.getElementById("calculateBtn").addEventListener("click", calculateSum);
