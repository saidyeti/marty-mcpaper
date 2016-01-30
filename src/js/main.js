(function () {

  /* Quintus core */
  var Quintus = require('Quintus/lib/quintus');

  /* official Quintus modules */ 
  require('Quintus/lib/quintus_2d')(Quintus);
  require('Quintus/lib/quintus_anim')(Quintus);
  require('Quintus/lib/quintus_audio')(Quintus);
  require('Quintus/lib/quintus_input')(Quintus);
  require('Quintus/lib/quintus_scenes')(Quintus);
  require('Quintus/lib/quintus_sprites')(Quintus);
  require('Quintus/lib/quintus_touch')(Quintus);
  require('Quintus/lib/quintus_ui')(Quintus);

  /* custom Quintus modules */
  // nothing yet

  /* Quintus instance and environment preparation */
  var Q = Quintus({ development: true })
            .include('2D, Anim, Audio, Input, Scenes, Sprites, Touch, UI');
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
  require('./quintus/game_object/sprite/paperboy')(Q);

  /* scenes */
  require('./quintus/scene/route')(Q);

  Q.load([
    /* 'sprites.png',
     * 'sprites.json'
     */
  ], function() {

    // Q.compileSheets('sprites.png', 'sprites.json');
    
    /*
    Q.stageScene('level1', 0, {
      label: 'LEVEL 1'
    });
    */

  }, {
    progressCallback: function (loaded, total) {
      var loadingBar = document.getElementById('loading_progress');
      loadingBar.style.width = Math.floor(loaded / total * 100) + '%';
    }
  });

})();
