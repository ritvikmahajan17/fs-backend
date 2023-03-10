const { entries } = require("../../database/models");

const getEntitiesByTypeId = async (id) => {
    return await entries.findAll({where: {typeId: id}});
};

const createEntity = async (id,body) => {
    return await entries.create({
        typeId: id,
        data: body.data,
    });
};

const updateEntity = async (id, body) => {
    return await entries.update(body, {where: {id: id}});
};

const deleteEntity = async (id) => {
    return await entries.destroy({where: {id: id}});
};

module.exports = {
    getEntitiesByTypeId,
    createEntity,
    updateEntity,
    deleteEntity
};