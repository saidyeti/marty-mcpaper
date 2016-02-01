module.exports = function (Q) {

  Q.scene('route', function (stage) {

    var paperboy = stage.insert(new Q.PaperBoy({
      scale: 0.5,
      x: 50,
      y: 440,
      vx: 400,
      gravity: 0,
      collisionMask: null,
      z: 2
    }));
    paperboy.setupChildren();
    stage.add('viewport').follow(paperboy, { x: true, y: false });
    stage.viewport.offset(-200, 0);

    paperboy.move();

    var houseQueue = [];

    stage.on('prestep', stage, function (dt) {
      var houses = Q('House');
      houseQueue.forEach(function (house, index) {
        if (house.p.x < paperboy.p.x - Q.width) {
          stage.remove(house);
          houseQueue.splice(index, 1);
        }
      });
      var entryPoint = paperboy.p.x + 1300;
      var lastHouse = houseQueue[houseQueue.length - 1];
      while (!lastHouse || lastHouse.p.x + lastHouse.p.w < entryPoint) {
        var house = stage.insert(new Q.House({
          scale: 0.5,
          gravity: 0,
          collisionMask: null,
          x: lastHouse ? lastHouse.p.x + 500 : entryPoint,
          y: 225,
          z: -2
        }));
        houseQueue.push(house);
        lastHouse = house;
      }
    });

  });


};
