module.exports = function (Quintus) {
  
  Quintus.AudioExtras = function (Q) {

    if (!Q.audio) {
      throw new Error('Error: Quintus Audio module must be included before AudioExtras.');
    }

    Q.audio.playAny = function (filenames) {
      var randomChoiceIndex = Math.floor(Math.random() * filenames.length);
      Q.audio.play(filenames[randomChoiceIndex]);
    };

  };

};
