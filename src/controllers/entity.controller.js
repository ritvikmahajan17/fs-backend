const { HTTPError } = require("../error/error");
const services = require("../services/entity.services");


const getEntitiesByTypeId = async (req, res) => {
    try {
        const entities = await services.getEntitiesByTypeId(req.params.id);
        res.status(200).json(entities);
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

const createEntity = async (req, res) => {
    try {
        console.log("create");
        const entity = await services.createEntity(req.params.id,req.body);
        res.status(201).json(entity);
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

const updateEntity = async (req, res) => {
    try {
        console.log(req.body);
        const entity = await services.updateEntity(req.params.id, req.body);
        res.status(200).json(entity);
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

const deleteEntity = async (req, res) => {
    try {
        const entity = await services.deleteEntity(req.params.id);
        res.status(200).json(entity);
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

const getEntryNumberOfEachType = async (req, res) => {
    try {
        const entity = await services.getEntryNumberOfEachType();
        res.status(200).json(entity);
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

module.exports = { getEntitiesByTypeId, createEntity, updateEntity, deleteEntity, getEntryNumberOfEachType };
