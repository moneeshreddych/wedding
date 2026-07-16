const weddingDate = new Date(2026, 7, 23, 7, 30, 0).getTime();

// Cache DOM elements to avoid repeating queries within the 1-second interval loop
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownEl = document.querySelector(".countdown");

// Pre-calculate constants to avoid math operations every second
const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
        if (countdownEl) {
            countdownEl.innerHTML = "<h2>Today is Our Wedding Day!</h2>";
        }
        if (typeof countdownInterval !== 'undefined') {
            clearInterval(countdownInterval);
        }
        return;
    }

    const days = Math.floor(distance / MS_PER_DAY);
    const hours = Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR);
    const minutes = Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

// Initial call to avoid delay
updateCountdown();

// Store interval reference for clearability
const countdownInterval = setInterval(updateCountdown, 1000);

// Lock dynamic viewport height for mobile browsers to prevent scroll-repaint jank
function lockMobileViewportHeight() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Calculate on load
window.addEventListener('DOMContentLoaded', lockMobileViewportHeight);

// Re-calculate only when viewport width triggers real changes (e.g. orientation swap)
let viewportWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== viewportWidth) {
        viewportWidth = currentWidth;
        lockMobileViewportHeight();
    }
});