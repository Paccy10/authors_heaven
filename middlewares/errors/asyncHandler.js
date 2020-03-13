import * as responses from '../../utils/responses';

const asyncHandler = func => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            responses.errorResponse.errors = [{ msg: error.message }];
            res.status(500).json(responses.errorResponse);
        }
    };
};

export default asyncHandler;
