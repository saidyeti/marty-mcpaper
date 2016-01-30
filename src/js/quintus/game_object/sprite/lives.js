module.exports = function (Q) {

  Q.UI.Text.extend('Lives', {

    init: function (p) {
      console.log('Yo how it do');
      this._super({
        label: 'lives: 0',
        x: -2,
        y: -4
      });
      Q.state.on('change.lives', this, 'lives');
    },

    lives: function (lives) {
      this.p.label = 'lives: ' + lives;
    }

  });
  
};
