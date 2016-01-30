module.exports = function (Q) {

  Q.UI.Text.extend('Score', {

    init: function (p) {
      this._super({
        label: 'score: 0',
        x: 0,
        y: 0
      });
      Q.state.on('change.score', this, 'score');
    },

    score: function (score) {
      this.p.label = 'score: ' + score;
    }
  });
  
};
