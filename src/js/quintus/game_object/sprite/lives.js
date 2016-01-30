module.exports = function (Q) {

  Q.UI.Text.extend('Lives', {

    init: function (p) {
      console.log('Yo how it do');
      this._super(p, {
        label: 'lives: 0',
      //  x: 10,
      //  y: 40
      });
      Q.state.on('change.lives', this, 'lives');
    },

    lives: function (lives) {
      this.p.label = 'lives: ' + lives;
    }

  });
  
};
