/* jumpControls - based on platformerControls, but only for
 * jumping (no sideways movement controls included)
 */
module.exports = function (Q) {

  Q.component('jumpControls', {
    defaults: {
      jumpSpeed: -300,
      collisions: []
    },

    added: function () {
      var p = this.entity.p;

      Q._defaults(p, this.defaults);

      this.entity.on('step', this, 'step');
      this.entity.on('bump.bottom', this, 'landed');

      p.landed = 0;
      p.direction ='right';
    },

    landed: function (col) {
      var p = this.entity.p;
      p.landed = 1/5;
    },

    // TODO: Implement compontent extension? Also, remove
    // functionality below irrelevant to jumping.
    step: function (dt) {
      var p = this.entity.p;

      if (p.ignoreControls === undefined || !p.ignoreControls) {
        var collision = null;

        // Follow along the current slope, if possible.
        if (p.collisions !== undefined && p.collisions.length > 0 && (Q.inputs['left'] || Q.inputs['right'] || p.landed > 0)) {
          if (p.collisions.length === 1) {
            collision = p.collisions[0];
          } else {
            // If there's more than one possible slope, follow slope with negative Y normal
            collision = null;

            for (var i = 0; i < p.collisions.length; i++) {
              if (p.collisions[i].normalY < 0) {
                collision = p.collisions[i];
              }
            }
          }

          // Don't climb up walls.
          if (collision !== null && collision.normalY > -0.3 && collision.normalY < 0.3) {
            collision = null;
          }
        }

        if (Q.inputs['left']) {
          p.direction = 'left';
          if (collision && p.landed > 0) {
            p.vx = p.speed * collision.normalY;
            p.vy = -p.speed * collision.normalX;
          } else {
            p.vx = -p.speed;
          }
        } else if (Q.inputs['right']) {
          p.direction = 'right';
          if (collision && p.landed > 0) {
            p.vx = -p.speed * collision.normalY;
            p.vy = p.speed * collision.normalX;
          } else {
            p.vx = p.speed;
          }
        } else {
          p.vx = 0;
          if (collision && p.landed > 0) {
            p.vy = 0;
          }
        }

        if (p.landed > 0 && (Q.inputs['up'] || Q.inputs['action']) && !p.jumping) {
          p.vy = p.jumpSpeed;
          p.landed = -dt;
          p.jumping = true;
        } else if (Q.inputs['up'] || Q.inputs['action']) {
          this.entity.trigger('jump', this.entity);
          p.jumping = true;
        }

        if (p.jumping && !(Q.inputs['up'] || Q.inputs['action'])) {
          p.jumping = false;
          this.entity.trigger('jumped', this.entity);
          if (p.vy < p.jumpSpeed / 3) {
            p.vy = p.jumpSpeed / 3;
          }
        }
      }
      p.landed -= dt;
    }
  });

};