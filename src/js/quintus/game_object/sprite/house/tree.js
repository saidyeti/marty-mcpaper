module.exports = function (Q) {

  Q.SPRITE_TREE = 8;

  Q.Sprite.extend('Tree', {

    init: function (p) {
      this._super(p, {
        sheet: 'tree',
        type: Q.SPRITE_TREE,
        hitType: 'HOUSE',
        frame: 0
      });
    },

  });

};
