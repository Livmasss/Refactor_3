function generateTrackNumber() {
  console.log('Generating trackNumber!');
  const prefix = 'DLV';
  const random = Math.floor(100000 + Math.random() * 900000); // 6 цифр
  const timestamp = Date.now().toString().slice(-4);
  const result = `${prefix}-${random}-${timestamp}`

  console.log('Track number generated:', result);
  return result;
}

module.exports = { generateTrackNumber };
