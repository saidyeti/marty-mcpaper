module.exports = function (Q) {

  Q.Sprite.extend('Arm', {

    init: function (p) {
      this._super(p, {
        sprite: 'arm',
        sheet: 'arm',
        frame: 0
      });

      this.add('2d');
    }

  });

};
