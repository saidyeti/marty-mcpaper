module.exports = function (Q) {

  Q.Sprite.extend('Paper', {

    init: function (p) {
      this._super(p, {
        sprite: 'paper',
        sheet: 'paper',
        frame: 0,
        collisionMask: null
      });

      this.add('2d, tween');
    }

  });

};
