const { tokenValidator } = require("../../src/middleware/auth.middleware");

jest.mock("node-fetch"); // Mock the 'node-fetch' library

describe("tokenValidator", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    it("should return a 401 error if no token is provided", async () => {
        const req = { headers: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await tokenValidator(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Token not found" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should return a 401 error if an invalid token is provided", async () => {
        const req = { headers: { authorization: "invalid-token" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        const mockResponse = { json: jest.fn().mockResolvedValueOnce({ message: "Invalid Token" }) };
        fetch.mockResolvedValueOnce(mockResponse);

        await tokenValidator(req, res, next);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("http://localhost:8000/auth/token/validate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "invalid-token",
            },
        });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid Token" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call the next middleware if a valid token is provided", async () => {
        const req = { headers: { authorization: "valid-token" } };
        const res = { status: jest.fn(), json: jest.fn() };
        const next = jest.fn();
        const mockResponse = { json: jest.fn().mockResolvedValueOnce({ message: "valid" }) };
        fetch.mockResolvedValueOnce(mockResponse);

        await tokenValidator(req, res, next);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("http://localhost:8000/auth/token/validate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "valid-token",
            },
        });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the fetch() method rejects", async () => {
        const req = { headers: { authorization: "valid-token" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        const errorMessage = "Something went wrong";
        fetch.mockRejectedValueOnce(new Error(errorMessage));

        await expect(tokenValidator(req, res, next)).rejects.toThrow(errorMessage);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("http://localhost:8000/auth/token/validate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "valid-token",
            },
        });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});