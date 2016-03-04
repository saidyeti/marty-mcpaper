module.exports = function (Q) {

  Q.SPRITE_DOOR = 2;

  Q.Sprite.extend('Door', {

    init: function (p, defaults) {
      this._super(p, Q._extend({
        sheet: 'door',
        type: Q.SPRITE_DOOR,
        hitType: 'DOOR',
        frame: 0
      }, defaults));

      this.on('delivery', this, 'bust');
    },

    bust: function () {
      this.p.frame = 1;

      var puff = this.stage.insert(new Q.Puff({
        z: this.p.z + 1
      }), this);

      puff.on('dissipated', this, function () {
        this.stage.remove(puff);
      });

      puff.play('boom');

      Q.audio.play('door_crash.mp3');
    }

  });

  Q.Door.extend('SkinnyDoor', {

    init: function (p) {
      this._super(p, {
        sheet: 'skinnydoor'
      });
    }

  });

  Q.Sprite.extend('Puff', {

    init: function (p) {
      this._super(p, {
        sprite: 'puff',
        sheet: 'puff',
        frame: 0
      });

      this.add('animation');
    }

  });

  Q.animations('puff', {
    boom: {
      frames: [0, 1, 2],
      rate: 1/9,
      loop: false,
      trigger: 'dissipated'
    }
  });

};
