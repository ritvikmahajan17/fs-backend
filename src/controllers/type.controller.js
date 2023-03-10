const { HTTPError } = require("../error/error");
const services = require("../services/type.services");


const getAllTypes = async (req, res) => {
    try {
        const types = await services.getAllTypes();
        res.status(200).json(types);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const getTypeByName = async (req, res) => {
    try {
        const type = await services.getTypeByName(req.params.name);
        res.status(200).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const createType = async (req, res) => {
    try {
        console.log(req.body);
        const type = await services.createType(req.body);
        res.status(201).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const getFields = async (req, res) => {
    try {
        const fields = await services.getFields(req.params.name);
        res.status(200).json(fields);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const updateField = async (req, res) => {
    try {
        // console.log(req.params.name, req.body);
        console.log("hello");
        const type = await services.updateField(req.params.name, req.body);
        res.status(200).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const editField = async (req, res) => {
    try {
        console.log(req.params.name, req.body);
        const type = await services.editField(req.params.name,req.body);
        res.status(200).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

const deleteField = async (req, res) => {
    try {
        const type = await services.deleteField(req.params.name,req.body);
        res.status(200).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error.message);
        }
    }
};

const deleteType = async (req, res) => {
    try {
        const type = await services.deleteType(req.params.name);
        res.status(200).json(type);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json(error);
        }
    }
};

module.exports = {
    getAllTypes,
    getTypeByName,
    createType,
    getFields,
    updateField,
    deleteField,
    deleteType,
    editField
};
