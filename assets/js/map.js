const svg = document.getElementById('suisse');

svg.querySelectorAll('path').forEach(canton => {
  canton.addEventListener('click', () => {
    const codeCanton = canton.id.toUpperCase();

    window.location.href = `countdown.html?canton=${codeCanton}`;
  });
});
