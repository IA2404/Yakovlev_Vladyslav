# Инструкции по запуску проекта:
Открыть файлы main.js и transaction.js в среде, поддерживающей Node.js, указать актуальный 
путь к transaction.js в main.js.

# Описание лабораторной работы
Создание ряда функций для удобной работы с массивом транзакций (объектов).

# Документация
The export declaration is used to export values from a JavaScript module.
Exported values can then be imported into other programs with the import declaration or dynamic import.
The value of an imported binding is subject to change in the module that exports it — when a module updates the value of a binding that it exports, the update will be visible in its imported value.

In order to use the export declaration in a source file, the file must be interpreted by the runtime as a module.
In HTML, this is done by adding type="module" to the script tag, or by being imported by another module.
Modules are automatically interpreted in strict mode.

# Код проекта
Для удобства работы, основной массив транзакций был вынесен в отдельный файл и подключен при помощи import (см. документацию):
```javascript
export const transactions = [
``` 
```javascript
import {transactions} from "./transactions.js";
```
Далее предоставлен код функций, содержащий исчерпывающие комментарии согласно JSDoc:
```javascript
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
```
Во время проверки выполнения функций на пустом массиве было обнаружено падение программы
на функциях, содержащих метод .reduce объекта Array. Во избежание падения программы,
в функции, содержащие метод .reduce были добавлены дополнительные проверки if,
является ли массив пустым.
```javascript
 if (transactions.length < 1) {
        return "Array is empty";
    }
```
Вызов некоторых функций для проверки корректности обработки с 0 и 1 объектом в массиве:
```javascript
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
```
# Контрольные вопросы
1. Какие методы массивов можно использовать для обработки объектов в JavaScript?
map(), filter(), reduce(), forEach(), find(), some(), every(), sort(), includes(), indexOf(), flatMap()


2. Как сравнивать даты в строковом формате в JavaScript?
   В JavaScript для сравнения дат в строковом формате необходимо,
чтобы даты были представлены в одном стандартном формате,
который можно корректно сравнивать. Наиболее удобный — YYYY-MM-DD,
даты в этом формате можно сравнивать как обычные строки,


3. В чем разница между map(), filter() и reduce() при работе с массивами объектов?
Метод map() используется для преобразования каждого элемента массива
и создания нового массива на основе результатов.

Метод filter() используется для фильтрации элементов массива.
Он создает новый массив, включающий только те элементы, которые
удовлетворяют условию.

Метод reduce() используется для сведения массива к одному значению.
Он принимает функцию-аккумулятор, которая на каждом шаге преобразует текущий
элемент в новый результат, и возвращает итоговое значение
после обработки всех элементов массива.

# Источники
https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#definition
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
