let tiempoRestante = 0;
let intervalo;
const sonido = new Audio('https://lasonotheque.org/UPLOAD/mp3/1616.mp3?v=d'); // Ruta del sonido

function iniciarCronometro() {
    const segundosInput = document.getElementById('segundos').value;
    if (segundosInput && !intervalo) {
        tiempoRestante = parseInt(segundosInput); // Inicializa en los segundos indicados
        intervalo = setInterval(() => {
            tiempoRestante--;
            document.getElementById('tiempo').textContent = formatearTiempo(tiempoRestante);

            if (tiempoRestante <= 0) {
                detenerCronometro();
                sonido.play(); // Reproduce el sonido
                alert('¡Tiempo finalizado!');
            }
        }, 1000);
    }
}

function detenerCronometro() {
    clearInterval(intervalo);
    intervalo = null;
}

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}