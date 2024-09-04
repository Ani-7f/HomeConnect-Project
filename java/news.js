// JavaScript for FAQ Toggle
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const isVisible = answer.style.display === 'block';
        
        // Hide all answers
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
        
        // Show the clicked answer
        if (!isVisible) {
            answer.style.display = 'block';
        }
    });
});


// events.js
function toggleDetails(eventId, event) {
    event.preventDefault(); // Prevent the default link action (scrolling to top)
    
    var details = document.getElementById(eventId);
    if (details.style.display === 'block') {
        details.style.display = 'none';
    } else {
        // Hide all event details
        document.querySelectorAll('.event-detail').forEach(el => {
            el.style.display = 'none';
        });
        details.style.display = 'block';
        
        // Scroll smoothly to the event details section
        details.scrollIntoView({ behavior: 'smooth' });
    }
}
