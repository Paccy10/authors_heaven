import models from '../../models';

const { reportType: ReportType } = models;

export const checkReportType = async (req, res, next) => {
    const reportType = await ReportType.findOne({
        where: { type: req.body.type }
    });
    if (reportType) {
        return res.status(409).json({
            status: 'error',
            errors: [
                {
                    value: req.body.type,
                    msg: 'Report type already exists',
                    param: 'type',
                    location: 'body'
                }
            ]
        });
    }
    next();
};

export const checkReportTypeExist = async (req, res, next) => {
    const reportType = await ReportType.findByPk(req.body.reportTypeId);
    if (!reportType) {
        return res.status(404).json({
            status: 'error',
            errors: [
                {
                    value: req.body.reportTypeId,
                    msg: 'Report type not found',
                    param: 'reportTypeId',
                    location: 'body'
                }
            ]
        });
    }
    next();
};
