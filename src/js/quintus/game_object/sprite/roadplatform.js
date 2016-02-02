module.exports = function (Q) {
  
  Q.Sprite.extend('RoadPlatform', {

    init: function (p) {
      this._super(p, {
        w: 400,
        h: 1,
        type: Q.SPRITE_DEFAULT,
        collisionMask: Q.SPRITE_ACTIVE
      });

      this.add('2d');
    }

  });

};