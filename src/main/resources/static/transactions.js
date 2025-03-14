document.addEventListener("DOMContentLoaded", async function() {
    async function loadAllTransactions() {
        try {
            const response = await fetch("/api/transactions");
            const transactions = await response.json();

            console.log("Fetched transactions:", transactions);

            const tableBody = document.querySelector("#allTransactionsTable tbody");
            tableBody.innerHTML = "";

            transactions.forEach(t => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${t.id}</td>
                    <td>${t.description ? t.description : "No Description"}</td>
                    <td>$${t.amount.toFixed(2)}</td>
                    <td>${t.transactionDate}</td>
                    <td>${t.category ? t.category.name : "No Category"}</td>
                `;

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    loadAllTransactions();
});