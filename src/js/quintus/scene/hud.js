module.exports = function (Q) {
  
  Q.scene('hud', function (stage) {

   var score = stage.insert(new Q.Score({
      x: 700,
      y: 40,
    }));
    var lives = stage.insert(new Q.Lives({
      x: 700,
      y: 70,
    }));
    var countdown = stage.insert(new Q.Countdown({
      x: 700,
      y: 500,
    }));
    var label = stage.insert(new Q.UI.Text({
      x: 400,
      y: 10,
      label: stage.options.label,
    
    }));


  });

};

