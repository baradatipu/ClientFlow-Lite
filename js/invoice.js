const InvoiceModule = (() => {
    const generateBtn = document.getElementById("generateInvoice");

    generateBtn.addEventListener("click", () => {
        const clientId = document.getElementById("invoiceClient").value;
        const projectId = document.getElementById("invoiceProject").value;
        const item = document.getElementById("invoiceItem").value;
        const qty = Number(document.getElementById("invoiceQty").value || 1);
        const price = Number(document.getElementById("invoicePrice").value || 0);
        const applyGST = document.getElementById("invoiceGST").checked;

        if (!clientId || !item || price <= 0) {
            alert("Please fill required fields");
            return;
        }

        const clients = Storage.get("clients");
        const projects = Storage.get("projects");

        const client = clients.find(c => c.id === clientId);
        const project = projects.find(p => p.id === projectId);

        const subtotal = qty * price;
        const gstAmount = applyGST ? subtotal * 0.18 : 0;
        const total = subtotal + gstAmount;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("INVOICE", 20, 20);

        doc.setFontSize(10);
        doc.text(`Invoice No: INV-${Date.now()}`, 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 36);

        doc.text(`Client: ${client.name}`, 20, 46);
        doc.text(`Business: ${client.business || ""}`, 20, 52);

        if (project) {
            doc.text(`Project: ${project.title}`, 20, 62);
        }

        doc.line(20, 68, 190, 68);

        doc.text("Item", 20, 76);
        doc.text("Qty", 120, 76);
        doc.text("Price", 140, 76);
        doc.text("Amount", 170, 76);

        doc.line(20, 78, 190, 78);

        doc.text(item, 20, 86);
        doc.text(qty.toString(), 120, 86);
        doc.text(`₹${price}`, 140, 86);
        doc.text(`₹${subtotal}`, 170, 86);

        let y = 100;

        if (applyGST) {
            doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, 140, y);
            y += 6;
        }

        doc.text(`Total: ₹${total.toFixed(2)}`, 140, y);

        doc.save(`invoice_${client.name}.pdf`);
    });
})();
