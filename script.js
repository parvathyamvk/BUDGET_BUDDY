document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input values
    const dailyBudget = parseFloat(document.getElementById('dailyBudget').value);
    const monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value);
    const electricityBill = parseFloat(document.getElementById('electricityBill').value);
    const dailySavings = parseFloat(document.getElementById('dailySavings').value);
    const foodExpense = parseFloat(document.getElementById('foodExpense').value);
    const entertainmentExpense = parseFloat(document.getElementById('entertainmentExpense').value);
    const otherExpense = parseFloat(document.getElementById('otherExpense').value);

    // Calculate remaining daily budget after expenses
    const remainingBudget = dailyBudget - (electricityBill + foodExpense + entertainmentExpense + otherExpense);
    document.getElementById('remainingBudget').textContent = `Remaining Daily Budget: $${remainingBudget.toFixed(2)}`;
    document.getElementById('totalSavings').textContent = `Total Savings Today: $${dailySavings.toFixed(2)}`;

    // Update charts and transaction history
    updateCharts(dailyBudget, monthlyBudget, electricityBill, dailySavings, foodExpense, entertainmentExpense, otherExpense);
    addTransactionHistory(dailySavings, dailyBudget);

    // Show notification if budget is exceeded
    if (remainingBudget < 0) {
        showNotification('You have exceeded your daily budget!');
    }

    // Update monthly comparison chart and savings tips
    updateMonthlyComparisonChart(monthlyBudget, dailySavings);
    generateSavingsTips(dailySavings);
});

function updateCharts(dailyBudget, monthlyBudget, electricityBill, dailySavings, foodExpense, entertainmentExpense, otherExpense) {
    const expenseChartContext = document.getElementById('expenseChart').getContext('2d');
    new Chart(expenseChartContext, {
        type: 'bar',
        data: {
            labels: ['Food', 'Entertainment', 'Other Expenses'],
            datasets: [{
                label: 'Expense Breakdown ($)',
                data: [foodExpense, entertainmentExpense, otherExpense],
                backgroundColor: ['#ff4e50', '#f9d423', '#ff6347'],
                borderColor: ['#ff4e50', '#f9d423', '#ff6347'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': $' + tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function updateMonthlyComparisonChart(monthlyBudget, savings) {
    const comparisonChart = document.getElementById('budgetComparisonChart').getContext('2d');
    new Chart(comparisonChart, {
        type: 'bar',
        data: {
            labels: ['Monthly Budget', 'Current Savings'],
            datasets: [{
                label: 'Monthly Comparison ($)',
                data: [monthlyBudget, savings],
                backgroundColor: ['#ff5733', '#28a745'],
                borderColor: ['#ff5733', '#28a745'],
                borderWidth: 1
            }]
        }
    });
}

function generateSavingsTips(savings) {
    const tips = document.getElementById('savingsTips');
    tips.innerHTML = '';

    const savingsTips = [
        "Consider cutting back on dining out to save more.",
        "Try reducing entertainment expenses for additional savings.",
        "Saving a fixed percentage of your income each month will help you build a strong emergency fund.",
    ];

    if (savings < 20) {
        tips.innerHTML = `<li>Tip: Try increasing your savings goal.</li>`;
    } else {
        tips.innerHTML = `<li>Tip: You're doing great! Keep up the good work.</li>`;
    }
}

function addTransactionHistory(savings, dailyBudget) {
    const tableBody = document.getElementById('transactionHistory').getElementsByTagName('tbody')[0];
    const currentDate = new Date().toLocaleDateString();
    const newRow = tableBody.insertRow();
    const typeCell = newRow.insertCell(0);
    const dateCell = newRow.insertCell(1);
    const amountCell = newRow.insertCell(2);

    typeCell.textContent = savings > 0 ? 'Saving' : 'Expense';
    dateCell.textContent = currentDate;
    amountCell.textContent = savings.toFixed(2);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}// Savings Calculation Logic
document.getElementById('savingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);

    if (isNaN(income) || isNaN(expenses)) {
        alert("Please enter valid income and expenses.");
        return;
    }

    const savings = income - expenses;
    const savingsRate = (savings / income) * 100;

    let resultMessage = `You are saving ₹${savings} monthly, which is ${savingsRate.toFixed(2)}% of your income.`;

    if (savingsRate < 10) {
        resultMessage += " Consider saving more to improve your financial health.";
    } else if (savingsRate >= 10 && savingsRate <= 20) {
        resultMessage += " You're on track! Keep up the good work.";
    } else {
        resultMessage += " Excellent! You're saving a large portion of your income.";
    }

    document.getElementById('result').innerText = resultMessage;
});

