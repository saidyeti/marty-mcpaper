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
      Q.audio.playAny([
        'window_shatter_01.mp3',
        'window_shatter_02.mp3',
        'window_shatter_03.mp3'
      ]);
    }

  });

  Q.animations('window', {
    shatter: {
      frames: [1, 2, 3, 4],
      rate: 1/6,
      loop: false
    }
  });

};
