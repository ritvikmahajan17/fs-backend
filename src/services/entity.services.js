const { entries } = require("../../database/models");
const { HTTPError } = require("../error/error");
const { sequelize } = require("../../database/models");

const getEntitiesByTypeId = async (id) => {
    return await entries.findAll({where: {typeId: id}});
};

const createEntity = async (id,body) => {
    console.log(body);
    return await entries.create({
        typeId: id,
        data: body,
    });
};

const updateEntity = async (id, body) => {
    const entity = await entries.findOne({where: {id: id}});
    if (!entity) {
        throw new HTTPError("Entity not found",404);
    }
    const typeId = entity.typeId;

    const newBody = {
        typeId: typeId,
        data: body
    };

    return await entries.update(newBody, {where: {id: id}});
};

const deleteEntity = async (id) => {
    return await entries.destroy({where: {id: id}});
};

const getEntryNumberOfEachType = async () => {
    return await entries.findAll({
        attributes: ["typeId", [sequelize.fn("COUNT", sequelize.col("typeId")), "count"]],
        group: ["typeId"]
    });
};

module.exports = {
    getEntitiesByTypeId,
    createEntity,
    updateEntity,
    deleteEntity,
    getEntryNumberOfEachType
};