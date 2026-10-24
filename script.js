
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const filterCategory = document.getElementById("filterCategory");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function displayExpenses() {
    expenseList.replaceChildren();

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(expense =>
        selectedCategory === "All" ||
        expense.category === selectedCategory
    );

    let total = 0;

    filteredExpenses.forEach(expense => {
        total += expense.amount;

        const card = document.createElement("div");
        card.className = "expense-card";

        const name = document.createElement("p");
        name.textContent = "Name: " + expense.name;

        const amount = document.createElement("p");
        amount.textContent = "Amount: ₹" + expense.amount.toFixed(2);

        const category = document.createElement("p");
        category.textContent = "Category: " + expense.category;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            expenses = expenses.filter(item => item.id !== expense.id);
            saveExpenses();
            displayExpenses();
        });

        card.append(name, amount, category, deleteButton);
        expenseList.appendChild(card);
    });

    totalAmount.textContent = total.toFixed(2);
}


expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !category) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        id: crypto.randomUUID(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    saveExpenses();
    displayExpenses();

    expenseForm.reset();
});
filterCategory.addEventListener("change", displayExpenses);
displayExpenses();
