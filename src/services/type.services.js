const {type} = require("../../database/models");
const { HTTPError } = require("../error/error");

const getAllTypes = async () => {
    const types = await type.findAll();
    return types;
};

const getTypeByName = async (name) => {
    const typeDetails = await type.findOne({where: {typeName: name}});
    return typeDetails;
};

const createType = async (body) => {
    
    const typeName = body.typeName;
    console.log(typeName);
    const isType = await type.findOne({where: {typeName: typeName}});
    console.log(isType);
    if (isType) {
        throw new HTTPError("Type already exists",409);
    }
    body.fields = [];
    console.log(body);
    const typeDetails = await type.create(body);
    return typeDetails;
};

const getFields = async (name) => {
    const typeDetails = await type.findOne({where: {typeName: name}});
    if (!typeDetails) {
        throw new HTTPError("Type not found",404);
    }
    const fields = typeDetails.fields;
    return fields;
};

const updateField = async (name, body) => {
    // console.log(name,body);
    const typeDetails = await type.findOne({where: {typeName: name}});
    if (!typeDetails) {
        throw new HTTPError("Type not found",404);
    }
    const fields = typeDetails.fields;
    const field = fields.find(field => field === body.field);
    if (field) {
        throw new HTTPError("Field already exists",409);
    }
    fields.push(body.field);
    const updatedType = await type.update({fields: fields}, {where: {typeName: name}});
    return updatedType;
};

const editField = async (name, body) => {
    console.log(name,body.oldField,body.newField);
    const typeDetails = await type.findOne({where: {typeName: name}});
    // console.log(typeDetails);
    if (!typeDetails) {
        throw new HTTPError("Type not found",404);
    }
    const fields = typeDetails.fields;

    const field = fields.find(field => field === body.oldField);
    console.log(field);
    if (!field) {
        throw new HTTPError("Field not found",404);
    }
    const index = fields.indexOf(field);
    fields[index] = body.newField;
    const updatedType = await type.update({fields: fields}, {where: {typeName: name}});
    return updatedType;
};

const deleteField = async (name,body) => {
    const typeDetails = await type.findOne({where: {typeName: name}});
    if (!typeDetails) {
        throw new HTTPError("Type not found",404);
    }
    const fields = typeDetails.fields;
    const field = fields.find(field => field === body.field);
    if (!field) {
        throw new HTTPError("Field not found",404);
    }
    const index = fields.indexOf(field);
    fields.splice(index, 1);
    const updatedType = await type.update({fields: fields}, {where: {typeName: name}});
    return updatedType;
    
};

const deleteType = async (name) => {
    const typeDetails = await type.findOne({where: {typeName: name}});
    if (!typeDetails) {
        throw new HTTPError("Type not found",404);
    }
    const deletedType = await type.destroy({where: {typeName: name}});
    return deletedType;
};

module.exports = {
    getAllTypes,
    getTypeByName,
    createType,
    updateField,
    deleteField,
    getFields,
    deleteType,
    editField
};

