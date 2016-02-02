module.exports = function (Q) {

  Q.House.extend('Phil', {

    init: function (p) {
      this._super(p, {
        sheet: 'phil',
        doorType: 'skinnydoor',
        frameTotal: 3,
        windowXLocations: [-157, 204],
        bottomWindowBxuffer: 51,
        doorXLocation: 71,
        bottomDoorBuffer: -48
      });
    }

  });

};
