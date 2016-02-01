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

  /* Quintus instance and environment preparation */
  var Q = Quintus({ development: true })
            .include('Sprites, Scenes, Touch, UI, Anim, Audio, Input, 2D, SVGAsset');
  Q.setup({
    width: 800,
    height: 600,
    maximize: 'touch',
    upsampleWidth: 420,
    upsampleHeight: 320
  });

  Q.input.keyboardControls({
    Z: 'jump',
    X: 'fire'
  });

  Q.input.touchControls({
    controls: [
      ['fire', 'T'],
      [],
      [],
      [],
      ['jump', 'J']
    ]
  });

  /* custom components */
  require('./quintus/component/jumpcontrols')(Q);

  /* sprites */
  require('./quintus/game_object/sprite/score')(Q);
  require('./quintus/game_object/sprite/lives')(Q);
  require('./quintus/game_object/sprite/paperboy')(Q);
  require('./quintus/game_object/sprite/torso')(Q);
  require('./quintus/game_object/sprite/arm')(Q);
  require('./quintus/game_object/sprite/leg')(Q);
  require('./quintus/game_object/sprite/bicycle')(Q);
  require('./quintus/game_object/sprite/wheel')(Q);
  require('./quintus/game_object/sprite/house')(Q);
  require('./quintus/game_object/sprite/paper')(Q);

  /* scenes */
  require('./quintus/scene/background')(Q);
  require('./quintus/scene/route')(Q);
  require('./quintus/scene/hud')(Q);
  require('./quintus/scene/endGame')(Q);

  setTimeout(function() {

    Q.load(['sprites.png', 'sprites.json', 'background.svg'], function() {

      document.getElementById('intro_image').style.display = 'none';

      Q.compileSheets('sprites.png', 'sprites.json');

      /* staging */
      Q.stageScene('background');
      Q.stageScene('route', 1, {
        sort: true
      });
      Q.stageScene('hud', 2, {
        label: ''
      });

      //beginning score
      Q.state.set({ score: 0, lives: 3 });
      Q.state.get('score');

      

    }, {
      progressCallback: function (loaded, total) {
        var loadingBar = document.getElementById('loading_progress');
        loadingBar.style.width = Math.floor(loaded / total * 100) + '%';
      }
    });


  }, 3500);

})();
