const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    if (error.name === 'SyntaxError') {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { unknownEndpoint, errorHandler };
