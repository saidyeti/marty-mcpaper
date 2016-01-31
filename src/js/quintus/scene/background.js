module.exports = function (Q) {

  Q.scene('background', function (stage) {
    var background = stage.insert(new Q.Repeater({ 
      asset: 'background.svg', 
      speedX: 0.5, 
      speedY: 0.5,
     // type: 0 
      scale: 0.5

    
    }));
    

  });


};