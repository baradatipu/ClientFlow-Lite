const ProjectModule = (() => {
    const projectForm = document.getElementById("projectForm");
    const projectList = document.getElementById("projectList");
    const projectClientSelect = document.getElementById("projectClient");
    const invoiceProjectSelect = document.getElementById("invoiceProject");

    function loadProjects() {
        const projects = Storage.get("projects");
        const clients = Storage.get("clients");

        projectList.innerHTML = "";
        invoiceProjectSelect.innerHTML = "<option value=''>Select Project</option>";

        projects.forEach(project => {
            const client = clients.find(c => c.id === project.clientId);
            renderProject(project, client);

            const option = document.createElement("option");
            option.value = project.id;
            option.textContent = project.title;
            invoiceProjectSelect.appendChild(option);
        });
    }

    function renderProject(project, client) {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerHTML = `
            <h3>${project.title}</h3>
            <p>Client: ${client ? client.name : "Unknown"}</p>
            <p>Status: ${project.status}</p>
            <p>Cost: ₹${project.cost || 0}</p>
        `;
        projectList.appendChild(div);
    }

    projectForm.addEventListener("submit", e => {
        e.preventDefault();

        const project = {
            id: Date.now().toString(),
            clientId: projectClientSelect.value,
            title: document.getElementById("projectTitle").value.trim(),
            description: document.getElementById("projectDescription").value.trim(),
            startDate: document.getElementById("projectStart").value,
            status: document.getElementById("projectStatus").value,
            cost: document.getElementById("projectCost").value
        };

        if (!project.clientId) return;

        Storage.add("projects", project);
        projectForm.reset();
        loadProjects();
    });

    document.addEventListener("DOMContentLoaded", loadProjects);

    return {
        loadProjects
    };
})();
