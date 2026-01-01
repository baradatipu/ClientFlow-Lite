document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".app-nav button");
    const sections = document.querySelectorAll(".tab-section");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-tab");

            sections.forEach(sec => {
                sec.classList.toggle("active", sec.id === target);
            });
        });
    });

    // Backup export
    document.getElementById("exportData").addEventListener("click", () => {
        const data = Storage.exportAll();
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "clientflow_backup.json";
        a.click();
        URL.revokeObjectURL(url);
    });

    // Backup import
    document.getElementById("importData").addEventListener("change", e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = evt => {
            try {
                const data = JSON.parse(evt.target.result);
                Storage.importAll(data);
                location.reload();
            } catch {
                alert("Invalid backup file");
            }
        };
        reader.readAsText(file);
    });
});
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
