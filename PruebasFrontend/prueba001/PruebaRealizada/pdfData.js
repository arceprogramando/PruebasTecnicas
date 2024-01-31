document.getElementById("pdfForm").addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById("POST-title").value;
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (title && file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            let fileName = title;

            if (!isPDF(fileName)) {
                fileName += ".pdf";
            }

            const pdfData = {
                title: fileName,
                file: reader.result
            };

            localStorage.setItem("pdfData", JSON.stringify(pdfData));
            alert("PDF almacenado en localStorage");

            document.getElementById("POST-title").value = "";
            fileInput.value = "";

            location.reload();
        };

        reader.onerror = function (error) {
            console.error('Error al leer el archivo:', error);
        };

    } else {
        alert("Por favor, complete todos los campos del formulario.");
    }
});

function isPDF(fileName) {
    const lowercaseFileName = fileName.toLowerCase();
    return /\.(pdf)$/i.test(lowercaseFileName);
}

function deletePdfData() {
    localStorage.removeItem("pdfData");
    showPdfData(); 
  }
  
function showPdfData() {
    const pdfDataArea = document.getElementById("pdfDataArea");
    const storedPdfData = JSON.parse(localStorage.getItem("pdfData"));

    if (storedPdfData) {
        if (isPDF(storedPdfData.title)) {
            const formattedTitle = storedPdfData.title.replace(/\s+/g, '_');

            pdfDataArea.innerHTML = `<h4>Datos del PDF almacenados:</h4>
                                      <p>Título: ${storedPdfData.title}</p>
                                      <embed src="${storedPdfData.file}" type="application/pdf" width="300px" height="500px">
                                      <a href="${storedPdfData.file}" download="${formattedTitle}">Descargar PDF</a>
                                      <button id="deletePdfButton" onclick="deletePdfData()">Eliminar PDF</button>`
                                      
        } else {
            pdfDataArea.innerHTML = "<p>El archivo no es un PDF válido.</p>";
        }
    } else {
        pdfDataArea.innerHTML = "<p>No hay datos de PDF almacenados.</p>";
    }
}

showPdfData();
