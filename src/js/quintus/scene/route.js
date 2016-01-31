module.exports = function (Q) {

  Q.scene('route', function (stage) {

    var paperboy = stage.insert(new Q.PaperBoy({
      scale: 0.4,
      x: 50,
      y: 330,
      vx: 500,
      gravity: 0,
      collisionMask: null
    }));
    paperboy.setupChildren(stage);
    stage.add('viewport').follow(paperboy, { x: true, y: false });

    paperboy.move();

  });


  Q.scene('hud', function(stage){

    var score = stage.insert(new Q.Score({
      x: 700,
      y: 40,
    }));
    var lives = stage.insert(new Q.Lives({
      x: 700,
      y: 70,
    }));
    var label = stage.insert(new Q.UI.Text({
      x: 400,
      y: 10,
      label: stage.options.label
    }));

  });

};
