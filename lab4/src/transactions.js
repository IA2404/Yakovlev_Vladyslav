
/**
 * An array that stores all transaction records.
 * @type {Transactions[]}
 */
export let transactions_array = [];

/**
 * Class representing a financial transaction.
 */
export class Transactions {
    /**
     * Create a transaction.
     * @param {string|number} id - Unique identifier of the transaction
     * @param {string} date - Date and time of the transaction
     * @param {number|string} amount - Amount of the transaction
     * @param {string} category - Category of the transaction
     * @param {string} description - Description of the transaction
     */
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}

/**
 * Adds a new transaction to the `transactions_array`.
 *
 * @param {string|number} id - Unique identifier of the transaction
 * @param {string} date - Date and time of the transaction
 * @param {number|string} amount - Amount of the transaction
 * @param {string} category - Category of the transaction
 * @param {string} description - Description of the transaction
 */
export function addTransaction(id, date, amount, category, description) {
    let newTransaction = new Transactions(id, date, amount, category, description);
    transactions_array.push(newTransaction);
}

/**
 * Deletes a transaction from the `transactions_array` by its `id`.
 *
 * @param {string|number} id - ID of the transaction to delete
 */
export function deleteTransaction(id) {
    const index = transactions_array.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {
        transactions_array.splice(index, 1);
    }
}

/**
 * Returns the description of a transaction by its `id`.
 *
 * @param {string|number} id - ID of the transaction
 * @returns {string} Description of the transaction
 */
export function getDescription(id) {
    const index = transactions_array.findIndex(item => String(item.id) === String(id));
    return transactions_array[index].description;
}

/**
 * Calculates the total amount of all transactions.
 *
 * @returns {number} Sum of all transaction amounts
 */
export function calculateTotal() {
    return transactions_array.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
}