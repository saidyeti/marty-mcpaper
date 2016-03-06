module.exports = function (Quintus) {
  
  Quintus.Timers = function (Q) {

    var timers = {};

    function Timer (name, length, step, end) {
      this.name = name;
      this.length = length;
      var stepFunctions = this.stepFunctions = [];
      if (step && typeof step === 'function') {
        stepFunctions.push(step);
      }
      var endFunctions = this.endFunctions = [];
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
    Timer.prototype.reset = function () {
      this.timeElapsed = 0;
    };
    Timer.prototype.incrementTime = function (dt) {
      return this.timeElapsed += dt;
    };
    Timer.prototype.onStep = function (callback) {
      if (callback && typeof callback === 'function') {
        this.stepFunctions.push(callback);
      }
    };
    Timer.prototype.onEnd = function (callback) {
      if (callback && typeof callback === 'function') {
        this.endFunctions.push(callback);
      }
    };

    /* In order for added timers to take effect,
     * timerGameLoop must be called as part of the
     * main game loop.
     */
    Q.timerGameLoop = function (dt) {
      Object.keys(timers).map(function (key) {
        return timers[key];
      }).filter(function (timer) {
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
    Q.addTimer = function (name, length, options) {
      options = options || {};
      if (Q.getTimer(name) && !options.force) {
        var warning =
          'Warning: No timer created (timer "' + name + '" already exists).';
        console.log(warning);
        return null;
      }
      return timers[name] = new Timer(name, length, options.step, options.end);
    };

    Q.getTimer = function (name) {
      return timers[name];
    };

  };

};
