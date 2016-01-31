module.exports = function (Q) {

/* Q.scene('ground', function(stage){
  var container = stage.insert (new Q.UI.Container({
      x:400 , 
      y:300 , 
      fill: 'rgba(15,12,12,1)'

      }));
    */
    Q.scene('ground',new Q.Scene(function(stage) { 
      stage.insert(new Q.Sprite({
       x: 100, y: 250, w: 500, h: 50 
      })); 

      stage.insert(new Q.Sprite({
       w: 30, h:20, x: 0, y: 100 
      })); 

      stage.insert(new Q.Sprite({
       r: 30, x: 50, y: 100, shape:'circle' 
      })); 

      stage.insert(new Q.Sprite({
       x: 120, y: 100, shape: 'polygon',
       color: "red", 
       points: [[ 0, 0 ], [ 100, 0 ],[ 120, 25],[ 50, 50]] 
      }));
    })); 

};
