module.exports = function (Q) {

  Q.Sprite.extend('PaperBoy', {

    init: function (p) {
      this._super(p);

      this.add('2d, jumpControls');

      Q.input.on('jump', this, 'jump');
    },

    setupChildren: function () {
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
    },

    jump: function () {
      console.log('paperboy jump!');
    },

    move: function () {
      this.children.forEach(function (child) {
        child.trigger('move');
      });
    },

    sendPaperFlying: function () {
      console.log('send paper flying!');
    }

  });

};
