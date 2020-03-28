export const validateSearchQueryParam = (req, res, next) => {
    const { query } = req.query;
    if (query === undefined) {
        return res.status(400).json({
            status: 'error',
            errors: [
                { msg: "'query' is a required query param for this request" }
            ]
        });
    }
    next();
};
