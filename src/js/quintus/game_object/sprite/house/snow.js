module.exports = function (Q) {

  Q.House.extend('Snow', {

    init: function (p) {
      this._super(p, {
        sheet: 'snow',
        doorSheet: 'door',
        frameTotal: 3,
        windowXLocations: [-250, -42, 280],
        bottomWindowBuffer: 54,
        doorXLocation: 94,
        bottomDoorBuffer: -48,
        leftMargin: 58,
        rightMargin: 38
      });
    }

  });

};
