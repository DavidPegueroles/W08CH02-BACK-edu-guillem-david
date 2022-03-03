require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { app } = require("..");
const connectDB = require("../../database");
const Tuit = require("../../database/models/Tuit");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Tuit.create({
    text: "test tuit",
    id: "1",
    likes: "10",
  });
});

afterEach(async () => {
  await Tuit.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  mongoServer.stop();
});

describe("Given an endpoint /list", () => {
  describe("When it receives a GET request", () => {
    test("Then it should respond with status 200 and a list of tuits", async () => {
      const { body } = await request(app).get("/list").expect(200);

      expect(body).toHaveProperty("tuits");
    });
  });
});

describe("Given an endpoint /new", () => {
  describe("When it receives a POST request with a 'tuit'", () => {
    test("Then it should respond with json with the new tuit and status 201", async () => {
      const tuit = { text: "New tuit" };

      const { body } = await request(app).post("/new").send(tuit).expect(201);

      expect(body).toHaveProperty("text", "New tuit");
    });
  });
});

describe("Given an endpoint /like/:id", () => {
  describe("When it receives a PATCH request with an id", () => {
    test.only("Then it should respond with json 'You liked that!'", async () => {
      const id = "1";

      const { body } = await request(app).patch(`/like/${id}`);

      expect(body).toHaveProperty("error");
    });
  });
});
