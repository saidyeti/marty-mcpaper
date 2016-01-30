module.exports = function (Q) {

  Q.scene('route', function (stage) {
  //  var lives = stage.insert(new Q.Lives());
  //  var score = stage.insert(new Q.Score());
    var paperboy = stage.insert(new Q.PaperBoy());
    /* need ground  
    stage.add('viewport').follow(paperboy);
    */
  



  }); /* end of scene */

 Q.scene('hud', function(stage){
   // var lives = stage.insert(new Q.Lives());
    var score = stage.insert(new Q.Score());
    var label = stage.insert(new Q.UI.Text({
      x: 500,
      y: 40,
    //  label: stage.options.label,
    //  console.log(lives, score)
    }));

  }); 

};
