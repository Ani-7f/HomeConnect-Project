document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navList = document.getElementById('navList');

    hamburgerMenu.addEventListener('click', function() {
        navList.classList.toggle('show'); // Toggle the visibility of the nav list
        this.classList.toggle('active'); // Optional: Change style of hamburger icon
    });

    // Close menu if clicked outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navList.classList.contains('show')) {
            navList.classList.remove('show');
            hamburgerMenu.classList.remove('active');
        }
    });
});
