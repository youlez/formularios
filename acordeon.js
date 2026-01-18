function siguientePaso(numeroPaso) {

    document.querySelectorAll(".seccion-acordeon").forEach((seccion) => {
        seccion.classList.remove("activo");
    });

    document
        .querySelector(`.seccion-acordeon[data-paso="${numeroPaso}"]`)
        .classList.add("activo");
}

// Click en el título del acordeón
document.querySelectorAll(".titulo-seccion").forEach((titulo) => {
    titulo.addEventListener("click", function () {
        const seccion = this.parentElement;
        const numeroPaso = parseInt(seccion.dataset.paso);
        siguientePaso(numeroPaso);
    });
});
