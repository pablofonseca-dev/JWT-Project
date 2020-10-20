module.exports.home_get = ((request, response) => {
    response.render("index");
    response.statusCode = 200;
    response.end(); 
});

