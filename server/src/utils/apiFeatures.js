class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;         // Product.find()
        this.queryStr = queryStr;   // req.query
    }

    // Search by product name
    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: "i"
                  }
              }
            : {};

        this.query = this.query.find(keyword);
        return this;
    }

 filter() {
    const queryObj = { ...this.queryStr };

    // remove non-filter fields
    ["keyword", "page", "limit", "sort"].forEach(el => delete queryObj[el]);

    let mongoQuery = {};

    // CATEGORY FILTER
    if (queryObj.category) {
        mongoQuery.category = queryObj.category;
    }

    // PRICE FILTER
    if (queryObj.minPrice || queryObj.maxPrice) {
        mongoQuery.price = {};

        if (queryObj.minPrice) {
            mongoQuery.price.$gte = Number(queryObj.minPrice);
        }

        if (queryObj.maxPrice) {
            mongoQuery.price.$lte = Number(queryObj.maxPrice);
        }
    }

    this.query = this.query.find(mongoQuery);

    return this;
}
    // Sort products
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort;

            if (sortBy === "price_asc") {
                this.query = this.query.sort({ price: 1 });
            }

            if (sortBy === "price_desc") {
                this.query = this.query.sort({ price: -1 });
            }

            if (sortBy === "newest") {
                this.query = this.query.sort({ createdAt: -1 });
            }
        }

        return this;
    }

    // Pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query
            .limit(resultPerPage)
            .skip(skip);

        return this;
    }
}

export default APIFeatures;