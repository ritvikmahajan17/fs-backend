const entries = require("../../database/models/entries");
const { getEntitiesByTypeId } = require("../../src/services/entity.services");

describe("getEntitiesByTypeId", () => {
    it("should return an array of entities for a valid typeId", async () => {
        const typeId = 1;
        const expectedEntities = [
            { id: 1, typeId: 1, name: "Entity 1" },
            { id: 2, typeId: 1, name: "Entity 2" },
            { id: 3, typeId: 1, name: "Entity 3" }
        ];
        const findAllSpy = jest.spyOn(entries, "findAll").mockResolvedValueOnce(expectedEntities);
  
        const result = await getEntitiesByTypeId(typeId);
  
        expect(result).toEqual(expectedEntities);
        expect(findAllSpy).toHaveBeenCalledTimes(1);
        expect(findAllSpy).toHaveBeenCalledWith({ where: { typeId } });
  
        findAllSpy.mockRestore();
    });
  
    it("should return an empty array for an invalid typeId", async () => {
        const typeId = 99;
        const expectedEntities = [];
        const findAllSpy = jest.spyOn(entries, "findAll").mockResolvedValueOnce(expectedEntities);
  
        const result = await getEntitiesByTypeId(typeId);
  
        expect(result).toEqual(expectedEntities);
        expect(findAllSpy).toHaveBeenCalledTimes(1);
        expect(findAllSpy).toHaveBeenCalledWith({ where: { typeId } });
  
        findAllSpy.mockRestore();
    });
  
    it("should throw an error if findAll() method rejects", async () => {
        const typeId = 1;
        const errorMessage = "Something went wrong";
        const findAllSpy = jest.spyOn(entries, "findAll").mockRejectedValueOnce(new Error(errorMessage));
  
        await expect(getEntitiesByTypeId(typeId)).rejects.toThrow(errorMessage);
        expect(findAllSpy).toHaveBeenCalledTimes(1);
        expect(findAllSpy).toHaveBeenCalledWith({ where: { typeId } });
  
        findAllSpy.mockRestore();
    });
});