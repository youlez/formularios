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

function validarPaso(pasoActual) {
  const seccion = document.querySelector(`.seccion-acordeon[data-paso="${pasoActual}"]`);
  if (!seccion) return true;

  const campos = seccion.querySelectorAll("input[required], select[required]");
  let esValido = true;

  campos.forEach((campo) => {
    const contenedorCampo = campo.closest(".campo");
    contenedorCampo.classList.remove("error");
    const errorPrevio = contenedorCampo.querySelector(".mensaje-error");
    if (errorPrevio) errorPrevio.remove();

    if (!campo.value.trim()) {
      esValido = false;
      contenedorCampo.classList.add("error");
      const mensaje = document.createElement("span");
      mensaje.classList.add("mensaje-error");
      mensaje.textContent = "Campo requerido";
      contenedorCampo.appendChild(mensaje);
    }
  });

  return esValido;
}

function siguientePaso(numeroPaso) {
  // Buscamos cuál es el paso que está abierto actualmente
  const seccionActual = document.querySelector(".seccion-acordeon.activo");
  const pasoActual = seccionActual ? Number(seccionActual.dataset.paso) : 1;

  // Si el usuario intenta ir a un paso SUPERIOR, validamos el paso actual.
  // Si intenta ir a un paso INFERIOR (atrás), lo dejamos pasar sin validar.
  if (numeroPaso > pasoActual) {
    if (!validarPaso(pasoActual)) {
      return; // Bloqueamos si hay errores
    }
  }

  // Si pasó la validación o va hacia atrás, ejecutamos el cambio:
  // Cerrar todos los acordeones
  document.querySelectorAll(".seccion-acordeon").forEach(seccion => {
    seccion.classList.remove("activo");
  });

  // Ocultar todos los steppers
  ocultarTodosLosSteppers();

  const seccionDestino = document.querySelector(`.seccion-acordeon[data-paso="${numeroPaso}"]`);

  if (seccionDestino) {
    seccionDestino.classList.add("activo");

    // Mostrar SOLO el stepper del acordeón activo
    const stepper = seccionDestino.querySelector(".stepper-wrapper");
    if (stepper) {
      stepper.style.display = "flex";
    }
  }

  actualizarStepper(numeroPaso);
}

// Eventos para Títulos
document.querySelectorAll(".titulo-seccion").forEach(titulo => {
  titulo.addEventListener("click", function () {
    const numeroPaso = Number(this.parentElement.dataset.paso);
    siguientePaso(numeroPaso);
  });
});

// Eventos para Stepper
document.querySelectorAll(".step").forEach(step => {
  step.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita conflictos de eventos
    const paso = Number(step.dataset.step);
    siguientePaso(paso);
  });
});

// Limpiar error al escribir
document.addEventListener("input", (e) => {
  if (e.target.matches("input, select")) {
    const campo = e.target.closest(".campo");
    if (campo && campo.classList.contains("error")) {
      campo.classList.remove("error");
      const mensaje = campo.querySelector(".mensaje-error");
      if (mensaje) mensaje.remove();
    }
  }
});