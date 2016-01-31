module.exports = function (Q) {

  Q.UI.Text.extend('Score', {

    init: function (p) {
      this._super(p, {
        label: 'Score: 0',
      //  x: 5,
      //  y: 1
      });
      Q.state.on('change.score', this, 'score');
    },

    score: function (score) {
      this.p.label = 'Score: ' + score;
    }
  });
  
};
