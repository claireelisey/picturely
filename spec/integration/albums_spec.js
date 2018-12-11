const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/albums/";
const sequelize = require("../../src/db/models/index").sequelize;
const Album = require("../../src/db/models").Album;

describe("routes : albums", () => {

    beforeEach((done) => {
        this.album;
        sequelize.sync({force: true}).then((res) => {
    
            Album.create({
                title: "Bahama Trip 2018",
                albumUrl: "https://wwww.cloudinary.com/image/upload/skiingfampic.com"
            })
            .then((album) => {
                this.album = album;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
  
        });
  
    });

    describe("GET /albums", () => {

        it("should return a status code 200 and all albums", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Albums");
                expect(body).toContain("https://wwww.cloudinary.com/image/upload/skiingfampic.com");
                done();
            });
        });

    });
    
});