document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById("POST-name").value,
        lastname: document.getElementById("POST-lastname").value,
        phonenumber: document.getElementById("POST-phonenumber").value,
        birthdate: document.getElementById("POST-birthdate").value,
        };
    console.log("Datos a almacenar:", formData);
    localStorage.setItem("userData", JSON.stringify(formData));

    location.reload();
});

function showUserData() {
    const userDataArea = document.getElementById("userDataArea");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
        userDataArea.innerHTML = `<h4>Datos del Usuario almacenados:</h4>
                                  <p>Nombre: ${storedUserData.name}</p>
                                  <p>Apellido: ${storedUserData.lastname}</p>
                                  <p>Teléfono: ${storedUserData.phonenumber}</p>
                                  <p>Fecha de Nacimiento: ${storedUserData.birthdate}</p>`;
    } else {
        userDataArea.innerHTML = "<p>No hay datos de usuario almacenados.</p>";
    }
}

showUserData();