// controller.js

import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  renderEmployees,
  getEmployeesFromLocalStorage,
  initializeEmployees,
  setupEventListeners,
  filterEmployeesByDepartment,
} from "./employee.service.js";

initializeEmployees();

// Function to handle form submission
document.getElementById("addEmployeeForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page refresh
  const newEmployee = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    age: parseInt(document.getElementById("age").value),
    startDate: document.getElementById("startDate").value,
    department: document.getElementById("department").value,
    salary: parseFloat(document.getElementById("salary").value),
  };
  addEmployee(newEmployee);
  renderEmployees(); // Display updated employees
  e.target.reset(); // Reset the form
});

// Event listener for department filter
document.getElementById("departmentFilter").addEventListener("change", (e) => {
  const selectedDepartment = e.target.value;
  filterEmployeesByDepartment(selectedDepartment);
});

// Display employees when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderEmployees();
});
