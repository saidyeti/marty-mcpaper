module.exports = function (Q) {

  Q.scene('route', function (stage) {
    var paperboy = stage.insert(new Q.PaperBoy());
    stage.add('viewport').follow(paperboy);
  });

};
