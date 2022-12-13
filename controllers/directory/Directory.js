var Directory = require('../../models/DirectoryModel');

/*=============== Get All forms ============================*/
module.exports.searchDirectoryData = (req, res) => {
    try {
        const pageSize = 5;
        const search = req.query.query || '' ;
        const page = parseInt(req.query.page);
        Directory.countDirectoryMessages((error1, total) => {
            Directory.getAllSearchDirectory(search,page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Directory message successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    users: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}