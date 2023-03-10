const services = require("../../src/services/type.services");
const { HTTPError } = require("../../src/error/error");
const { getAllTypes, getTypeByName, createType, getFields, updateField, editField } = require("../../src/controllers/type.controller");

describe("getAllTypes", () => {
    it("should return all types", async () => {
        const types = [{ name: "type1" }, { name: "type2" }];
        services.getAllTypes = jest.fn().mockResolvedValue(types);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getAllTypes(null, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(types);
    });

    it("should handle HTTPError", async () => {
        const error = new HTTPError("Type not found",404 );
        services.getAllTypes = jest.fn().mockRejectedValue(error);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getAllTypes(null, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it("should handle other errors", async () => {
        const error = new Error("Internal server error");
        services.getAllTypes = jest.fn().mockRejectedValue(error);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getAllTypes(null, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe("getTypeByName", () => {
    it("should return the type when given a valid type name", async () => {
        
        services.getTypeByName = jest.fn().mockResolvedValue({ name: "type1" });
  
       
        const req = { params: { name: "type1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getTypeByName(req, res);
  
       
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ name: "type1" });
    });
  
    it("should return an error message when given an invalid type name", async () => {
       
        services.getTypeByName = jest.fn().mockRejectedValue(new HTTPError("Type not found",404));
  
       
        const req = { params: { name: "invalid_type" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getTypeByName(req, res);
  
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Type not found" });
    });
});

describe("createType function", () => {
    it("should return a status of 201 and the created type", async () => {
       
        const req = { body: { name: "Type" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const expectedType = { name: "Type", id: "abc123" };
  
        services.createType = jest.fn().mockResolvedValue(expectedType);
  
        await createType(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedType);
    });
  
    it("should return a status of 500 and the error message", async () => {
       
        const req = { body: { name: "Type" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const expectedError = new Error("Unable to create type");
  
        services.createType.mockRejectedValue(expectedError);
  
        await createType(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expectedError);
    });
});

describe("getFields", () => {
    it("should return fields when the services call is successful", async () => {
       
        services.getFields = jest.fn().mockResolvedValue(["field1", "field2"]);
  
        const req = { params: { name: "testType" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        await getFields(req, res);
  
       
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(["field1", "field2"]);
    });
  
    it("should return an error message when the services call throws an error", async () => {
       
        services.getFields = jest.fn().mockRejectedValue(new Error("Internal Server Error"));
  
        
        const req = { params: { name: "testType" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
       
        await getFields(req, res);
  
       
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new Error("Internal Server Error"));
    });
});

describe("updateField controller", () => {
    it("should update a field", async () => {
        
        const req = {
            params: {
                name: "field1"
            },
            body: {
                name: "updated field name",
                value: "updated field value"
            }
        };
        const updatedField = {
            name: "updated field name",
            value: "updated field value"
        };
        services.updateField = jest.fn().mockResolvedValueOnce(updatedField);
        const expectedStatus = 200;
        const expectedResponse = updatedField;
  
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        await updateField(req, res);
  
        expect(services.updateField).toHaveBeenCalledWith("field1", req.body);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  
    it("should handle HTTPError", async () => {
       
        const req = {
            params: {
                name: "field1"
            },
            body: {
                name: "updated field name",
                value: "updated field value"
            }
        };
        const error = new HTTPError("Field not found",404 );
        services.updateField=jest.fn().mockRejectedValueOnce(error);
        const expectedStatus = 404;
        const expectedResponse = { message: "Field not found" };
  
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        await updateField(req, res);
  
        expect(services.updateField).toHaveBeenCalledWith("field1", req.body);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  
    it("should handle other errors", async () => {
       
        const req = {
            params: {
                name: "field1"
            },
            body: {
                name: "updated field name",
                value: "updated field value"
            }
        };
        const error = new Error("Something went wrong");
        services.updateField=jest.fn().mockRejectedValueOnce(error);
        const expectedStatus = 500;
        const expectedResponse = error;
  
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        await updateField (req, res);
  
       
        expect(services.updateField).toHaveBeenCalledWith("field1", req.body);
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
});

describe("editField", () => {
    it("should call services.editField with the correct arguments and return the result", async () => {
        const req = {
            params: {
                name: "test"
            },
            body: {
                // body data
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const expectedResult = {
        // expected result data
        };
        const editFieldSpy = jest.spyOn(services, "editField").mockResolvedValue(expectedResult);
  
        await editField(req, res);
  
        expect(editFieldSpy).toHaveBeenCalledWith(req.params.name, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
  
        editFieldSpy.mockRestore();
    });
  
    it("should handle errors correctly", async () => {
        const req = {
            params: {
                name: "test"
            },
            body: {
                // body data
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const error = new Error("test error");
        const editFieldSpy = jest.spyOn(services, "editField").mockRejectedValue(error);
  
        await editField(req, res);
  
        expect(editFieldSpy).toHaveBeenCalledWith(req.params.name, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
  
        editFieldSpy.mockRestore();
    });
});

describe("deleteField", () => {
    it("should call the services.deleteField method and return the deleted type", async () => {
        const type = {
            id: 1,
            name: "exampleType",
            fields: [
                {
                    name: "field1",
                    type: "text"
                },
                {
                    name: "field2",
                    type: "number"
                }
            ]
        };
        const req = {
            params: {
                name: "field1"
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const deleteFieldSpy = jest.spyOn(services, "deleteField").mockResolvedValue(type);
  
        await services.deleteField(req, res);
  
        expect(deleteFieldSpy).toHaveBeenCalledWith(req.params.name, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(type);
  
        deleteFieldSpy.mockRestore();
    });
  
    it("should return an error message if services.deleteField throws an error", async () => {
        const errorMessage = "Unable to delete field";
        const req = {
            params: {
                name: "field1"
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const deleteFieldSpy = jest.spyOn(services, "deleteField").mockRejectedValue(new Error(errorMessage));
  
        await services.deleteField(req, res);
  
        expect(deleteFieldSpy).toHaveBeenCalledWith(req.params.name, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  
        deleteFieldSpy.mockRestore();
    });
});


