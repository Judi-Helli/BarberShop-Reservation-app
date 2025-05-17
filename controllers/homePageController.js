let handleHelloWorld = async (req, res) => {
    return res.render("index.ejs",{ 
        name: req.body.name
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
