module.exports = function (Q) {

  Q.Sprite.extend('Wheel', {

    init: function (p) {
      this._super(p, {
        sprite: 'wheel',
        sheet: 'wheel'
      });

      this.add('2d, tween');
    },

    rotate: function () {
      this.animate({ angle: 360 }, 1.25, {
        callback: function (wheel) {
          wheel.rotate();
        }
      });
    }

  });

};
