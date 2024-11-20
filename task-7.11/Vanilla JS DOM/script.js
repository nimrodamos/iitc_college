function showAlert() {
  alert("Button clicked!");
}

const button = document.getElementById("trigger-button");
button.addEventListener("click", showAlert);

function updateMessage() {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = "Hello, welcome to the exam project!";
}

updateMessage();

const userList = ["Alice", "Bob", "Charlie"];

const ulElement = document.createElement("ul");
ulElement.classList.add("user-list");

for (let i = 0; i < userList.length; i++) {
  const liElement = document.createElement("li");
  ulElement.appendChild(liElement);
}

document.body.appendChild(ulElement);

const items = document.querySelectorAll("li");

for (let i = 0; i < items.length; i++) {
  items[i].textContent = `Item ${i + 1}`;
}

document
  .getElementById("simple-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = document.getElementById("name").value;

    if (nameInput === "") {
      alert("Name is required.");
    } else {
      alert(`Hello, ${nameInput}!`);
    }
  });

const settings = {
  theme: "dark",
  ס: "en",
};

console.log(settings.color);

const words = ["apple", "banana", "cherry"];

function findLongest(words) {
  let longestWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }

  return longestWord;
}

const numbers = [1, 2, 3, 4, 5, 6];

function filterEvenNumbers(numbers) {
  return numbers.filter(function (number) {
    return number % 2 === 0;
  });
}

console.log(filterEvenNumbers(numbers));
