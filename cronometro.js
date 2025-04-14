let tiempoRestante = 0;
let intervalo;
let wakeLock = null; // Para evitar que la pantalla se bloquee
const sonido = new Audio('https://lasonotheque.org/UPLOAD/mp3/1616.mp3?v=d'); // Sonido de alerta

async function activarWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error('Error al activar Wake Lock:', err);
    }
}

function liberarWakeLock() {
    if (wakeLock) {
        wakeLock.release().then(() => {
            wakeLock = null;
        });
    }
}

function iniciarCronometro() {
    const segundosInput = document.getElementById('segundos').value;
    if (segundosInput && !intervalo) {
        tiempoRestante = parseInt(segundosInput);

        activarWakeLock(); // Mantener la pantalla encendida

        intervalo = setInterval(() => {
            tiempoRestante--;
            document.getElementById('tiempo').textContent = formatearTiempo(tiempoRestante);

            if (tiempoRestante <= 0) {
                detenerCronometro();
                sonido.play(); // Reproduce sonido
                alert('¡Tiempo finalizado!');
            }
        }, 1000);
    }
}

function detenerCronometro() {
    clearInterval(intervalo);
    intervalo = null;
    liberarWakeLock(); // Permitir que la pantalla se apague después de detener el cronómetro
}

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}