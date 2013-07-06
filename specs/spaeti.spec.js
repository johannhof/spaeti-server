var request = require("request");
var id = undefined;

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
   it("should allow the client to add a spaeti", function(done){
      request({
         uri: "http://spaeti.pavo.uberspace.de/dev/spaeti",
         method: "POST",
         json: {name:"testSpaeti",location:{city:"Berlin"},businessHours:{}}
      },function(error,response,body){
	 if(body.status === "created"){
            id = body._id;
            done();
         }
      });
   });
   it("should allow the client to view a specific spaeti",function(done){
      request({
         uri: "http://spaeti.pavo.uberspace.de/dev/spaeti/" + id
      },function(error,response,body){
           var spaeti = JSON.parse(body);
           expect(spaeti.name).toBe("testSpaeti");
           done();
        });
   });
   it("should allow the client to change a specific spaeti",function(done){
      request({
         uri: "http://spaeti.pavo.uberspace.de/dev/spaeti/" + id,
         method: "PUT",
         json: {name:"nameChanged",location:{city:"Berlin"},businessHours:{}}
      },function(error,response,body){
           expect(body.status).toBe("updated");
           done();
        });
   });
   it("should allow the client to delete a specific spaeti",function(done){
      request({
         uri: "http://spaeti.pavo.uberspace.de/dev/spaeti/" + id,
         method: "DELETE"
      },function(error,response,body){
           var res = JSON.parse(body);
           expect(res.status).toBe("deleted");
           done();
        });
   });
});
