document.addEventListener('DOMContentLoaded', (event) => {
    const pagePassword = "5571";
    let entryPassword = prompt("Please enter your CVV (locatated at the back of your membership card):");

    while (entryPassword !== pagePassword) {
        entryPassword = prompt("CVV is invalid. Please try again:");
    }

    document.getElementById('content').style.display = 'block';

    let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
    const transactions = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : [];

    function updateDisplay() {
        document.getElementById('pointsDisplay').textContent = 'Points: ' + points;
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        const historyElement = document.getElementById('historyList');
        historyElement.innerHTML = '';
        transactions.slice().reverse().forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = transaction;
            historyElement.appendChild(li);
        });
    }

    function getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString();
    }

    function checkButtonPassword() {
        return prompt("Please request a staff member to perfrom this action:") === "1277";
    }

    function updateLocalStorage() {
        localStorage.setItem('points', points.toString());
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    document.getElementById('buyCoffee').addEventListener('click', function() {
        if (checkButtonPassword()) {
            points += 10;
            transactions.push(`[${getCurrentDateTime()}] Added 10 points - Total: ${points}`);
            updateDisplay();
            updateLocalStorage();
        } else {
            alert("Incorrect password for transaction.");
        }
    });

    document.getElementById('redeemPoints').addEventListener('click', function() {
        if (checkButtonPassword()) {
            if (points >= 250) {
                points -= 250;
                transactions.push(`[${getCurrentDateTime()}] Redeemed 250 points - Total: ${points}`);
                alert('Enjoy your free coffee!');
                updateDisplay();
                updateLocalStorage();
            } else {
                alert('You need 250 points to redeem a free coffee.');
            }
        } else {
            alert("Incorrect staff password for transaction.");
        }
    });

    updateDisplay(); // Initial display update
});
