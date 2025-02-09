const QRCode = require('qrcode');
const models = ['200w', '150w', '100w', '50w'];

async function generateQRCodes() {
  try {
    for (const model of models) {
      const url = `https://www.v-tac.eu/fr/projecteurs/faro-led-${model}`;
      await QRCode.toFile(
        `./public/qr-codes/faro-${model}-qrcode.png`,
        url,
        {
          width: 300,
          errorCorrectionLevel: 'H'
        }
      );
      console.log(`QR code généré pour ${model}`);
    }
  } catch (err) {
    console.error('Erreur génération QR codes:', err);
  }
}

generateQRCodes();
