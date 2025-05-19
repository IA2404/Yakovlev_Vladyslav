import { idGenerator } from "./utils.js";
import {
    addTransaction,
    calculateTotal,
    deleteTransaction,
    getDescription,
    transactions_array
} from "./transactions.js";

/**
 * Handles the form submission to add a new transaction.
 * Prevents default form behavior, creates a new row in the table,
 * updates the transactions array, and resets the form.
 */
document.querySelector("#form").addEventListener("submit", (ev) => {
    ev.preventDefault();

    const currentTable = document.querySelector("#transaction_table");
    const currentForm = document.querySelector("form");

    // Convert form data to an object
    const formData = new FormData(currentForm);
    const dataObj = Object.fromEntries(formData);

    // Generate unique ID and add transaction to array
    const row_id = idGenerator();
    addTransaction(row_id, dataObj.Datetime, dataObj.Amount, dataObj.Category, dataObj.Description);

    // Create a new table row for the transaction
    const row = document.createElement("tr");
    row.id = row_id;

    // Apply styling class based on amount sign
    const color = dataObj.Amount >= 0 ? 1 : 0;
    row.classList.add(color ? "green_row" : "red_row");

    // Create and fill table cells
    const dateCell = document.createElement("td");
    dateCell.textContent = dataObj.Datetime;

    const amountCell = document.createElement("td");
    amountCell.textContent = dataObj.Amount;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = dataObj.Category;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = dataObj.Description.split(" ").slice(0, 4).join(" "); // Limit to first 4 words

    const actionCell = document.createElement("button");
    actionCell.textContent = "Delete";
    actionCell.classList.add("button_transaction_table_deleter");
    actionCell.id = row_id;

    // Append all cells to the row
    row.appendChild(dateCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);

    // Append row to table and reset form
    currentTable.appendChild(row);
    currentForm.reset();

    // Update total amount
    const paragraph = document.getElementById("total_amount_p");
    paragraph.textContent = calculateTotal();
});

/**
 * Handles click events in the transaction table.
 * If the Delete button is clicked, deletes the transaction and row.
 * Otherwise, displays the full description of the clicked transaction.
 */
document.querySelector("#transaction_table").addEventListener("click", (ev) => {
    if (ev.target.classList.contains("button_transaction_table_deleter")) {
        // Delete transaction
        deleteTransaction(ev.target.id);

        const row = ev.target.closest("tr");
        row.remove();

        const paragraph = document.getElementById("total_amount_p");
        paragraph.textContent = calculateTotal();
    } else {
        // Show full description when any other cell is clicked
        const row = ev.target.closest("tr");
        const transactionId = row?.id;

        if (transactionId) {
            const paragraph = document.getElementById("Description_p");
            paragraph.textContent = getDescription(transactionId);
        }
    }
});