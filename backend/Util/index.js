module.exports.studentPass = (length) => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz1234567890_[]{}()";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
