(function () {

  /* Quintus core */
  var Quintus = require('Quintus/lib/quintus');

  /* official Quintus modules */ 
  require('Quintus/lib/quintus_sprites')(Quintus);
  require('Quintus/lib/quintus_scenes')(Quintus);
  require('Quintus/lib/quintus_touch')(Quintus);
  require('Quintus/lib/quintus_ui')(Quintus);
  require('Quintus/lib/quintus_anim')(Quintus);
  require('Quintus/lib/quintus_audio')(Quintus);
  require('Quintus/lib/quintus_input')(Quintus);
  require('Quintus/lib/quintus_2d')(Quintus);

  /* custom Quintus modules */
  require('./quintus/module/svg_asset')(Quintus);
  require('./quintus/module/audio_extras')(Quintus);
  require('./quintus/module/timers')(Quintus);

  /* Quintus instance and environment preparation */
  var Q = Quintus({
    development: true,
    audioSupported: ['mp3', 'ogg']
  });
  Q.include('Sprites, Scenes, Touch, UI, Anim, Audio, Input, 2D, SVGAsset, AudioExtras, Timers');
  Q.setup({
    width: 800,
    height: 600,
    maximize: 'touch',
    upsampleWidth: 420,
    upsampleHeight: 320
  });
  Q.enableSound();

  // Q.debug = true; // uncomment to show debug frames around sprites

  Q.input.keyboardControls({
    //Z: 'jump',
    X: 'fire'
    ,SPACE: 'fire'
  });

  Q.input.touchControls({
    controls: [
      ['fire', 'T'],
      [],
      [],
      [],
      [/*'jump', 'J'*/]
    ]
  });

  /* custom components */
  require('./quintus/component/jumpcontrols')(Q);
  require('./quintus/component/static2d')(Q);

  /* sprites */
  require('./quintus/game_object/sprite/hud/score')(Q);
  require('./quintus/game_object/sprite/hud/lives')(Q);
  require('./quintus/game_object/sprite/hud/countdown')(Q);
  require('./quintus/game_object/sprite/paperboy/paperboy')(Q);
  require('./quintus/game_object/sprite/paperboy/torso')(Q);
  require('./quintus/game_object/sprite/paperboy/arm')(Q);
  require('./quintus/game_object/sprite/paperboy/leg')(Q);
  require('./quintus/game_object/sprite/paperboy/bicycle')(Q);
  require('./quintus/game_object/sprite/paperboy/wheel')(Q);
  require('./quintus/game_object/sprite/house/house')(Q);
  require('./quintus/game_object/sprite/house/phil')(Q);
  require('./quintus/game_object/sprite/house/barbie')(Q);
  require('./quintus/game_object/sprite/house/basic')(Q);
  require('./quintus/game_object/sprite/house/snow')(Q);
  require('./quintus/game_object/sprite/house/rocko')(Q);
  require('./quintus/game_object/sprite/house/window')(Q);
  require('./quintus/game_object/sprite/house/door')(Q);
  require('./quintus/game_object/sprite/house/tree')(Q);
  require('./quintus/game_object/sprite/house/bush')(Q);
  require('./quintus/game_object/sprite/object/paper')(Q);
  require('./quintus/game_object/sprite/roadplatform')(Q);

  /* scenes */
  require('./quintus/scene/background')(Q);
  require('./quintus/scene/route')(Q);
  require('./quintus/scene/hud')(Q);
  require('./quintus/scene/endGame')(Q);

  setTimeout(function() {

    Q.load([
      'sprites.png',
      'sprites.json',
      'background.svg',
      'marty_mcpaper_theme.mp3',
      'window_shatter_01.mp3',
      'window_shatter_02.mp3',
      'window_shatter_03.mp3',
      'paper_thud.mp3',
      'woosh.mp3',
      'paper_rustle_01.mp3',
      'paper_rustle_02.mp3',
      'door_crash.mp3',
      'success1.mp3',
      'success2.mp3',
      'timer_warning_beep.mp3'
    ], function() {

      document.getElementById('loading_container').style.display = 'none';

      Q.compileSheets('sprites.png', 'sprites.json');

      Q.gameLoop(function (dt) {
        Q.timerGameLoop(dt);
        Q.stageGameLoop(dt);
      });

      /* staging */
      Q.stageScene('background');
      var hud = Q.stageScene('hud', 2, {
        label: ''
      });

      var route;
      function resetRoute () {
        route = Q.stageScene('route', 1, {
          sort: true
        });
        route.on('reset', null, resetRoute);
      };
      resetRoute();

      function playThemeSong () {
        Q.audio.stop('marty_mcpaper_theme.mp3');
        Q.audio.play('marty_mcpaper_theme.mp3', {
          loop: true,
          loopStart: 15.38,
          loopEnd: 46.07
        });
      }
      playThemeSong();

      function resetScore () {
        Q.state.set({ score: 0, lives: 3 });
      }
      resetScore();

      function restartGame () {
        Q.input.off('fire', route, restartGame);
        hud.trigger('hideRestartPrompt');
        route.trigger('reset');
        playThemeSong();
        resetScore();
      }
      Q.addTimer('restartPrompt', 2, {
        end: function () {
          hud.trigger('showRestartPrompt');
          Q.input.on('fire', route, restartGame);
        }
      });

    }, {
      progressCallback: function (loaded, total) {
        var loadingBar = document.getElementById('loading_progress');
        loadingBar.style.width = Math.floor(loaded / total * 100) + '%';
      }
    });


  }, 3500);

})();
