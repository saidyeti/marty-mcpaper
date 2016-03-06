module.exports = function (Q) {
  
  Q.scene('hud', function (stage) {

   var score = stage.insert(new Q.Score({
      x: 700,
      y: 40,
    }));
    /*
    var lives = stage.insert(new Q.Lives({
      x: 700,
      y: 70,
    }));
    */ // skip displaying lives until it actually means something
    var countdown = stage.insert(new Q.Countdown({
      x: 700,
      y: 500,
    }));
    var label = stage.insert(new Q.UI.Text({
      x: 400,
      y: 10,
      label: stage.options.label,
    
    }));

    var pressSpaceToRestart = new Q.UI.Text({
      label: 'PRESS SPACE TO RESTART',
      color: '#fff',
      outlineColor: '#000',
      outlineWidth: '10',
      x: 400,
      y: 200
    });
    pressSpaceToRestart.fontString = 'normal 42pt Bangers';

    stage.on('showRestartPrompt', stage, function () {
      stage.insert(pressSpaceToRestart);
    });

    stage.on('hideRestartPrompt', stage, function () {
      stage.remove(pressSpaceToRestart);
    });
  });

};

