const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with an error", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const mockedResponse = mockResponse();

      notFoundError(null, mockedResponse);

      expect(mockedResponse.json).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives an error and a response", () => {
    test("Then it should call method json with an error with code 500", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const error = {
        message: "error",
        code: 500,
      };

      const mockedRes = mockResponse();

      generalError(error, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });
});
