const tokenValidator = async (req,res,next) => {
    const token = req.headers.authorization;
    // console.log(token);
    if(!token){
        return res.status(401).json({message: "Token not found"});
    }
    const data = await fetch("http://localhost:8000/auth/token/validate",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
        }
    });
    //console.log(data.username);
    const result = await data.json();
    console.log(result);

    //console.log(checkValid.status, checkValid.valid);
    next();
};

module.exports = { tokenValidator };