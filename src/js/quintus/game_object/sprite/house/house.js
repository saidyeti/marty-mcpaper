module.exports = function (Q) {

  Q.SPRITE_HOUSE = 8;

  Q.Sprite.extend('House', {

    init: function (p, defaults) {
      var sheet = Q.sheet(defaults.sheet);
      var tileW = sheet.tileW;
      var tileH = sheet.tileH;
      var leftMargin = defaults.leftMargin;
      var rightMargin = defaults.rightMargin;
      this._super(p, Q._extend({
        frame: Math.floor(Math.random() * defaults.frameTotal),
        type: Q.SPRITE_HOUSE,
        hitType: 'HOUSE',
        y: p.baseY - sheet.tileH * p.scale / 2,
        points: [
          [-tileW / 2 + leftMargin, -tileH / 2],
          [tileW / 2 - rightMargin, -tileH / 2],
          [tileW / 2 - rightMargin, tileH / 2],
          [-tileW / 2 + leftMargin, tileH / 2]
        ]
      }, defaults));
    },

    setupChildren: function () {
      var p = this.p;
      var windowHeight = Q.sheet('window').tileH;
      var y = p.cy + p.bottomWindowBuffer - windowHeight / 2;

      p.windowXLocations.forEach(function (x) {
        this.stage.insert(new Q.Window({
          x: x,
          y: y,
          z: p.z + 1,
          scale: 0.77,
          gravity: 0,
          collisionMask: null
        }), this);
      }, this);

      var doorClassName = p.doorSheet === 'skinnydoor' ? 'SkinnyDoor' : 'Door';
      this.stage.insert(new Q[doorClassName]({
        x: p.doorXLocation,
        y: p.cy + p.bottomDoorBuffer - Q.sheet(p.doorSheet).tileH * p.scale / 2,
        z: p.z + 1,
        gravity: 0,
        collisionMask: null
      }), this);
    }

  });

  Q.House.descendantClassNames = ['Phil', 'Barbie', 'Basic', 'Snow', 'Rocko'];

};
