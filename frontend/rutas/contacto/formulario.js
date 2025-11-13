document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form-contacto');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío por defecto

        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones
        if (nombre.length < 3) {
            alert('Por favor, ingresa un nombre válido (mínimo 3 caracteres)');
            return;
        }

        if (!validarCorreo(correo)) {
            alert('Por favor, ingresa un correo electrónico válido');
            return;
        }

        if (!validarTelefono(telefono)) {
            alert('Por favor, ingresa un número de teléfono válido (9 dígitos)');
            return;
        }

        if (mensaje.length < 10) {
            alert('Por favor, ingresa un mensaje más detallado (mínimo 10 caracteres)');
            return;
        }

        // Si todas las validaciones pasan, mostrar mensaje de éxito
        mostrarMensajeExito();
        
        // Limpiar el formulario
        formulario.reset();
    });
});

// Función para validar el formato del correo
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Función para validar el teléfono
function validarTelefono(telefono) {
    const regex = /^9\d{8}$/; // Debe comenzar con 9 y tener 9 dígitos en total
    return regex.test(telefono);
}

// Función para mostrar mensaje de éxito
function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.textContent = '¡Gracias por contactarnos! Nos comunicaremos contigo pronto.';
    
    // Estilos para el mensaje
    mensaje.style.backgroundColor = '#4CAF50';
    mensaje.style.color = 'white';
    mensaje.style.padding = '15px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.zIndex = '1000';
    
    document.body.appendChild(mensaje);
    
    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}
