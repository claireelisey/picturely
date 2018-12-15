const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/albums";

const sequelize = require("../../src/db/models/index").sequelize;
const Album = require("../../src/db/models").Album;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {

    beforeEach((done) => {
        this.album;
        this.post;

        sequelize.sync({force: true}).then((res) => {

            Album.create({
                title: "Wild West Trip 2018",
                image: "https://wwww.cloudinary.com/image/upload/horses.jpg"
            })
            .then((album) => {
                this.album = album;

                Post.create({
                    caption: "Found wild horses!",
                    image: "https://wwww.cloudinary.com/image/upload/stallion.jpg",
                    albumId: this.album.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

    });

    describe("GET /albums/:albumId/posts/new", () => {

        it("should render a new post form", (done) => {
            request.get(`${base}/${album.id}/posts/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Post");
                done();
            });
        });
    
    });

    describe("POST /albums/:albumId/posts/create", () => {

        it("should create a new post and redirect", (done) => {
            const options = {
                url: `${base}/${this.album.id}/posts/create`,
                form: {
                    caption: "Fresh snow in the mountains",
                    image: "https://wwww.cloudinary.com/image/upload/snow.jpg"
                }
            };
            request.post(options,
                (err, res, body) => {
        
                    Post.findOne({where: {caption: "Fresh snow in the mountains"}})
                    .then((post) => {
                        expect(post).not.toBeNull();
                        expect(post.caption).toBe("Fresh snow in the mountains");
                        expect(post.image).toBe("https://wwww.cloudinary.com/image/upload/snow.jpg");
                        expect(post.albumId).not.toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it("should not create a new post that fails validations", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/create`,
                form: {
                    caption: "a",
                    image: "b"
                }
            };
     
            request.post(options,
                (err, res, body) => {

                    Post.findOne({where: {caption: "a"}})
                    .then((post) => {
                        expect(post).toBeNull();
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

    describe("GET /albums/:albumId/posts/:id", () => {

        it("should render a view with the selected post", (done) => {
            request.get(`${base}/${this.album.id}/posts/${this.post.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Found wild horses!");
                done();
            });
        });
   
    });

    describe("POST /albums/:albumId/posts/:id/destroy", () => {

        it("should delete the post with the associated ID", (done) => {
            expect(post.id).toBe(1);

            request.post(`${base}/${this.album.id}/posts/${this.post.id}/destroy`, (err, res, body) => {

                Post.findById(1)
                .then((post) => {
                    expect(err).toBeNull();
                    expect(post).toBeNull();
                    done();
                })
            });
        });
   
    });

    describe("GET /albums/:albumId/posts/:id/edit", () => {

        it("should render a view with an edit post form", (done) => {
            request.get(`${base}/${this.album.id}/posts/${this.post.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Post");
                expect(body).toContain("Found wild horses!");
                done();
            });
        });
   
    });

    describe("POST /albums/:albumId/posts/:id/update", () => {

        it("should return a status code 302", (done) => {
            request.post({
                url: `${base}/${album.id}/posts/${post.id}/update`,
                form: {
                    caption: "Spotted horses in the wild!",
                    image: "https://wwww.cloudinary.com/image/upload/mustangs.jpg"
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(302);
                done();
            });
        });
   
        it("should update the post with the given values", (done) => {
            const options = {
                url: `${base}/${this.album.id}/posts/${this.post.id}/update`,
                form: {
                    caption: "Spotted horses in the wild!"
                }
            };
            request.post(options,
                (err, res, body) => {
    
                expect(err).toBeNull();
    
                Post.findOne({
                    where: {id: this.post.id}
                })
                .then((post) => {
                    expect(post.caption).toBe("Spotted horses in the wild!");
                    done();
                });
            });
        });
   
    });

});