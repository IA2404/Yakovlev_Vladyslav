import {transactions} from "./transactions.js";

/**
 * Получает коллекцию уникальных типов транзакций из массива транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Set} Коллекция уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
    return new Set(transactions.map(transaction => transaction.transaction_type));
}
console.log(getUniqueTransactionTypes(transactions));

/**
 * Рассчет общей суммы всех транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма всех транзакций этого массива.
 */
function calculateTotalAmount (transactions) {
    let total = 0;
    transactions.forEach(transaction => total += transaction.transaction_amount);
    return total;
}
console.log(calculateTotalAmount(transactions));

/**
 * Рассчет общей суммы транзакций по дате в формате YYYY-MM-DD.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} year - Год для фильтрации транзакций.
 * @param {string} month - Месяц для фильтрации транзакций.
 * @param {string} day - День для фильтрации транзакций.
 * @returns {number} Общая сумма транзакций, соответствующих указанной дате.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    let total = 0;
    transactions.forEach(transaction => {
        const [transactionYear, transactionMonth, transactionDay] = transaction.transaction_date.split('-');
        const yearMatch = !year || transactionYear === year;
        const monthMatch = !month || transactionMonth === month;
        const dayMatch = !day || transactionDay === day;

        if (yearMatch && monthMatch && dayMatch) {
            total += transaction.transaction_amount;
        }
    });
    return total;
}
console.log(calculateTotalAmountByDate(transactions, "2019", "02", "28"));

/**
 * Фильтрация массива по типу транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} type - Тип транзакции для фильтрации.
 * @returns {Array} Массив транзакций выбранного типа.
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
}
console.log(getTransactionByType(transactions, "credit"));

/**
 * Фильтрация массива транзакций по диапазону дат.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} startDate - Начальная дата в формате 'YYYY-MM-DD'.
 * @param {string} endDate - Конечная дата в формате 'YYYY-MM-DD'.
 * @returns {Array} Массив транзакций, попадающих в указанный диапазон дат.
 */
function getTransactionsInDateRange (transactions, startDate, endDate) {
    return transactions.filter(transaction => transaction.transaction_date >= startDate && transaction.transaction_date <= endDate);
}
console.log(getTransactionsInDateRange(transactions, "2019-01-01", "2019-01-05"));

/**
 * Фильтрация массива транзакций по названию магазина.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} merchantName - Название магазина
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name=== merchantName);
}
console.log(getTransactionsByMerchant(transactions, "ElectronicsShop"));

/**
 * Рассчет средней суммы транзакций в массиве.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Средняя сумма транзакций.
 */
function calculateAverageTransactionAmount(transactions) {
    return calculateTotalAmount(transactions) / transactions.length;
}
console.log(calculateAverageTransactionAmount(transactions));

/**
 * Фильтрация транзакций в массиве по диапазону сумм.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} minAmount - Минимальная сумма транзакции.
 * @param {number} maxAmount - Максимальная сумма транзакции.
 * @returns {Array} Массив транзакций, сумма которых находится в указанном диапазоне.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}
console.log(getTransactionsByAmountRange(transactions, 50, 100));

/**
 * Рассчет общуй суммы дебетовых транзакций в массиве.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
    let debitArr = transactions.filter(transaction => transaction.transaction_type === "debit");
    return calculateTotalAmount(debitArr);
}
console.log(calculateTotalDebitAmount(transactions));

/**
 * Нахождение месяца с наибольшим количеством транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {string} Месяц с наибольшим количеством транзакций в формате 'YYYY-MM'.
 * @returns {string} Возвращает строку "Array is empty", если массив пуст
 */
function findMostTransactionsMonth(transactions) {
    if (transactions.length < 1) {
        return "Array is empty";
    }
    const monthCounts = transactions.reduce((sum, {transaction_date}) => {
        const month = transaction_date.substring(0, 7);
        sum[month] = (sum[month] ?? 0) + 1;
        return sum;
    }, {});
    return Object.keys(monthCounts).reduce((maxMonth, month) =>
        monthCounts[month] > monthCounts[maxMonth] ? month : maxMonth
    );
}
console.log(findMostTransactionsMonth(transactions));

/**
 * Нахождение месяца с наибольшим количеством дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {string} Месяц с наибольшим количеством дебетовых транзакций в формате 'YYYY-MM'.
 * @returns {string} Возвращает строку "Array is empty", если массив пуст
 */
function findMostDebitTransactionMonth(transactions) {
    if (transactions.length < 1) {
        return "Array is empty";
    }
    const debitTransactions = transactions.filter(transaction => transaction.transaction_type === 'debit');

    const monthCounts = debitTransactions.reduce((sum, {transaction_date}) => {
        const month = transaction_date.substring(0, 7);
        sum[month] = (sum[month] ?? 0) + 1;
        return sum;
    }, {});
    return Object.keys(monthCounts).reduce((maxMonth, month) =>
        monthCounts[month] > monthCounts[maxMonth] ? month : maxMonth
    );
}
console.log(findMostDebitTransactionMonth(transactions));

/**
 * Функция сравнивает, какой тип транзакции встречается чаще: дебетовая или кредитная.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {string} Возвращает "debit", если дебетовых транзакций больше, "credit", если кредитных больше, или "equal", если их количество одинаково.
 * @returns {string} Возвращает строку "Array is empty", если массив пуст
 */
function mostTransactionTypes(transactions) {
    if (transactions.length < 1) {
        return "Array is empty";
    }
    const transactionCounts = transactions.reduce((counts, { transaction_type }) => {
        counts[transaction_type] = (counts[transaction_type] ?? 0) + 1;
        return counts;
    }, {});

    const debitCount = transactionCounts["debit"] ?? 0;
    const creditCount = transactionCounts["credit"] ?? 0;

    return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
}
console.log(mostTransactionTypes(transactions));

/**
 * Фильтрация транзакции, произошедших до указанной даты.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} date - Дата в формате 'YYYY-MM-DD'. Возвращает транзакции, произошедшие до этой даты.
 * @returns {Array} Массив транзакций, произошедших до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(transaction => transaction.transaction_date < date);
}
console.log(getTransactionsBeforeDate(transactions, "2019-01-20"));

/**
 * Нахождение транзакции по уникальному идентификатору.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} id - Идентификатор транзакции.
 * @returns {Object|undefined} Возвращает объект транзакции, если транзакция с таким ID найдена, или undefined, если транзакция не найдена.
 */
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id);
}
console.log(findTransactionById(transactions, "10"));

/**
 * Получение описания всех транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Array} Массив описаний всех транзакций.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
}
console.log(mapTransactionDescriptions(transactions));


//Проверка работы некоторых функций на пустом массиве
const emptyArray = [];

console.log(getUniqueTransactionTypes(emptyArray)); //empty Set
console.log(calculateAverageTransactionAmount(emptyArray)); // NaN
console.log(mostTransactionTypes(emptyArray)); // equal
console.log(findMostTransactionsMonth(emptyArray)); // returns array is empty
console.log(mapTransactionDescriptions(emptyArray)); // returns empty array

console.log("__________");
//Проверка работы некоторых функций на массиве с 1 элементом
const singleElementArray = [ {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: 100.0,
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
}];
console.log(getUniqueTransactionTypes(singleElementArray));
console.log(calculateAverageTransactionAmount(singleElementArray));
console.log(mostTransactionTypes(singleElementArray));
console.log(findMostTransactionsMonth(singleElementArray));
console.log(mapTransactionDescriptions(singleElementArray));
