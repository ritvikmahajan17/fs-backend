const services = require("../services/services");


const getHelloWorld = (req, res) => {
    try {
        const data = services.getHelloWorld(req,res);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const getData = async (req, res) => {
    try {
        const data = await services.getData(req,res);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const addData = async (req, res) => {
    try {
        const data = await services.addData(req.body);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const addToCart = async (req, res) => {
    try {
        const data = await services.addToCart(req.body.product,req.body.id);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

module.exports = { getHelloWorld,addData,getData, addToCart};