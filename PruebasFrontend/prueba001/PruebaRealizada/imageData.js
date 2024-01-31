document
  .getElementById("imageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("POST-titleimage").value;
    console.log("🚀 ~ document.getElementById ~ title:", title);

    const fileInput = document.getElementById("POST-image");
    const file = fileInput.files[0];
    console.log("🚀 ~ document.getElementById ~ file:", file);

    if (title && file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const fileExtension = getFileExtension(file.name);

        const fileName = `${title}.${fileExtension}`;

        const imageData = {
          title: fileName,
          file: reader.result,
        };

        localStorage.setItem("imageData", JSON.stringify(imageData));
        alert("Imagen almacenada en localStorage");

        document.getElementById("POST-title").value = "";
        fileInput.value = "";

        location.reload();
      };

      reader.onerror = function (error) {
        console.error("Error al leer el archivo:", error);
      };
    } else {
      alert("Por favor, complete todos los campos del formulario.");
    }
  });

function getFileExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

function isImage(fileName) {
  const lowercaseFileName = fileName.toLowerCase();
  return /\.(jpg|jpeg|png|gif)$/i.test(lowercaseFileName);
}

function showImgData() {
    const imgDataArea = document.getElementById("imageDataArea");
    const storedImageData = JSON.parse(localStorage.getItem("imageData"));

    if (storedImageData) {
        const formattedTitle = storedImageData.title.replace(/\s+/g, "_");

        imgDataArea.innerHTML = `<h4>Datos de la Imagen almacenados:</h4>
                                 <p>Título: ${storedImageData.title}</p>
                                 <img src="${storedImageData.file}" alt="${formattedTitle}" style="max-width: 100%;" />
                                 <br>
                                 <a href="${storedImageData.file}" download="${formattedTitle}">Descargar Imagen</a>`;
    } else {
        imgDataArea.innerHTML = "<p>No hay datos de Imagen almacenados.</p>";
    }
}

showImgData();
showImgData();
