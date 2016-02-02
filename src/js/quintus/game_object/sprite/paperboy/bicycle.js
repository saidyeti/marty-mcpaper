module.exports = function (Q) {

  Q.Sprite.extend('Bicycle', {

    init: function (p) {
      this._super(p, {
        sprite: 'bikeframe',
        sheet: 'bikeframe',
        frame: 0
      });

      this.add('2d');
    }

  });

};
