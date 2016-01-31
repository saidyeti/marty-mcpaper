module.exports = function (Q) {

    Q.scene('endGame', function (stage){
      var container = stage.insert (new Q.UI.Container({
        x:400 , y:300 , fill: 'rgba(0,0,0,0.5)' 
      }));

      var button = container.insert(new Q.UI.Button({
        x: 0, 
        y: -10, 
        fill: 'rgba(204,204,204,0.5)', 
        label: 'Try Again?'
      }));

      var label = container.insert(new Q.UI.Text({
        x: 0,
        y: -10,
        label: stage.options.label }));

      button.on('click', function() {
        Q.clearStages();
        Q.stageScene('route');
      });

        container.fit(20);
    }); /* end scene */


};