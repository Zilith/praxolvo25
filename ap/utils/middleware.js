const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    // specific error handling
    if (error.name === 'SyntaxError') {
        res.status(400).send({ error: error.message });
    } else {
        // general error handling
        res.status(400).send({ error: error.name, message: error.message });
    }
};

module.exports = { unknownEndpoint, errorHandler };
