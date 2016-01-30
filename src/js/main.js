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
  // nothing yet

  /* Quintus instance and environment preparation */
  var Q = Quintus({ development: true })
            .include('Sprites, Scenes, Touch, UI, Anim, Audio, Input, 2D');
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
      [],
      [],
      [],
      ['fire', 'b'],
      ['jump', 'a']
    ]
  });

  /* custom components */
  require('./quintus/component/jumpcontrols')(Q);

  /* sprites */
  require('./quintus/game_object/sprite/score')(Q);
  require('./quintus/game_object/sprite/lives')(Q);
  require('./quintus/game_object/sprite/paperboy')(Q);

  /* scenes */
  require('./quintus/scene/route')(Q);

  Q.load(['mario.gif'], function() {

    // Q.compileSheets('sprites.png', 'sprites.json');
 //--------------------------------------ALI STARTS MESSING ------------------

    Q.stageScene('route');

    //beginning score
    Q.state.set({ score: 50, lives: 3 });
    Q.state.get('score');
//------------------------------------------ALI STOPS MESSING---------------
  }, {
    progressCallback: function(loaded, total) {
      var loadingBar = document.getElementById('loading_progress');
      loadingBar.style.width = Math.floor(loaded / total * 100) + '%';
    }
  });

})();
