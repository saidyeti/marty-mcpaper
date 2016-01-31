module.exports = function (Q) {

  Q.scene('route', function (stage) {
  //  var lives = stage.insert(new Q.Lives());
  //  var score = stage.insert(new Q.Score());
    var paperboy = stage.insert(new Q.PaperBoy());
    /* need ground  
    stage.add('viewport').follow(paperboy);
    */
  
    var bicycle = stage.insert(new Q.Bicycle({
      x: 200,
      y: 200
    }), paperboy);

    var wheel1 = stage.insert(new Q.Wheel({
      x: 100,
      y: 100
    }), bicycle);

    var wheel2 = stage.insert(new Q.Wheel({
      x: 400,
      y: 500
    }), bicycle);

  }); /* end of scene */

 Q.scene('hud', function (stage) {
   // var lives = stage.insert(new Q.Lives());
    var score = stage.insert(new Q.Score());
    var label = stage.insert(new Q.UI.Text({
      x: 500,
      y: 40
    //  label: stage.options.label,
    //  console.log(lives, score)
    }));

  }); 

};
