var request = require("request");

describe("Spaeti-Restservice", function () {
    it("should return a list of spaetis", function (done) {
        request("http://spaeti.pavo.uberspace.de/dev/spaeti", function (error, response, body) {
            var spaetiList = JSON.parse(body);
            expect(spaetiList.length).not.toBeUndefined();
            expect(spaetiList.length).not.toBe(0);
            expect(spaetiList[0].name).not.toBeUndefined();
            expect(spaetiList[0].location).not.toBeUndefined();
            done();
        });
    });
});