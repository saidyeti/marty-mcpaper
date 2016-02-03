/* jumpControls - based on platformerControls, but only for
 * jumping (no sideways movement controls included).
 * Assumes externally-determined x/y movement (e.g., a runner).
 */
module.exports = function (Q) {

  Q.component('jumpControls', {

    step: function (dt) {
      var p = this.entity.p;

      if (p.ignoreControls === undefined || !p.ignoreControls) {
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
