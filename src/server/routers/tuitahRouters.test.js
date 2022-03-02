require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const { app } = require("..");
const connectDB = require("../../database");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

afterAll(() => {
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
