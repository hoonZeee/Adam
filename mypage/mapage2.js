document.addEventListener('DOMContentLoaded', function () {
    // Tab navigation for transaction history
    const tabs = document.querySelectorAll('.history-tab');
    const sections = document.querySelectorAll('.history-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Deactivate all tabs and hide all sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.add('hidden'));

            // Activate clicked tab and show its section
            tab.classList.add('active');
            const target = document.querySelector(tab.dataset.target);
            target.classList.remove('hidden');
        });
    });

    // Fetch transaction data (mock API example)
    fetch('/api/transaction-history')
        .then(response => response.json())
        .then(data => {
            populateTable('rental-table-body', data.rentals);
            populateTable('purchase-table-body', data.purchases);
            populateTable('sales-table-body', data.sales);
        })
        .catch(error => console.error('Error fetching transaction data:', error));
});

// Populate table with data
function populateTable(tableId, items) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ''; // Clear existing rows

    if (items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">내역이 없습니다.</td></tr>';
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.title}</td>
            <td>${item.details}</td>
            <td>${item.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Tab navigation for transaction history
    const tabs = document.querySelectorAll('.history-tab');
    const sections = document.querySelectorAll('.history-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Deactivate all tabs and hide all sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.add('hidden'));

            // Activate clicked tab and show its section
            tab.classList.add('active');
            const target = document.querySelector(tab.dataset.target);
            target.classList.remove('hidden');
        });
    });

    // Fetch and display rental history
    fetch('/rental-history')
        .then(response => response.json())
        .then(data => {
            if (data.success) populateTable('rental-table-body', data.rentals);
        })
        .catch(error => console.error('Error fetching rental history:', error));

    // Fetch and display purchase history
    fetch('/purchase-history')
        .then(response => response.json())
        .then(data => {
            if (data.success) populateTable('purchase-table-body', data.purchases);
        })
        .catch(error => console.error('Error fetching purchase history:', error));

    // Fetch and display sales history
    fetch('/sales-history')
        .then(response => response.json())
        .then(data => {
            if (data.success) populateTable('sales-table-body', data.sales);
        })
        .catch(error => console.error('Error fetching sales history:', error));
});

// Populate table with data
function populateTable(tableId, items) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ''; // 기존 내용 지우기

    if (!items || items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">내역이 없습니다.</td></tr>';
        return;
    }

    items.forEach(item => {
        const imageUrl = item.image_url || 'https://example.com/default-image.jpg'; // 기본값 설정
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>
                <img src="${imageUrl}" alt="${item.title}" style="width: 50px; height: auto; margin-right: 10px;">
                ${item.title}
            </td>
            <td>${item.details}</td>
            <td>₩${item.price.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

