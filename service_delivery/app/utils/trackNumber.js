function generateTrackNumber() {
  const prefix = 'DLV';
  const random = Math.floor(100000 + Math.random() * 900000); // 6 цифр
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${random}-${timestamp}`;
}

module.exports = { generateTrackNumber };
