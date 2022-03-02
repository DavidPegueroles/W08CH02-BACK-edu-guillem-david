const Tuit = require("../../database/models/Tuit");
const { showTuits } = require("./tuitahControllers");

jest.mock("../../database/models/Tuit");

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
