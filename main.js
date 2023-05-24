const button = document.querySelector("button");

button.onclick = async function (e) {
  e.preventDefault();
  const { pais, genero, score, edad, isValid } = validation();
  if (isValid) {
    const response = await fetch("http://localhost:8989", {
      method: "POST",
      body: JSON.stringify({
        geography: pais,
        gender: genero,
        creditScore: score,
        age: edad,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const message = data.classify == 1
      ? "Es probable de que abandone del banco"
      : "No es probable de que abandone del banco";
    const success = data.classify == 1 ? false : true
    showToast(message, success);
  }
};

function validation() {
  const errorPais = document.getElementById("errorPais");
  const errorGenero = document.getElementById("errorGenero");
  const errorScore = document.getElementById("errorScore");
  const errorEdad = document.getElementById("errorEdad");

  // Validar los campos
  const pais = document.getElementById("pais").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const score = document.getElementById("score").value.trim();
  const edad = document.getElementById("edad").value.trim();

  let isValid = true;

  if (pais === "") {
    errorPais.classList.remove("hidden");
    isValid = false;
  } else {
    errorPais.classList.add("hidden");
  }

  if (genero === "") {
    errorGenero.classList.remove("hidden");
    isValid = false;
  } else {
    errorGenero.classList.add("hidden");
  }

  if (score === "") {
    errorScore.classList.remove("hidden");
    isValid = false;
  } else {
    errorScore.classList.add("hidden");
  }

  if (edad === "") {
    errorEdad.classList.remove("hidden");
    isValid = false;
  } else {
    errorEdad.classList.add("hidden");
  }

  // Si todos los campos son válidos, enviar el formulario
  if (isValid) {
    // Realizar aquí la lógica de envío del formulario
    console.log("Formulario enviado");
  }

  return { isValid, pais, genero, score, edad };
}

const showToast = (message, success) => {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;

  if (success) {
    toast.classList.remove("bg-red-500");
    toast.classList.add("bg-green-500");
  } else {
    toast.classList.remove("bg-green-500");
    toast.classList.add("bg-red-500");
  }

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
};
