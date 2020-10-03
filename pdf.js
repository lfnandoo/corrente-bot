const PDFDocument = require("pdfkit");
const fs = require("fs");

function pdff() {
  const doc = new PDFDocument({
    size: [350, 350]
  });

  doc.pipe(fs.createWriteStream("output.pdf"));

  doc.text("Corrente bot!", 100, 100);

  doc.addPage().image("screenshots/example.png", {
    fit: [210, 290]
  });

  doc.end();
}

pdff();
