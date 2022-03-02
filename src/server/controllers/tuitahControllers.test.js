const Tuit = require("../../database/models/Tuit");
const { showTuits, newTuit, deleteTuit } = require("./tuitahControllers");

jest.mock("../../database/models/Tuit");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a showTuits controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with a list of tuits in the receive response", async () => {
      const res = {
        json: jest.fn(),
      };

      const tuits = [
        {
          date: "1111-10-11T00:14:44.000Z",
          likes: 11111,
          text: '"Hola que tal"',
          id: "621fb707499281090f4741af",
        },
        {
          text: "Prueba de tuit",
          likes: 0,
          date: "2022-03-02T18:57:17.843Z",
          id: "621fbe0d0a789c3d85f34f00",
        },
      ];

      Tuit.find = jest.fn().mockResolvedValue(tuits);

      await showTuits(null, res);

      expect(Tuit.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ tuits });
    });
  });
});

describe("Given a newTuit controller", () => {
  describe("When it receives tuitToCreate as body in req", () => {
    test("Then it should call method json with the created tuit and a status 201", async () => {
      const res = {
        json: jest.fn(),
      };
      const status = jest.fn().mockReturnValue(res);
      res.status = status;
      const tuitToCreate = {
        text: "New tuit",
      };

      const req = {
        body: tuitToCreate,
      };
      Tuit.create = jest.fn().mockResolvedValue(tuitToCreate);
      await newTuit(req, res);

      expect(Tuit.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tuitToCreate);
    });
  });

  describe("When it receives an invalid tuitToCreate as body in req", () => {
    test("Then it should call next with an error code 400 an a message Ìnvalid tuit`", async () => {
      const tuitToCreate = {
        text: "",
      };

      const req = {
        body: tuitToCreate,
      };

      const next = jest.fn();

      Tuit.create = jest.fn().mockRejectedValue();
      await newTuit(req, null, next);

      expect(Tuit.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteTuit controller", () => {
  describe("When it receives a request with an id 1", () => {
    test("Then it should call the Tuit.findByIdAndDelete with a 1", async () => {
      const id = 1;
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteTuit(req, res, next);
      expect(Tuit.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe("When it receives an invalid id", () => {
    test("Then it should call next with an error with 400", async () => {
      const error = {};
      Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 567,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(error).toHaveProperty("status");
      expect(error.status).toBe(400);
    });
  });
});
