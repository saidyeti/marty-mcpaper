/* static2d - an extension of the 2d component which
 * prevents the sprite from being bumped around.
 */
module.exports = function (Q) {

  Q.component('static2d', {

    collision: function (col, last) {
      /*
      var x = this.entity.p.x;
      var y = this.entity.p.y;
      var otherX = col.obj.p.x;
      var otherY = col.obj.p.y;
      this._super(col, last);
      this.entity.p.x = x;
      this.entity.p.y = y;
      col.obj.p.x = otherX;
      col.obj.p.y = otherY;
      console.log(col.obj.p.gravity);
      */
      var paperboy = Q('PaperBoy').first();
      var papery = paperboy.p.y;
      var x = this.entity.p.x;
      var y = this.entity.p.y;
      this._super(col, last);
      this.entity.p.x = x;
      this.entity.p.y = y;
      paperboy.p.y = papery;
    }

  }, '2d');

};
