function sendMail() {
    // Ottieni i valori dal form
    let params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Riferimenti agli elementi del form
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('i');
    
    // Mostra stato di caricamento
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'loading-spinner';
    formMessage.style.display = 'none';
    
    // Invia l'email usando EmailJS
    emailjs.send('service_cjg1imr', 'template_z5ormrc', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Mostra messaggio di successo
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.style.display = 'block';
            
            // Reset del form
            document.getElementById('contactForm').reset();
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Mostra messaggio di errore
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
            formMessage.style.display = 'block';
        })
        .finally(function() {
            // Ripristina lo stato del bottone
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        });
}

// Event listener per il form
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        sendMail();
    });
});