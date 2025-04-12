import QRCode from 'qrcode';
QRCode.toFile('public/assets/qr-code.png', 'https://scantext.z36.web.core.windows.net/', {
  color: { dark: '#000000', light: '#ffffff' },
});