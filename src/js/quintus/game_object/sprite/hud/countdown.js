module.exports = function (Q) {

  Q.UI.Text.extend('Countdown', {

    init: function (p) {
      this._super(p, {
        label: '--',
        color: '#fff',
        outlineColor: '#000',
        outlineWidth: '12'
      });
      this.fontString = 'normal 48pt Bangers';
    },

    step: function (dt) {
      var countdown = Q.getTimer('countdown');
      if (!countdown) {
        this.p.label = '--';
        return;
      }
      var timeLeft = Math.ceil(countdown.length - countdown.timeElapsed);
      this.p.label = timeLeft.toString();
      if (timeLeft <= 10) {
        this.p.color = 'firebrick';
      }
    }

  });
  
};
