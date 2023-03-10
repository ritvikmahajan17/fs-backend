const services = require("../../src/services/type.services");
const {type} = require("../../database/models");
const { HTTPError } = require("../../src/error/error");

describe("getAllTypes service", () => {
    it("should return all types", async () => {
       
        type.findAll = jest.fn().mockResolvedValue([
            { id: 1, name: "type1" },
            { id: 2, name: "type2" },
        ]);
  
       
        const result = await services.getAllTypes();
  
        expect(result).toEqual([
            { id: 1, name: "type1" },
            { id: 2, name: "type2" },
        ]);
    });
});

describe("getTypeByName service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it("should return the type details for the given name", async () => {
        const expectedTypeDetails = {
            id: 1,
            typeName: "ExampleType",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
  
       
        jest.spyOn(type, "findOne").mockResolvedValue(expectedTypeDetails);
  
        const result = await services.getTypeByName("ExampleType");
  
        expect(result).toEqual(expectedTypeDetails);
        expect(type.findOne).toHaveBeenCalledWith({ where: { typeName: "ExampleType" } });
    });
  
    it("should return null when the type is not found", async () => {
       
        jest.spyOn(type, "findOne").mockResolvedValue(null);
  
        const result = await services.getTypeByName("NonExistentType");
  
        expect(result).toBeNull();
        expect(type.findOne).toHaveBeenCalledWith({ where: { typeName: "NonExistentType" } });
    });
});

describe("createType", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it("should create a new type", async () => {
        const mockType = { typeName: "test", fields: [] };
        jest.spyOn(type, "findOne").mockResolvedValue(null);
        jest.spyOn(type, "create").mockResolvedValue(mockType);
  
        const body = { typeName: "test", fields: [] };
        const result = await services.createType(body);
  
        expect(type.findOne).toHaveBeenCalledTimes(1);
        expect(type.create).toHaveBeenCalledTimes(1);
        expect(type.create).toHaveBeenCalledWith(body);
        expect(result).toEqual(mockType);
    });
  
    it("should throw an error if type already exists", async () => {
        jest.spyOn(type, "findOne").mockResolvedValue({ typeName: "test", fields: [] });
  
        const body = { typeName: "test", fields: [] };
  
        await expect(services.createType(body)).rejects.toThrow("Type already exists");
        expect(type.findOne).toHaveBeenCalledTimes(1);
    });
});

describe("getFields", () => {
    it("should return the fields of a type", async () => {
        
        const mockType = {
            id: 1,
            typeName: "mockType",
            fields: [
                {
                    fieldName: "field1",
                    type: "text"
                },
                {
                    fieldName: "field2",
                    type: "number"
                }
            ]
        };
        jest.spyOn(type, "findOne").mockResolvedValue(mockType);
  
       
        const result = await services.getFields("mockType");
        expect(result).toEqual(mockType.fields);
    });
  
    it("should throw an HTTPError if the type is not found", async () => {
      
        jest.spyOn(type, "findOne").mockResolvedValue(null);
  
      
        await expect(services.getFields("nonexistentType")).rejects.toThrow(HTTPError);
        await expect(services.getFields("nonexistentType")).rejects.toHaveProperty("code", 404);
    });
});
