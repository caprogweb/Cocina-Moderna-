// Contador de visitas
let contadorVisitas = localStorage.getItem('contadorVisitas') ? parseInt(localStorage.getItem('contadorVisitas')) : 0;
contadorVisitas++;
localStorage.setItem('contadorVisitas', contadorVisitas);
document.getElementById('contador').innerText = `Visitas: ${contadorVisitas}`;

// Mensaje de bienvenida
let mensajeBienvenida = "¡Bienvenido a nuestra página de cocina mexicana!";
if (contadorVisitas > 1) {
    mensajeBienvenida = "¡Qué bueno verte de nuevo! Gracias por visitarnos otra vez.";
}
document.getElementById('mensaje-bienvenida').innerText = mensajeBienvenida;

//Carrusel de imagenes
let index = 0;

function showNextImage() {
    const carruselItems = document.querySelectorAll('.carrusel-item');
    index = (index + 1) % carruselItems.length;
    carruselItems.forEach((item, i) => {
        item.style.transform = `translateX(${-index * 100}%)`;
    });
}

setInterval(showNextImage, 3000); // Cambia de imagen cada 3 segundos

// Inicializa EmailJS con tu User ID
emailjs.init('lfGTaAleaMUKt8Nm9');  // Reemplaza 'lfGTaAleaMUKt8Nm9' con tu verdadero User ID

// Lógica de envío del formulario
const btn = document.getElementById('button');

//Correo 
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_j8j2aug';

        // Enviar el formulario usando EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('¡Correo enviado con éxito!');
            }, (err) => {
                btn.value = 'Send Email';
                alert('Error al enviar el correo: ' + JSON.stringify(err));
            });
    });