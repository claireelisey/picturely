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
                albumUrl: "https://wwww.cloudinary.com/image/upload/beachbums.jpg"
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
                expect(body).toContain("https://wwww.cloudinary.com/image/upload/beachbums.jpg");
                done();
            });
        });

    });

    describe("GET /albums/new", () => {

        it("should render a new album form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Album");
                done();
            });
        });
    
    });

    describe("POST /albums/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "Steamboat Springs 2018",
                albumUrl: "https://wwww.cloudinary.com/image/upload/skifampic.jpg"
            }
        };
  
        it("should create a new album and redirect", (done) => {
            request.post(options,
                (err, res, body) => {
                Album.findOne({where: {title: "Steamboat Springs 2018"}})
                .then((album) => {
                    expect(res.statusCode).toBe(303);
                    expect(album.title).toBe("Steamboat Springs 2018");
                    expect(album.albumUrl).toBe("https://wwww.cloudinary.com/image/upload/skifampic.jpg");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
                }
            );
        });
    });

    describe("GET /albums/:id", () => {

        it("should render a view with the selected album", (done) => {
            request.get(`${base}${this.album.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Bahama Trip 2018");
                done();
            });
        });
   
    });

    describe("POST /albums/:id/destroy", () => {

        it("should delete the album with the associated ID", (done) => {

            Album.all()
            .then((albums) => {

                const albumCountBeforeDelete = albums.length;
    
                expect(albumCountBeforeDelete).toBe(1);

                request.post(`${base}${this.album.id}/destroy`, (err, res, body) => {
                Album.all()
                .then((albums) => {
                    expect(err).toBeNull();
                    expect(albums.length).toBe(albumCountBeforeDelete - 1);
                    done();
                })
    
                });
            });
   
        });
   
    });

    describe("GET /albums/:id/edit", () => {

        it("should render a view with an edit album form", (done) => {
          request.get(`${base}${this.album.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Album");
            expect(body).toContain("Bahama Trip 2018");
            done();
          });
        });
   
    });

    describe("POST /albums/:id/update", () => {

        it("should update the album with the given values", (done) => {
            const options = {
                url: `${base}${this.album.id}/update`,
                form: {
                    title: "Steamboat Springs 2018",
                    albumUrl: "https://wwww.cloudinary.com/image/upload/skifampic.jpg"
                }
            };
            request.post(options,
            (err, res, body) => {

                expect(err).toBeNull();
                Album.findOne({
                    where: { id: this.album.id }
                })
                .then((album) => {
                    expect(album.title).toBe("Steamboat Springs 2018");
                    done();
                });
            });
        });
   
    });
   
    
});