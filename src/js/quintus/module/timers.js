module.exports = function (Quintus) {
  
  Quintus.Timers = function (Q) {

    Q.timers = [];

    function Timer (name, length, step, end) {
      this.name = name;
      this.length = length;
      stepFunctions = this.stepFunctions = [];
      if (step && typeof step === 'function') {
        stepFunctions.push(step);
      }
      endFunctions = this.endFunctions = [];
      if (end && typeof end === 'function') {
        endFunctions.push(end);
      }
      this.running = false;
      this.timeElapsed = 0;
    }
    Timer.prototype.start = function () {
      if (this.timeElapsed >= this.length) {
        console.log('Warning: timer "' + this.name + '" has already expired.');
        return;
      }
      this.running = true;
    };
    Timer.prototype.pause = function () {
      this.running = false;
    };
    Timer.prototype.incrementTime = function (dt) {
      return this.timeElapsed += dt;
    };
    Timer.prototype.onStep = function (callback) {
      if (callback && typeof callback === 'function') {
        stepFunctions.push(callback);
      }
    };
    Timer.prototype.onEnd = function (callback) {
      if (callback && typeof callback === 'function') {
        endFunctions.push(callback);
      }
    };

    Q.timerGameLoop = function (dt) {
      Q.timers.filter(function (timer) {
        return timer.running;
      }).forEach(function (timer) {
        var elapsed = timer.incrementTime(dt);
        timer.stepFunctions.forEach(function (step) {
          step(dt);
        });
        if (elapsed >= timer.length) {
          timer.running = false;
          timer.endFunctions.forEach(function (end) {
            end(dt);
          });
        }
      });
    };

    // accepts length in seconds
    Q.addTimer = function (name, length, step, end) {
      if (Q.getTimer(name)) {
        var warning =
          'Warning: No timer created (timer "' + name + '" already exists).';
        console.log(warning);
        return null;
      }
      var timer = new Timer(name, length, step, end);
      Q.timers.push(timer);
      return timer;
    };

    // will return undefined if the timer doesn't exist
    Q.getTimer = function (name) {
      return Q.timers.filter(function (timer) {
        return timer.name === name;
      })[0];
    };

  };

};
