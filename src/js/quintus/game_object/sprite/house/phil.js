module.exports = function (Q) {

  Q.House.extend('Phil', {

    init: function (p) {
      this._super(p, {
        sheet: 'phil',
        doorSheet: 'skinnydoor',
        frameTotal: 3,
        windowXLocations: [-157, 204],
        bottomWindowBuffer: 51,
        doorXLocation: 71,
        bottomDoorBuffer: -48,
        leftMargin: 53,
        rightMargin: 45
      });
    }

  });

};
