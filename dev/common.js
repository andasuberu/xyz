// Theme toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.innerHTML = `
  <img id="theme-icon" src="" alt="theme icon" />
  <span id="theme-label"></span>
`;

const icon = document.getElementById('theme-icon');
const label = document.getElementById('theme-label');

function updateButtonLabel() {
  if (body.classList.contains('dark-mode')) {
    icon.src = 'dark_mode.svg';
    label.textContent = 'Lights Off';
  } else {
    icon.src = 'light_mode.svg';
    label.textContent = 'Lights On';
  }
}

const savedTheme = localStorage.getItem('theme');

// Body already starts in dark mode.
// Only remove the class if the user chose light mode.
if (savedTheme === 'light') {
  body.classList.remove('dark-mode');
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  localStorage.setItem(
    'theme',
    body.classList.contains('dark-mode') ? 'dark' : 'light'
  );

  updateButtonLabel();
});

updateButtonLabel();


// Local time
function updateLocalTime() {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const now = new Date().toLocaleTimeString('en-US', options);

  const pill = document.getElementById('time-pill');
  if (pill) pill.textContent = now;

  const local = document.getElementById('local-time');
  if (local) local.textContent = `(${now} UTC+1)`;
}

updateLocalTime();
setInterval(updateLocalTime, 60000);


// Logo animation
const logo = document.getElementById("logo-text");

if (logo) {

  const finalText = "Anda Suberu";
  const shortText = "A/-S";
  const shortHTML = 'A<span class="logo-separator">/-</span>S';

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*+-_";

  let animating = false;
  let resetTimeout;

  function scrambleTo(target) {

    if (animating) return;

    animating = true;
    let iteration = 0;

    const interval = setInterval(() => {

      logo.textContent = target
        .split("")
        .map((letter, index) => {

          if (index < iteration) return target[index];
          if (letter === " ") return " ";

          return chars[Math.floor(Math.random() * chars.length)];

        })
        .join("");

      iteration += 1 / 3;

      if (iteration >= target.length) {

        clearInterval(interval);

        if (target === shortText) {
          logo.innerHTML = shortHTML;
        } else {
          logo.textContent = target;
        }

        animating = false;
      }

    }, 30);
  }

  logo.addEventListener("mouseenter", () => {

    clearTimeout(resetTimeout);

    if (animating) return;
    if (logo.textContent === finalText) return;

    scrambleTo(finalText);

  });

  logo.addEventListener("mouseleave", () => {

    clearTimeout(resetTimeout);

    resetTimeout = setTimeout(() => {

      if (animating) return;
      if (logo.textContent === shortText) return;

      scrambleTo(shortText);

    }, 3000);

  });

}