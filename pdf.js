const PDFDocument = require("pdfkit");
const fs = require("fs");

const fileNames = ["danielfercruz", "example", "igor-rebolla"];

function pdff() {
  const doc = new PDFDocument({
    size: [350, 350]
  });

  doc.pipe(fs.createWriteStream("output.pdf"));

  doc.text("Corrente bot!", 100, 100);

  fileNames.map((fileName) => {
    doc.addPage().image(`screenshots/${fileName}.png`, {
      fit: [210, 290]
    });
  });

  doc.end();
}

pdff();
