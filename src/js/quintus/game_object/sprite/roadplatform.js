module.exports = function (Q) {

  Q.SPRITE_ROAD_PLATFORM = 256;
  
  Q.Sprite.extend('RoadPlatform', {

    init: function (p) {
      this._super(p, {
        w: 1200,
        h: 1,
        type: Q.SPRITE_ROAD_PLATFORM,
        collisionMask: Q.SPRITE_PAPERBOY
      });

      this.add('2d');
    }

  });

};