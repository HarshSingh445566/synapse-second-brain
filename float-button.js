// float-button.js
if (document.getElementById('synapse-floating-btn')) {
  console.log('[Synapse] Button already exists.');
  return;
}

const btn = document.createElement('div');
btn.id = 'synapse-floating-btn';
btn.textContent = '+';
document.body.appendChild(btn);

console.log('[Synapse] Floating button created.');

btn.addEventListener('click', (e) => {
  e.stopPropagation();
  alert('✅ Synapse is alive!');
});