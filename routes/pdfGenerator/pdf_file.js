const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
// Creating the data
let data = {
    data: "http://localhost:3000/tasks_db",
};
// Converting the data into String format
let stringdata = JSON.stringify(data);
// Print the QR code to terminal
QRCode.toString(stringdata, {type: "terminal"}, function (err, QRcode) {
    if (err) return console.log("error occurred");
    // Printing the generated code
    console.log(QRcode);
});
// Converting the data into base64
QRCode.toDataURL(stringdata, function (err, code) {
    if (err) return console.log("error occurred");
    // Printing the code
    console.log(code);
});

function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({bufferPages: true, font: "Courier"});
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc
        .fontSize(20, {
            align: "center",
            valign: "center",
        })
        .text("Welcom to my to do list  ");

    doc.fontSize(12).text("Link below will take you to my to do list ");
    doc
        .image("To-Do List.png", {
            fit: [250, 300],
            align: "center",
            valign: "center",
        })

        .text(QRcode)
        .fillColor("blue")

        .underline(100, 100, 160, 27, {color: "#0000FF", text: "click"})
        .link(100, 100, 160, 27, "http://localhost:3000/tasks_db");
    doc.end();
}

module.exports = {buildPDF};