// Click to select address text
document.querySelectorAll('.ctc').forEach((el) => {
  el.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });
});

// More icon -> show QR logic
const moreIcons = document.querySelectorAll('.more-icon');
const qrPopup = document.getElementById('qr-popup');
const qrOverlay = document.getElementById('popup-overlay');
const qrCodeDiv = document.getElementById('qr-code');
const qrClose = document.getElementById('qr-close');

moreIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    const row = icon.closest('.icon-row');
    const address = row.dataset.address;

    // Clear previous canvas
    qrCodeDiv.innerHTML = '';

    // Generate new QR
    QRCode.toCanvas(
      address,
      {
        width: 220,
        margin: 2,
        color: {
          dark: '#05002b',
          light: '#ffffff',
        },
      },
      function (err, canvas) {
        if (err) console.error(err);
        qrCodeDiv.appendChild(canvas);
      }
    );

    // Show popup and overlay
    qrPopup.style.display = 'block';
    qrOverlay.style.display = 'block';

    // Trigger animation via class on next frame
    setTimeout(() => {
      qrPopup.classList.add('active');
      qrOverlay.classList.add('active');
    }, 10);
  });
});

// Close functionality
const closeQR = () => {
  qrPopup.classList.remove('active');
  qrOverlay.classList.remove('active');

  // Wait for animation to finish (0.3s) before removing from display
  setTimeout(() => {
    qrPopup.style.display = 'none';
    qrOverlay.style.display = 'none';
  }, 300);
};

qrClose.addEventListener('click', closeQR);
qrOverlay.addEventListener('click', closeQR);