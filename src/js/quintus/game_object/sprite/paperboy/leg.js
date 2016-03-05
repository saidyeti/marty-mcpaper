module.exports = function (Q) {

  Q.Sprite.extend('Leg', {

    init: function (p) {
      this._super(p, {
        sprite: 'leg',
        sheet: 'leg',
        frame: p.startAtTop ? 0 : 4
      });

      this.add('2d, animation');

      this.on('move');

      Q.getTimer('countdown').onEnd(function () {
        this.p.animation = null;
      }.bind(this));
    },

    move: function () {
      this.play(this.p.startAtTop ? 'pedalFromTop' : 'pedalFromBottom');
    }

  });

  Q.animations('leg', {
    pedalFromTop: {
      frames: [0, 1, 2, 3, 4, 5, 6, 7],
      rate: 1/10
    },
    pedalFromBottom: {
      frames: [4, 5, 6, 7, 0, 1, 2, 3],
      rate: 1/10
    }
  });

};
