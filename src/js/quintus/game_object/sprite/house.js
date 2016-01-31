module.exports = function (Q) {

  var homeTypes = ['barbie', 'basic', 'phil', 'rocko', 'snow'];
  var frameTotal = 3;

  Q.Sprite.extend('House', {

    init: function (p) {
      var typeChoice = homeTypes[Math.floor(Math.random() * 5)];
      this._super(p, {
        sprite: typeChoice,
        sheet: typeChoice,
        frame: Math.floor(Math.random() * frameTotal),
        z: -1
      });

      this.add('2d');
    },

    setupChildren: function () {
      /*
      var stage = this.stage;
      stage.insert(new Q.Leg({
        scale: 0.82,
        x: -30,
        y: 5,
        gravity: 0,
        collisionMask: null,
        startAtTop: true
      }), this);

      stage.insert(new Q.Wheel({
        x: -165,
        y: 95,
        gravity: 0,
        collisionMask: null
      }), this);

      stage.insert(new Q.Wheel({
        x: 172,
        y: 95,
        gravity: 0,
        collisionMask: null
      }), this);
    
      stage.insert(new Q.Bicycle({
        gravity: 0,
        collisionMask: null
      }), this);

      stage.insert(new Q.Leg({
        scale: 0.82,
        x: -30,
        y: 5,
        gravity: 0,
        collisionMask: null,
        startAtTop: false
      }), this);

      var torso = stage.insert(new Q.Torso({
        scale: 0.9,
        y: -230,
        x: -30,
        gravity: 0,
        collisionMask: null
      }), this);

      torso.on('paperthrown', this, 'sendPaperFlying');
      */
    }

  });

};
