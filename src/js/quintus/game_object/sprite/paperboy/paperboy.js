module.exports = function (Q) {

  Q.SPRITE_PAPERBOY = 128;

  Q.Sprite.extend('PaperBoy', {

    init: function (p) {
      this._super(p, {
        points: [
          [-70, -324],
          [20, -324],
          [20, -180],
          [140, -180],
          [140, -80],
          [294, 40],
          [294, 146],
          [224, 216],
          [120, 216],
          [60, 170],
          [-60, 170],
          [-120, 216],
          [-217, 216],
          [-287, 146],
          [-287, 40],
          [-170, -80],
          [-170, -240],
          [-70, -324]
        ],
        type: Q.SPRITE_PAPERBOY,
        collisionMask: Q.SPRITE_ROAD_PLATFORM,
        disableControls: false
      });

      this.add('2d, jumpControls');

      this.on('jump');
    },

    setupChildren: function () {
      var stage = this.stage;

      stage.insert(new Q.Arm({
        scale: 0.9,
        x: 15,
        y: -181,
        gravity: 0,
        collisionMask: null
      }), this);

      stage.insert(new Q.Leg({
        scale: 0.82,
        x: -30,
        y: 5,
        gravity: 0,
        collisionMask: null,
        startAtTop: true
      }), this);

      stage.insert(new Q.Wheel({
        x: -165,
        y: 95,
        gravity: 0,
        collisionMask: null
      }), this);

      stage.insert(new Q.Wheel({
        x: 172,
        y: 95,
        gravity: 0,
        collisionMask: null
      }), this);
    
      stage.insert(new Q.Bicycle({
        gravity: 0,
        collisionMask: null
      }), this);

      stage.insert(new Q.Leg({
        scale: 0.82,
        x: -30,
        y: 5,
        gravity: 0,
        collisionMask: null,
        startAtTop: false
      }), this);

      var torso = stage.insert(new Q.Torso({
        scale: 0.9,
        y: -230,
        x: -30,
        gravity: 0,
        collisionMask: null
      }), this);

      torso.on('paperthrown', this, 'sendPaperFlying');

      Q.input.on('fire', this, function () {
        if (!this.p.disableControls) {
          torso.fetchPaper();
        }
      });
    },

    jump: function () {
      if (this.p.disableControls) {
        return;
      }
      console.log('paperboy jump!');
      this.p.vy = -400;
      this.p.gravity = true;
    },

    move: function () {
      this.children.forEach(function (child) {
        child.trigger('move');
      });
    },

    disableControls: function () {
      this.p.disableControls = true;
    },

    enableControls: function () {
      this.p.disableControls = false;
    },

    sendPaperFlying: function () {
      var paper = this.stage.insert(new Q.Paper({
        x: this.p.x + 32,
        y: this.p.y - 186,
        vx: this.p.vx,
        scale: 0.45,
        angle: 75,
        z: this.p.z - 1
      }));
      var angleOfRotation = -360 * Math.floor(1 + Math.random() * 0.25);
      paper.animate({
        y: paper.p.y,
        angle: angleOfRotation,
        scale: paper.p.scale * 0.5,
        vx: 0
      }, 0.4, {
        callback: function () {
          var hitObject = this.stage.locate(paper.p.x, paper.p.y, Q.SPRITE_DOOR);
          if (!hitObject) {
            hitObject = this.stage.locate(paper.p.x, paper.p.y, Q.SPRITE_WINDOW);
          }
          if (!hitObject) {
            hitObject = this.stage.locate(paper.p.x, paper.p.y, Q.SPRITE_HOUSE);
          }
          if (hitObject) {
            paper.stopMoving();
            hitObject.trigger('delivery');
            if (hitObject.p.hitType && hitObject.p.hitType === 'HOUSE') {
              Q.state.inc('score', 25);
              Q.audio.play('success2.mp3');
            } else if (hitObject.p.hitType && hitObject.p.hitType === 'WINDOW') {
              Q.state.inc('score', -25);
            } else if (hitObject.p.hitType && hitObject.p.hitType === 'DOOR') {
              Q.state.inc('score', 50);
              Q.audio.play('success1.mp3');
              this.stage.remove(paper);
            }
          } else {
            this.stage.remove(paper);
          }
        }
      });
    }

  });

};
