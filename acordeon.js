
function actualizarStepper(pasoActivo) {
  document.querySelectorAll(".step").forEach(step => {
    const value = Number(step.dataset.step);
    step.classList.remove("active", "completed");

    if (value < pasoActivo) step.classList.add("completed");
    if (value === pasoActivo) step.classList.add("active");
  });
}

function ocultarTodosLosSteppers() {
  document.querySelectorAll(".stepper-wrapper").forEach(wrapper => {
    wrapper.style.display = "none";
  });
}

function siguientePaso(numeroPaso) {
  // Cerrar todos los acordeones
  document.querySelectorAll(".seccion-acordeon").forEach(seccion => {
    seccion.classList.remove("activo");
  });

  // Ocultar todos los steppers
  ocultarTodosLosSteppers();

  // Activar acordeón correspondiente
  const seccionActiva = document.querySelector(
    `.seccion-acordeon[data-paso="${numeroPaso}"]`
  );

  if (seccionActiva) {
    seccionActiva.classList.add("activo");

    // Mostrar SOLO el stepper del acordeón activo
    const stepper = seccionActiva.querySelector(".stepper-wrapper");
    if (stepper) {
      stepper.style.display = "flex";
    }
  }

  actualizarStepper(numeroPaso);
}

document.querySelectorAll(".titulo-seccion").forEach(titulo => {
  titulo.addEventListener("click", function () {
    const numeroPaso = Number(this.parentElement.dataset.paso);
    siguientePaso(numeroPaso);
  });
});

document.querySelectorAll(".step").forEach(step => {
  step.addEventListener("click", () => {
    const paso = Number(step.dataset.step);
    siguientePaso(paso);
  });
});