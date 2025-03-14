document.addEventListener("DOMContentLoaded", async function () {
    const monthSelector = document.getElementById("monthSelector");
    let transactions = [];

    async function fetchTransactionData() {
        try {
            const response = await fetch("/api/transactions");
            transactions = await response.json();

            console.log("Fetched transactions:", transactions);

            populateMonthSelector();
            updateCharts();
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    }

    function populateMonthSelector() {
        const months = new Set();
        transactions.forEach(t => {
            const month = t.transactionDate.substring(0, 7);
            months.add(month);
        });

        monthSelector.innerHTML = `<option value="all">All Months</option>`;
        [...months].sort().forEach(month => {
            const option = document.createElement("option");
            option.value = month;
            option.textContent = month;
            monthSelector.appendChild(option);
        });

        monthSelector.addEventListener("change", updateCharts);
    }

    function filterTransactionsByMonth() {
        const selectedMonth = monthSelector.value;
        if (selectedMonth === "all") return transactions;
        return transactions.filter(t => t.transactionDate.startsWith(selectedMonth));
    }

    function updateCharts() {
        const filteredTransactions = filterTransactionsByMonth();
        const categoryTotals = {};
        const categoryMonthlyTotals = {};

        filteredTransactions.forEach(t => {
            const categoryName = t.category ? t.category.name : "Uncategorized";
            categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + parseFloat(t.amount);

            const month = t.transactionDate.substring(0, 7);
            if (!categoryMonthlyTotals[month]) categoryMonthlyTotals[month] = {};
            categoryMonthlyTotals[month][categoryName] =
                (categoryMonthlyTotals[month][categoryName] || 0) + parseFloat(t.amount);
        });

        renderPieChart(categoryTotals);
        renderBarChart(categoryMonthlyTotals);
    }

    function renderPieChart(categoryTotals) {
        const ctx = document.getElementById("transactionPieChart").getContext("2d");
        if (window.pieChart) window.pieChart.destroy();

        window.pieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    data: Object.values(categoryTotals),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } }
            }
        });
    }

    function renderBarChart(categoryMonthlyTotals) {
        const ctx = document.getElementById("transactionBarChart").getContext("2d");
        if (window.barChart) window.barChart.destroy();

        const months = Object.keys(categoryMonthlyTotals);
        const categories = [...new Set(Object.values(categoryMonthlyTotals).flatMap(obj => Object.keys(obj)))];

        const datasets = categories.map(category => ({
            label: category,
            data: months.map(month => categoryMonthlyTotals[month][category] || 0),
            backgroundColor: getRandomColor(),
        }));

        window.barChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: months,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function getRandomColor() {
        return `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    fetchTransactionData();
});