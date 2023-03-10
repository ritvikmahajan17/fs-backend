const joi = require("joi");

const schema = joi.object({
    id: joi.number().integer().min(1).required(),
});

const reqValidation = (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
module.exports = reqValidation;
