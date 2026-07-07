const ticker = document.getElementById('cert-ticker');

if (ticker) {

  const items = ticker.querySelectorAll('.ticker-item');
  const itemWidth = 350 + 16;
  const totalWidth = items.length / 2 * itemWidth;

  ticker.style.animation = `scroll ${totalWidth / 50}s linear infinite`;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalWidth}px); }
    }
  `;

  document.head.appendChild(style);

}

document.querySelectorAll(".lazy-image").forEach(img => {

  function finishLoading() {
    img.classList.add("loaded");
  }

  if (img.complete) {
    finishLoading();
  } else {
    img.addEventListener("load", finishLoading);
  }

});
