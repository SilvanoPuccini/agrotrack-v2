// Cargar contactos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarContactos();
});

// Manejar envío del formulario
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    try {
        const response = await fetch('/api/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, mensaje })
        });
        
        const data = await response.json();
        
        const mensajeDiv = document.getElementById('mensaje-respuesta');
        
        if (data.error) {
            mensajeDiv.className = 'error';
            mensajeDiv.textContent = data.mensaje;
        } else {
            mensajeDiv.className = 'exito';
            mensajeDiv.textContent = '✅ Mensaje enviado correctamente';
            document.getElementById('contactForm').reset();
            cargarContactos();
        }
        
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Error:', error);
        const mensajeDiv = document.getElementById('mensaje-respuesta');
        mensajeDiv.className = 'error';
        mensajeDiv.textContent = '❌ Error al enviar el mensaje';
    }
});

// Función para cargar contactos
async function cargarContactos() {
    try {
        const response = await fetch('/api/contactos');
        const data = await response.json();
        
        const listaDiv = document.getElementById('lista-contactos');
        
        if (data.data && data.data.length > 0) {
            listaDiv.innerHTML = data.data.map(contacto => `
                <div class="contacto-item">
                    <strong>${contacto.nombre}</strong> - ${contacto.email}
                    <p>${contacto.mensaje}</p>
                    <small>📅 ${new Date(contacto.fecha).toLocaleString()}</small>
                </div>
            `).join('');
        } else {
            listaDiv.innerHTML = '<p>No hay contactos registrados.</p>';
        }
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('lista-contactos').innerHTML = 
            '<p class="error">Error al cargar contactos</p>';
    }
}
