module.exports = function (Q) {

  Q.SPRITE_HOUSE = 8;

  /* tests if two sprites centered at the given x values,
   * with the given width values, will cross the same y axis.
   */
  function testForHorizontalOverlap(x1, w1, x2, w2) {
    var left1 = x1 - w1/2;
    var left2 = x2 - w2/2;
    var right1 = x1 + w1/2;
    var right2 = x2 + w2/2;
    return !(left2 > right1 || right2 < left1);
  }

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
      var windowSheet = Q.sheet('window');
      var windowHeight = windowSheet.tileH;
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

      var doorWidth = Q.sheet(p.doorSheet).tileW;
      var windowWidth = windowSheet.tileW;
      var treeSheet = Q.sheet('tree');
      var treeWidth = treeSheet.tileW;

      // insert no more than 3 trees
      var numberOfTrees = 0;
      for (var i = 0; i < 10 && numberOfTrees < 3; i++) {
        var randomX = Math.floor(Math.random()*p.w) - p.w/2;
        // we're good to go (tentatively) if we don't overlap the door
        var goodToGo = !testForHorizontalOverlap(randomX, treeWidth, p.doorXLocation, doorWidth);
        var windowLocations = p.windowXLocations;
        // we also need to check if we overlap windows
        for (var j = 0, len = windowLocations.length; goodToGo && j < len; j++) {
          var loc = windowLocations[j];
          if (testForHorizontalOverlap(randomX, treeWidth, loc, windowWidth)) {
            goodToGo = false;
          }
        }
        if (goodToGo) {
          this.stage.insert(new Q.Tree({
            x: randomX,
            y: p.h / 2 - Q.sheet('tree').tileH / 2 + 20,
            z: p.z + 2,
            gravity: 0,
            collisionMask: null
          }), this);
          numberOfTrees++;
        }
      }

      var bushWidth = 210; // about right!

      // insert no more than 5 bushes
      var numberOfBushes = 0;
      for (var i = 0; i < 10 && numberOfBushes < 5; i++) {
        var randomX = Math.floor(Math.random()*p.w) - p.w/2;
        // we're good to go if we don't overlap the door
        if (!testForHorizontalOverlap(randomX, bushWidth, p.doorXLocation, doorWidth)) {
          this.stage.insert(new Q.Bush({
            x: randomX,
            y: p.h / 2 - 10,
            z: p.z + 2,
            gravity: 0,
            collisionMask: null
          }), this);
          numberOfBushes++;
        }
      }
    }

  });

  Q.House.descendantClassNames = ['Phil', 'Barbie', 'Basic', 'Snow', 'Rocko'];

};
