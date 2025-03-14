document.addEventListener("DOMContentLoaded", function() {
    async function loadCategories() {
        try {
            const response = await fetch("/api/categories");
            const categories = await response.json();

            console.log("Fetched categories:", categories);

            const categorySelect = document.getElementById("category");
            categorySelect.innerHTML = '<option value="">Select a Category</option>';

            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    document.getElementById("transactionForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const descriptionInput = document.getElementById("description").value.trim();
        const description = descriptionInput.length > 0 ? descriptionInput : null;
        const amountInput = document.getElementById("amount").value;
        const amount = parseFloat(amountInput);
        const transactionDate = document.getElementById("transactionDate").value;
        const categoryId = document.getElementById("category").value;

        if (isNaN(amount) || !categoryId) {
            alert("Amount must be a valid number and category must be selected.");
            return;
        }

        const transaction = {
            description,
            amount: parseFloat(amount.toFixed(2)),
            transactionDate: transactionDate || new Date().toISOString().split("T")[0],
            category: { id: categoryId }
        };

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                throw new Error("Failed to add transaction.");
            }

            loadRecentTransactions();
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    });

    async function loadRecentTransactions() {
        try {
            const response = await fetch("/api/transactions");
            const transactions = await response.json();

            const recentTransactions = transactions.slice(-5);

            const tableBody = document.querySelector("#recentTransactionsTable tbody");
            tableBody.innerHTML = "";

            recentTransactions.forEach(t => {
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

    loadCategories();
    loadRecentTransactions();
});