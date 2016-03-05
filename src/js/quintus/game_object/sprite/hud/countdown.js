module.exports = function (Q) {

  Q.UI.Text.extend('Countdown', {

    init: function (p) {
      this._super(p, {
        label: '--',
        color: '#fff',
        outlineColor: '#000',
        outlineWidth: '12',
        timeValue: null
      });
      this.fontString = 'normal 48pt Bangers';
    },

    step: function (dt) {
      var countdown = Q.getTimer('countdown');
      if (!countdown) {
        this.p.label = '--';
        this.p.timeValue = null;
        return;
      }
      var timeLeft = Math.ceil(countdown.length - countdown.timeElapsed);
      this.p.label = timeLeft.toString();
      var changed = false;
      if (this.p.timeValue !== timeLeft) {
        this.p.timeValue = timeLeft;
        changed = true;
      }
      if (timeLeft <= 10) {
        this.p.color = 'firebrick';
        if (changed) {
          Q.audio.play('timer_warning_beep.mp3');
        }
      } else {
        this.p.color = '#fff';
      }
    }

  });
  
};
