const paginate = async (req, model, parameters) => {
    const { page = 1, limit = 20 } = req.query;
    const rootUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
    const response = await model.findAndCountAll({
        where: parameters.where,
        offset: (Number(page) - 1) * Number(limit),
        limit,
        order: parameters.order,
        include: parameters.include,
        attributes: parameters.attributes
    });
    const metaData = {
        currentPage: `${rootUrl}?page=${page}&limit=${limit}`,
        previousPage:
            page > 1
                ? `${rootUrl}?page=${parseInt(page, 10) - 1}&limit=${limit}`
                : null,
        nextPage:
            Math.ceil(response.count / limit) > page
                ? `${rootUrl}?page=${parseInt(page, 10) + 1}&limit=${limit}`
                : null,
        totalPages: Math.ceil(response.count / limit),
        totalRecords: response.count
    };

    return { metaData, data: response.rows };
};

export default paginate;
