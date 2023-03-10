const services = require("../../services/type.services");
const type = require("../../models/type.model");

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