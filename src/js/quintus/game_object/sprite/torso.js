module.exports = function (Q) {

  Q.Sprite.extend('Torso', {

    init: function (p) {
      this._super(p, {
        sprite: 'man',
        sheet: 'man',
        frame: 0
      });

      this.add('2d, animation');

      Q.input.on('fire', this, 'throwPaper');
    },

    throwPaper: function () {
      this.play('throwPaper');
    }

  });

  Q.animations('torso', {
    throwPaper: {
      frames: [
        0, 1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 14,
        15, 16
      ],
      rate: 1/24,
      trigger: 'paperthrown',
      next: 'pullArmBack'
    },
    pullArmBack: {
      frames: [17, 18, 0],
      rate: 1/24
    }
  });

};
