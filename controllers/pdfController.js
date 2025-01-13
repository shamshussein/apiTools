const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function mergePDFs (pdfPaths) {
  const mergedPdf = await PDFDocument.create();
  for (const pdfPath of pdfPaths) {
    const pdf = await PDFDocument.load(fs.readFileSync(pdfPath));
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }
  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
}
module.exports = mergePDFs;
