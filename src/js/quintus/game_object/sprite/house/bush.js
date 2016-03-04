module.exports = function (Q) {

  Q.SPRITE_BUSH = 8;

  Q.Sprite.extend('Bush', {

    init: function (p) {
      this._super(p, {
        sheet: Math.random() < 0.5 ? 'firstbush' : 'secondbush',
        type: Q.SPRITE_BUSH,
        hitType: 'HOUSE',
        frame: 0
      });
    },

  });

};
