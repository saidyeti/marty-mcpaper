module.exports = function (Q) {

  Q.SPRITE_WINDOW = 32;

  Q.Sprite.extend('Window', {

    init: function (p) {
      this._super(p, {
        sprite: 'window',
        sheet: 'window',
        type: Q.SPRITE_WINDOW,
        hitType: 'WINDOW',
        frame: 0
      });

      this.add('animation');

      this.on('delivery', this, 'shatter');
    },

    shatter: function () {
      this.play('shatter');
    }

  });

  Q.animations('window', {
    shatter: {
      frames: [0, 1, 2, 3, 4],
      rate: 1/7,
      loop: false
    }
  });

};
