module.exports = function (Q) {

  var houseBaselineMark = 330;
  var roadBaselineMark = 548;

  Q.scene('route', function (stage) {

    var countdown = Q.addTimer('countdown', 90, { force: true });
    countdown.onEnd(function () {
      var restartPromptTimer = Q.getTimer('restartPrompt');
      restartPromptTimer.reset();
      restartPromptTimer.start();
    });

    stage.insert(new Q.RoadPlatform({
      x: Q.width / 2,
      y: roadBaselineMark,
      vx: 360,
      gravity: 0
    }));

    var paperboy = stage.insert(new Q.PaperBoy({
      scale: 0.5,
      x: 50,
      y: 440,
      vx: 360,
      gravity: 0,
      z: 2
    }));
    paperboy.setupChildren();
    stage.add('viewport').follow(paperboy, { x: true, y: false });
    stage.viewport.offset(-170, 0);

    paperboy.move();

    countdown.onEnd(function () {
      paperboy.disableControls();
    });
    countdown.start();

    var houseQueue = [];

    stage.on('prestep', stage, function (dt) {
      var removalMark = paperboy.p.x - Q.width / 2;
      
      Q('Paper').each(function () {
        var paper = this;
        if (paper.p.y > houseBaselineMark) {
          /* removes gravitational physics to simulate
           * hitting the ground... simpler than adding
           * an invisible platform unnecessarily.
           */
          paper.del('2d');
        }
        if (paper.p.sx + paper.p.w < removalMark) {
          stage.remove(paper);
        }
      });

      var houses = Q('House');
      houseQueue.forEach(function (house, index) {
        if (house.p.sx + house.p.w < removalMark) {
          stage.remove(house);
          houseQueue.splice(index, 1);
        }
      });
      var entryPoint = paperboy.p.x + 1300;
      var lastHouse = houseQueue[houseQueue.length - 1];
      while (!lastHouse || lastHouse.p.x + lastHouse.p.w < entryPoint) {
        var houseClassNames = Q.House.descendantClassNames;
        var numClasses = houseClassNames.length;
        var className = houseClassNames[Math.floor(Math.random() * numClasses)];
        var house = stage.insert(new Q[className]({
          scale: 0.5,
          gravity: 0,
          collisionMask: null,
          x: lastHouse ? lastHouse.p.x + 600 : entryPoint,
          baseY: houseBaselineMark,
          z: -4
        }));
        house.setupChildren();
        houseQueue.push(house);
        lastHouse = house;
      }
    });

  });


};
