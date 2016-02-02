module.exports = function (Q) {

  Q.House.extend('Rocko', {

    init: function (p) {
      this._super(p, {
        sheet: 'rocko',
        doorType: 'skinnydoor',
        frameTotal: 3,
        windowXLocations: [-225, 80, 230],
        bottomWindowBuffer: 54,
        doorXLocation: -100,
        bottomDoorBuffer: -48
      });
    }

  });

};