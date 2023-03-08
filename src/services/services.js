const {demo} = require("../../database/models");

const getHelloWorld = () => {
    return "Hello World";
};

const addData = async (data) => {
    return await demo.create(data);
};

const getData = async () => {
    return await demo.findAll();
};

const addToCart = async (product,id) => {
    const user = await demo.findOne({where: {id: id}});
    const cart = user.cart;
    cart.push(product);
    return await demo.update({cart: cart}, {where: {id: id}});
};


module.exports = { getHelloWorld,addData,getData,addToCart };