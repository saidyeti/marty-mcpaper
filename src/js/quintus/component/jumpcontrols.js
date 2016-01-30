/* jumpControls - based on platformerControls, but only for
 * jumping (no sideways movement controls included)
 */
module.exports = function (Q) {

  Q.component('jumpControls', {

    step: function (dt) {
      /* Modification of step method from Input module's platformerControls,
       * ignoring all left/right input.
       */

      var p = this.entity.p;

      if (!p.ignoreControls) {
        var collision = null;

        // Follow along the current slope, if possible.
        if (p.collisions !== undefined && p.collisions.length > 0 && p.landed > 0) {
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

        if (collision && p.landed > 0) {
          p.vy = 0;
        }

        if (p.landed > 0 && Q.inputs['jump'] && !p.jumping) {
          p.vy = p.jumpSpeed;
          p.landed = -dt;
          p.jumping = true;
        } else if (Q.inputs['jump']) {
          this.entity.trigger('jump', this.entity);
          p.jumping = true;
        }

        if (p.jumping && !Q.inputs['jump']) {
          p.jumping = false;
          this.entity.trigger('jumped', this.entity);
          if (p.vy < p.jumpSpeed / 3) {
            p.vy = p.jumpSpeed / 3;
          }
        }
      }
      p.landed -= dt;
    }

  }, 'platformerControls');

};
