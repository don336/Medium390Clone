import testBase from "./index";
import mongoose from "mongoose";
import { deleteUsers, createUsers, uIds } from "./TestData/userTestData";

describe("Create User Profile", function () {
  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    await createUsers();
  });

  afterEach(async () => {
    await deleteUsers();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });
  it("shouldnt return a user profile if the user isn't logged in", async ()=>{
    const res = await testBase
      .get("/user/12934934893249023")
      .send();

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Auth Denied!");
  })

  it("shouldnt return a user profile if the user doesn't exist", async () => {
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase.get("/user/12934934893249023").set("Authorization", token).send();

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("User doesn't exist");
  });

  it("should return a user profile if user exists", async () =>{
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .get(`/user/${uIds.uid1}`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "userI",
      username: "User1",
      email: "user1@gmail.com"
    });
  })

  it("should not update profile if user not found", async () =>{
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .put(`/user/101010101010`)
      .set("Authorization", token)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("User doesn't exist");
  })
  it("should update profile if user", async () =>{
    const login = await testBase.post("/auth/user/signin").send({
      email: "user1@gmail.com",
      password: "12345678",
    });

    const token = login.body.token;

    const res = await testBase
      .put(`/user/${uIds.uid1}`)
      .set("Authorization", token)
      .send({
        bio: 'I love Development'
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Profile Updated!");
  })
});
