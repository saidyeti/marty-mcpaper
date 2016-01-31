module.exports = function (Q) {

  Q.UI.Text.extend('Lives', {

    init: function (p) {
      this._super(p, {
        label: 'Lives: 0',
      //  x: 10,
      //  y: 40
      });
      Q.state.on('change.lives', this, 'lives');
    },

    lives: function (lives) {
      this.p.label = 'Lives: ' + lives;
    }

  });
  
};
