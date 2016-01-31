module.exports = function (Q) {

  Q.scene('route', function (stage) {

    var paperboy = stage.insert(new Q.PaperBoy({
      x: 400,
      y: 200,
      gravity: 0,
      collisionMask: null
    }));
    stage.add('viewport');//.follow(paperboy, { x: true, y: false });

    var wheel1 = stage.insert(new Q.Wheel({
      x: -165,
      y: 95,
      gravity: 0,
      collisionMask: null
    }), paperboy);

    var wheel2 = stage.insert(new Q.Wheel({
      x: 172,
      y: 95,
      gravity: 0,
      collisionMask: null
    }), paperboy);
  
    var bicycle = stage.insert(new Q.Bicycle({
      //scale: 0.5,
      gravity: 0,
      collisionMask: null
    }), paperboy);

    wheel1.play('rotate');
    wheel2.play('rotate');

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
