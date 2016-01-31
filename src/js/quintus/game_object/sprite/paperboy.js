module.exports = function (Q) {

  Q.Sprite.extend('PaperBoy', {

    init: function (p) {
      this._super(p);

      this.add('2d, jumpControls');

      Q.input.on('jump', this, 'jump');
    },

    setupChildren: function () {
      var stage = this.stage;
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
    },

    jump: function () {
      console.log('paperboy jump!');
    },

    move: function () {
      this.children.forEach(function (child) {
        child.trigger('move');
      });
    },

    sendPaperFlying: function () {
      console.log('send paper flying!');
    },

    step: function (dt) {
      /*
      this.p.vx += dt * this.p.ax;
      this.p.vy += dt * this.p.ay;

      this.p.x += this.p.vx * dt;
      this.p.y += this.p.vy * dt;

      this.stage.collide(this);
      */
    }

  });

  Q.animations('player', {
    /*
    run_right: { frames: [7,6,5,4,3,2,1], rate: 1/15}, 
    run_left: { frames: [19,18,17,16,15], rate:1/15 },
    fire_right: { frames: [9,10,10], next: 'stand_right', rate: 1/30, trigger: "fired" },
    fire_left: { frames: [20,21,21], next: 'stand_left', rate: 1/30, trigger: "fired" },
    stand_right: { frames: [8], rate: 1/5 },
    stand_left: { frames: [20], rate: 1/5 },
    fall_right: { frames: [2], loop: false },
    fall_left: { frames: [14], loop: false }
    */
  });

};

/*
//ANIMATION EXAMPLE

var sprite = new Q.Sprite({ asset: "image.png",
                            x:0, y:0, angle: 0 });
sprite.add("tween");

sprite.animate({ x: 500, y: 500, angle: 360 });




Q.Sprite.extend("Player", {
  init: function(p) {
    this._super(p,{
      sprite: "player",
      sheet: "player"
    });

    this.add("2d, platformerControls, animation");

    Q.input.on("fire");

    // Wait until the firing animation has played until
    // actually launching the bullet
    this.on("fired",this,"launchBullet");
  },

  fire: function() {
    // Play the fire animation at a higher priority
    if(this.p.direction > 0) {
      this.play("fire_right",1);
    } else {
      this.play("fire_left",1);
    }
  },

  launchBullet: function() {
    var bullet = new Q.Bullet({  ... });
    this.stage.insert(bullet);
  },

  step: function(dt) {
    if(this.p.vx > 0) {
      this.play("run_right");
    } else if(this.p.vx < 0) {
      this.play("run_left");
    } else {
      this.play("stand_" + this.p.direction > 0 ? "right" : "left");
    }
  }
});

*/