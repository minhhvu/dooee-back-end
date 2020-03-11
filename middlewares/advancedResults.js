const advancedResults = (model, populate) => async (req, res, next) => {
    let query;

    //Copy req.query
    let reqQuery = {...req.query};

    //Remove fields in query
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operator ($gt, $gte, ...)
    queryStr = queryStr.replace(/\b(gt|gte|ls|lte|in)\b/g, match => `$${match}`);

    //Find resource with filter
    query = model.find(JSON.parse(queryStr));

    //Select field
    if (req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query.select(fields);
    }

    //Sort
    if (req.query.sort){
        const fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        query = query.sort('-createAt');//Sort by time 
    }

    //Pagination
    let pagination ={};
    if (req.query.limit || req.query.page) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 1;
        const startIndex = (page -1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments();

        query = query.skip(startIndex).limit(limit);

        if (startIndex>0) {
            pagination.prev = {page: page - 1, limit}
        }

        if (endIndex<total) {
            pagination.next = {page: page +1 , limit}
        }
    }

    //Populate
    if (populate){
        query.populate(populate);
    }

    //Execute query
   const results = await query;

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
};

module.exports = advancedResults