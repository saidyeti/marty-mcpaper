module.exports = function (Q) {

  Q.House.extend('Barbie', {

    init: function (p) {
      this._super(p, {
        sheet: 'barbie',
        doorSheet: 'skinnydoor',
        frameTotal: 3,
        windowXLocations: [-132, 130],
        bottomWindowBuffer: 54,
        doorXLocation: 20,
        bottomDoorBuffer: -48,
        leftMargin: 45,
        rightMargin: 33
      });
    }

  });

};
