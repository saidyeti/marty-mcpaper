module.exports = function (Q) {

  Q.scene('route', function (stage) {

    var paperboy = stage.insert(new Q.PaperBoy({
      scale: 0.5,
      x: 50,
      y: 440,
      vx: 500,
      gravity: 0,
      collisionMask: null
    }));
    paperboy.setupChildren();
    stage.add('viewport').follow(paperboy, { x: true, y: false });

    paperboy.move();

  });


};
