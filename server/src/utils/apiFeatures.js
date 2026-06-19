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

    // Filter by category and price
    filter() {
        const queryCopy = { ...this.queryStr };

        // Remove fields that are not filters
        const removeFields = [
            "keyword",
            "page",
            "limit",
            "sort"
        ];

        removeFields.forEach(field => delete queryCopy[field]);

        // Price filtering
        if (this.queryStr.minPrice || this.queryStr.maxPrice) {
            queryCopy.price = {};

            if (this.queryStr.minPrice) {
                queryCopy.price.$gte = Number(this.queryStr.minPrice);
            }

            if (this.queryStr.maxPrice) {
                queryCopy.price.$lte = Number(this.queryStr.maxPrice);
            }
        }

        this.query = this.query.find(queryCopy);

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