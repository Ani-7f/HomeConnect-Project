function viewBrochure(button) {
    const card = button.parentElement;
    const image = card.querySelector('.brochure-image');

    // Toggle enlarged class on image
    if (card.classList.contains('enlarged')) {
        card.classList.remove('enlarged');
        button.textContent = "View Brochure";
        image.style.transform = "scale(1)";
    } else {
        card.classList.add('enlarged');
        button.textContent = "Close Brochure";
        image.style.transform = "scale(1.5)";
    }
}
