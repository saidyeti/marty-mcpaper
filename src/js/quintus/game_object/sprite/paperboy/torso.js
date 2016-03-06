module.exports = function (Q) {

  Q.Sprite.extend('Torso', {

    init: function (p) {
      this._super(p, {
        sprite: 'man',
        sheet: 'man',
        frame: 0,
        awaitingRelease: false,
        awaitingThrowCompletion: false,
        readyToThrow: false
      });

      this.add('2d, animation');

      this.on('paperfetched', this, function () {
        this.p.readyToThrow = true;
      });

      this.on('paperthrown', this, function () {
        this.p.awaitingThrowCompletion = false;
      });
    },

    fetchPaper: function () {
      if (this.p.awaitingThrowCompletion) {
        return;
      }
      this.p.awaitingRelease = true;
      this.p.awaitingThrowCompletion = true;
      this.play('fetchPaper');
      Q.audio.playAny([
        'paper_rustle_01.mp3',
        'paper_rustle_02.mp3'
      ]);
    },

    step: function (dt) {
      if (this.p.awaitingRelease && !Q.inputs['fire']) {
        this.p.awaitingRelease = false;
      }
      if (this.p.readyToThrow && !this.p.awaitingRelease) {
        this.play('throwPaper');
        Q.audio.play('woosh.mp3');
        this.p.readyToThrow = false;
      }
    }

  });

  Q.animations('man', {
    fetchPaper: {
      frames: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      rate: 1/20,
      loop: false,
      trigger: 'paperfetched'
    },
    throwPaper: {
      frames: [10, 11, 12, 13, 14, 15, 16],
      rate: 1/20,
      trigger: 'paperthrown',
      next: 'lowerArmBackToHandlebars'
    },
    lowerArmBackToHandlebars: {
      frames: [17, 18, 0],
      rate: 1/20,
      loop: false
    }
  });

};
