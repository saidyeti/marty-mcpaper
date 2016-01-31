module.exports = function (Q) {

  Q.Sprite.extend('Wheel', {

    init: function (p) {
      this._super(p, {
        sprite: 'wheel',
        sheet: 'wheel',
        frame: 0
      });

      this.add('2d, animation');
    }

  });

  Q.animations('wheel', {
    rotate: {
      frames: [0, 1, 2],
      rate: 1/24
    }
  });

};
