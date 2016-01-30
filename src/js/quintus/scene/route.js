module.exports = function (Q) {

  Q.scene('route', function (stage) {
    var paperboy = stage.insert(new Q.PaperBoy());
    stage.add('viewport').follow(paperboy);
    var lives = stage.insert(new Q.Lives());
    var score = stage.insert(new Q.Score());
    console.log(lives, score);
  });

};
