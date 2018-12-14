const sequelize = require("../../src/db/models/index").sequelize;
const Album = require("../../src/db/models").Album;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

    beforeEach((done) => {

        this.album;
        this.post;

        sequelize.sync({force: true}).then((res) => {
            Album.create({
                title: "PCH Trip 2018",
                image: "https://wwww.cloudinary.com/image/upload/road.jpg"
            })
            .then((album) => {
                this.album = album;
                Post.create({
                    caption: "Big Sur",
                    image: "https://wwww.cloudinary.com/image/upload/cliffs.jpg",
                    albumId: this.album.id
                })
                .then((post) => {
                    this.post = post;
                done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

    });

    describe("#create()", () => {

        it("should create a post object with a caption, image, and assigned album", (done) => {
            Post.create({
                caption: "Bed & breakfast in Westport",
                image: "https://wwww.cloudinary.com/image/upload/bedbreakfast.jpg",
                albumId: this.album.id
            })
            .then((post) => {
                expect(post.caption).toBe("Bed & breakfast in Westport");
                expect(post.body).toBe("https://wwww.cloudinary.com/image/upload/bedbreakfast.jpg");
                done();
    
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a post with missing cpation, image, or assigned album", (done) => {
            Post.create({
                caption: "NYE in Beaver Creek 2017"
            })
            .then((post) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Post.body cannot be null");
                expect(err.message).toContain("Post.albumId cannot be null");
                done();
            })
        });
   
    });

    describe("#setAlbum()", () => {

        it("should associate a album and a post together", (done) => {
            Album.create({
                caption: "Chincoteague Trip 2017",
                image: "https://wwww.cloudinary.com/image/upload/sisters.jpg"
            })
            .then((newAlbum) => {
                expect(this.post.albumId).toBe(this.album.id);
                this.post.setAlbum(newAlbum)
                .then((post) => {
                    expect(post.albumId).toBe(newAlbum.id);
                    done();
                });
            })
        });
   
    });

    describe("#getAlbum()", () => {

        it("should return the associated album", (done) => {
            this.post.getAlbum()
            .then((associatedAlbum) => {
                expect(associatedAlbum.title).toBe("PCH Trip 2018");
                done();
            });
        });
   
    });

});