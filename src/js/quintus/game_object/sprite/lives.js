module.exports = function (Q) {

  Q.UI.Text.extend('Lives', {

    init: function (p) {
      this._super(p, {
        label: 'Lives: 0'
      });
      Q.state.on('change.lives', this, 'lives');
      this.fontString = 'normal 20pt Bangers';
     
    },

    lives: function (lives) {
      this.p.label = 'Lives: ' + lives;
    }

  });
  
};
