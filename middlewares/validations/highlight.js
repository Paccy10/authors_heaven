export const checkIndeces = async (req, res, next) => {
    const { indexStart, indexEnd } = req.body;
    if (indexEnd <= indexStart) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: "'indexEnd' must be greater than 'indexStart'" }]
        });
    }
    next();
};
