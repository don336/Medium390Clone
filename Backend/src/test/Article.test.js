import mongoose from "mongoose";
import testBase from "./index";
import {
  aIds,
  createArticles,
  deleteArticles,
} from "./TestData/articleTestData";
import { createUsers, deleteUsers } from "./TestData/userTestData";

describe("Testing Article Feature", function () {
  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    await createUsers();
    await createArticles();
  });

  afterEach(async function () {
    await deleteUsers();
    await deleteArticles();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("shouldn't create an Article if not signed in", async () => {
    const res = await testBase.post("/articles/").send({
      title: "Article390",
      description: "Article description 39903",
    });
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Auth Denied!");
  });

  it("Should return all created Articles", async () => {
    const res = await testBase.get("/articles/").send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
  });

  it("should return an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .get(`/articles/${aIds.aid1}`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("Article Found");
  });
  it("shouldn't return an Article that doesn't exist", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .get(`/articles/ekerkerk1`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.msg).toEqual("Article Not found");
  });

  it("shouldn't create an Article without required fields", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .post("/articles/")
      .set("Authorization", token)
      .send();
    expect(res.status).toBe(422);
    expect(res.body.msg).toEqual("Fill all required Fields");
  });

  it("should create an Article with the required fields", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .post("/articles/")
      .set("Authorization", token)
      .send({
        title: "Article110",
        description: "Article description",
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("Article Created");
  });

  it("Should not update when article not found", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .put("/articles/34384394394")
      .set("Authorization", token)
      .send({
        title: "Article110",
        description: "Article description",
      });

    expect(res.status).toBe(400);
    expect(res.body.msg).toEqual("Article Not Found!");
  });
  it("Should update an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .put(`/articles/${aIds.aid1}`)
      .set("Authorization", token)
      .send({
        title: "Article110",
        description: "Article description",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("Article Updated!");
  });

  it("Should Add a like to an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .put(`/articles/${aIds.aid1}/likes`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(201);
    expect(res.body.msg).toEqual("Like Added");
  });
  it("Should update an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .put(`/articles/${aIds.aid1}`)
      .set("Authorization", token)
      .send({
        title: "Article110",
        description: "Article description",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("Article Updated!");
  });

  it("Should Add a like to an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .put(`/articles/${aIds.aid1}/likes`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(201);
    expect(res.body.msg).toEqual("Like Added");
  });
  it("Shouldn't Add a like to an Article given wrong Article Id", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .put(`/articles/eiriereireireo/likes`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.msg).toEqual(" Article not found");
  });
  it("Should Add a comment to an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .put(`/articles/${aIds.aid1}/comments`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(201);
    expect(res.body.msg).toEqual("Comment Added");
  });
  it("Should uncomment an Article", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;
    const res = await testBase
      .put(`/articles/${aIds.aid1}/uncomment`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(201);
    expect(res.body.msg).toEqual("Comment Removed");
  });

  it("should Delete an Article if article found", async()=>{
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase.delete(`/articles/${aIds.aid2}`).set("Authorization", token).send();

    expect(res.status).toBe(204)
    expect(res.body).toEqual({})
  })
});
