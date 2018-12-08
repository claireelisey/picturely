const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/albums/";

describe("routes : albums", () => {

    describe("GET /albums", () => {

        it("should return a status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });

    });
    
});