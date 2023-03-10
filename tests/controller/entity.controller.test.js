const services = require("../../src/services/entity.services");
const controller = require("../../src/controllers/entity.controller");
const { HTTPError } = require("../../src/error/error");

describe("getEntitiesByTypeId", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
  
    it("should return entities when successful", async () => {
        const mockEntities = [{ id: 1, name: "Entity 1" }, { id: 2, name: "Entity 2" }];
        jest.spyOn(services, "getEntitiesByTypeId").mockResolvedValueOnce(mockEntities);
        const mockReq = { params: { id: 1 } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await controller.getEntitiesByTypeId(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockEntities);
    });
  
    it("should return an error when unsuccessful", async () => {
        const mockError = new Error("Something went wrong");
        jest.spyOn(services, "getEntitiesByTypeId").mockRejectedValueOnce(mockError);
        const mockReq = { params: { id: 1 } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await controller.getEntitiesByTypeId(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith(mockError);
    });
});

describe("createEntity", () => {
    const req = {
        params: { id: 123 },
        body: { name: "test" }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
  
    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it("should create a new entity and return it", async () => {
        const expectedEntity = { id: 456, name: "test" };
        jest.spyOn(services, "createEntity").mockResolvedValue(expectedEntity);
  
        await controller.createEntity(req, res);
  
        expect(services.createEntity).toHaveBeenCalledWith(123, { name: "test" });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedEntity);
    });

});

describe("updateEntity", () => {
    it("should call services.updateEntity and return the updated entity", async () => {
        const id = "some_id";
        const body = { name: "updated name" };
        const updatedEntity = { id: "some_id", name: "updated name", createdAt: new Date(), updatedAt: new Date() };
        jest.spyOn(services, "updateEntity").mockResolvedValue(updatedEntity);
        const req = { params: { id }, body };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await controller.updateEntity(req, res);
  
        expect(services.updateEntity).toHaveBeenCalledWith(id, body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedEntity);
    });
  
    it("should return an error if services.updateEntity throws an error", async () => {
        const id = "some_id";
        const body = { name: "updated name" };
        const errorMessage = "Something went wrong";
        jest.spyOn(services, "updateEntity").mockRejectedValue(new Error(errorMessage));
        const req = { params: { id }, body };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await controller.updateEntity(req, res);
  
        expect(services.updateEntity).toHaveBeenCalledWith(id, body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new Error(errorMessage));
    });
  
    it("should return an HTTP error if services.updateEntity throws an HTTPError", async () => {
        const id = "some_id";
        const body = { name: "updated name" };
        const errorCode = 400;
        const errorMessage = "Bad Request";
        jest.spyOn(services, "updateEntity").mockRejectedValue(new HTTPError( errorMessage,errorCode,));
        const req = { params: { id }, body };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await controller.updateEntity(req, res);
  
        expect(services.updateEntity).toHaveBeenCalledWith(id, body);
        expect(res.status).toHaveBeenCalledWith(errorCode);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});

describe("deleteEntity", () => {
    it("calls services.deleteEntity and returns the response", async () => {
       
        const mockResponse = { success: true };
  
       
        jest.spyOn(services, "deleteEntity").mockResolvedValueOnce(mockResponse);
  
       
        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
       
        await controller.deleteEntity(req, res);
  
       
        expect(services.deleteEntity).toHaveBeenCalledWith("123");
  
       
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  
    it("returns a 500 error if services.deleteEntity throws an error", async () => {
       
        const mockError = new Error("mock error");
  
        
        jest.spyOn(services, "deleteEntity").mockRejectedValueOnce(mockError);
  
       
        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        
        await controller.deleteEntity(req, res);
  
       
        expect(services.deleteEntity).toHaveBeenCalledWith("123");
  
       
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new Error("mock error"));
    });
});

describe("getEntryNumberOfEachType", () => {
    it("should call services.getEntryNumberOfEachType and return the result", async () => {
        const expectedEntity = [{ type: "A", count: 2 }, { type: "B", count: 3 }];
        const getEntryNumberOfEachTypeSpy = jest.spyOn(services, "getEntryNumberOfEachType").mockResolvedValue(expectedEntity);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await controller.getEntryNumberOfEachType(req, res);
        expect(getEntryNumberOfEachTypeSpy).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedEntity);
    });
  
    it("should handle errors", async () => {
        const expectedError = new HTTPError( "Not Found",404);
        const getEntryNumberOfEachTypeSpy = jest.spyOn(services, "getEntryNumberOfEachType").mockRejectedValue(expectedError);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await controller.getEntryNumberOfEachType(req, res);
        expect(getEntryNumberOfEachTypeSpy).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: expectedError.message });
    });
});