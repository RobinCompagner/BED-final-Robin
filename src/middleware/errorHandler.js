const errorHandler = (err, req, res, next) => {
    if (err.code === 'P2025' || err === null) {
        return res.status(404).json({ message: 'Resource not found' });
    } else if (err.code === 'P2002') {
        return res.status(409).json({ message: 'Resource already exists' });
    } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default errorHandler;

// TODO: add error handling to handle bad requests 400
