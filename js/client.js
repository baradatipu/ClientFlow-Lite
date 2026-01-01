const ClientModule = (() => {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");
    const clientSelects = [
        document.getElementById("projectClient"),
        document.getElementById("invoiceClient")
    ];

    function loadClients() {
        const clients = Storage.get("clients");
        clientList.innerHTML = "";
        clientSelects.forEach(select => select.innerHTML = "<option value=''>Select Client</option>");

        clients.forEach(client => {
            renderClient(client);
            clientSelects.forEach(select => {
                const option = document.createElement("option");
                option.value = client.id;
                option.textContent = client.name;
                select.appendChild(option);
            });
        });
    }

    function renderClient(client) {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerHTML = `
            <h3>${client.name}</h3>
            <p>${client.business || ""}</p>
            <p>${client.phone || ""}</p>
            <p>${client.email || ""}</p>
        `;
        clientList.appendChild(div);
    }

    clientForm.addEventListener("submit", e => {
        e.preventDefault();

        const client = {
            id: Date.now().toString(),
            name: document.getElementById("clientName").value.trim(),
            phone: document.getElementById("clientPhone").value.trim(),
            email: document.getElementById("clientEmail").value.trim(),
            business: document.getElementById("clientBusiness").value.trim(),
            notes: document.getElementById("clientNotes").value.trim()
        };

        Storage.add("clients", client);
        clientForm.reset();
        loadClients();
    });

    document.addEventListener("DOMContentLoaded", loadClients);

    return {
        loadClients
    };
})();
