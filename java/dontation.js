// Open the donation popup
function openDonationPopup(panelId) {
    const popup = document.getElementById('donationPopup');
    if (popup) {
        popup.style.display = 'flex';
        popup.setAttribute('data-panel-id', panelId);
    } else {
        console.error('Donation popup element not found');
    }
}

// Close the donation popup
function closeDonationPopup() {
    const popup = document.getElementById('donationPopup');
    if (popup) {
        popup.style.display = 'none';
    } else {
        console.error('Donation popup element not found');
    }
}

// Submit donation
function submitDonation(event) {
    if (event) {
        event.preventDefault(); // Prevent default form submission
    }
    
    const popup = document.getElementById('donationPopup');
    const panelId = popup.getAttribute('data-panel-id');
    let donationAmount = parseFloat(document.getElementById('donationAmount').value);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        console.error('Invalid donation amount');
        return;
    }

    // Divide the donation amount by 2 as a temporary fix
    donationAmount /= 2;

    const donationPanel = document.querySelector(`.donation-panel[data-panel-id='${panelId}']`);
    if (!donationPanel) {
        console.error('Donation panel not found');
        return;
    }

    const goal = parseFloat(donationPanel.getAttribute('data-goal')) || 0;
    let currentRaised = parseFloat(localStorage.getItem(`raised-${panelId}`)) || 0;

    // Debugging
    console.log(`Current raised before donation: R${currentRaised}`);

    currentRaised += donationAmount;

    // Update local storage
    localStorage.setItem(`raised-${panelId}`, currentRaised);

    // Debugging
    console.log(`New raised amount after donation: R${currentRaised}`);

    // Update the UI
    updateDonationPanel(panelId, currentRaised, goal);
    closeDonationPopup();
}

// Update the donation panel UI
function updateDonationPanel(panelId, currentRaised, goal) {
    const raisedAmountElem = document.getElementById(`raised-amount-${panelId}`);
    const progressElem = document.getElementById(`progress-${panelId}`);

    if (raisedAmountElem && progressElem) {
        raisedAmountElem.textContent = `R${currentRaised.toFixed(2)} raised of R${goal.toLocaleString()} goal`;
        const percentage = (currentRaised / goal) * 100;
        progressElem.style.width = `${percentage}%`;
    } else {
        console.error('UI elements for update not found');
    }
}

// Initialize panels with persisted data
function initializePanels() {
    const donationPanels = document.querySelectorAll('.donation-panel');
    donationPanels.forEach((panel) => {
        const panelId = panel.getAttribute('data-panel-id');
        const goal = parseFloat(panel.getAttribute('data-goal')) || 0;
        let currentRaised = parseFloat(localStorage.getItem(`raised-${panelId}`)) || 0;
        updateDonationPanel(panelId, currentRaised, goal);
    });
}

// Initialize donation data on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePanels();

    // Add event listeners only once
    const submitButton = document.querySelector('#donationPopup button');
    const closeButton = document.querySelector('.close-button');

    if (submitButton) {
        submitButton.removeEventListener('click', submitDonation); // Remove any existing listener
        submitButton.addEventListener('click', submitDonation);
    }

    if (closeButton) {
        closeButton.removeEventListener('click', closeDonationPopup); // Remove any existing listener
        closeButton.addEventListener('click', closeDonationPopup);
    }
});
