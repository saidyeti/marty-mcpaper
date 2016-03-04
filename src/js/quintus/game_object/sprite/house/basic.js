module.exports = function (Q) {

  Q.House.extend('Basic', {

    init: function (p) {
      this._super(p, {
        sheet: 'basic',
        doorSheet: 'door',
        frameTotal: 3,
        windowXLocations: [-290, -75, 328],
        bottomWindowBuffer: 54,
        doorXLocation: 182,
        bottomDoorBuffer: -48,
        leftMargin: 48,
        rightMargin: 45
      });
    }

  });

};
