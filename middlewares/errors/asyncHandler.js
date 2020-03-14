const asyncHandler = func => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                errors: [{ msg: error.message }]
            });
        }
    };
};

export default asyncHandler;
