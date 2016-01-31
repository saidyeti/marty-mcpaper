module.exports = function (Q) {
  
  Q.scene('ui', function(stage){
      Q.state.set({ coins: 0, lives: 3});
      UiCoins.innerHTML = "Coins: " + Q.state.get("coins");
      UiLives.innerHTML = "Lives: " + Q.state.get("lives");
     
    Q.state.on("change.coins",this, function() {
        UiCoins.innerHTML = "Coins: " + Q.state.get("coins");
    });
     
    Q.state.on("change.lives",this, function() {
        UiLives.innerHTML = "Lives: " + Q.state.get("lives");
    });
  
  });
};