const svg = document.getElementById('suisse');

// --- Tooltip Logic ---
const tooltip = document.createElement('div');
tooltip.className = 'map-tooltip';
document.body.appendChild(tooltip);

if (svg) {
  svg.querySelectorAll('path').forEach(canton => {
    // Click on map
    canton.addEventListener('click', () => {
      const codeCanton = canton.id.toUpperCase();
      window.location.href = `countdown.html?canton=${codeCanton}`;
    });

    // Hover tooltip
    canton.addEventListener('mouseenter', (e) => {
      tooltip.textContent = canton.getAttribute('title');
      tooltip.style.opacity = '1';
    });

    canton.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY + 'px';
    });

    canton.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}

// --- Mobile Select Logic ---
const cantonSelect = document.getElementById('cantonSelect');
const btnMobileGo = document.getElementById('btnMobileGo');

if (cantonSelect && btnMobileGo) {
  // Disable button initially
  btnMobileGo.disabled = true;

  cantonSelect.addEventListener('change', () => {
    btnMobileGo.disabled = !cantonSelect.value;
  });

  btnMobileGo.addEventListener('click', () => {
    if (cantonSelect.value) {
      window.location.href = `countdown.html?canton=${cantonSelect.value}`;
    }
  });
}
