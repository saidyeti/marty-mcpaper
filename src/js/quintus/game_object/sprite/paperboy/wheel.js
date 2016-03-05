module.exports = function (Q) {

  Q.Sprite.extend('Wheel', {

    init: function (p) {
      this._super(p, {
        sprite: 'wheel',
        sheet: 'wheel',
        frame: 0,
        /*
        points: [
          [-50, -122],
          [50, -122],
          [122, -50],
          [122, 50],
          [50, 122],
          [-50, 122],
          [-122, 50],
          [-122, -50],
          [-50, -122]
        ],
        */
      });

      this.add('2d, animation');

      this.on('move');
    },

    move: function () {
      this.play('rotate');
    }

  });

  Q.animations('wheel', {
    rotate: {
      frames: [0, 1, 2],
      rate: 1/24
    }
  });

};
