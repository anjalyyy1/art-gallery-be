class APIFeatures {
  // query --> query to be built
  // queryString --> req.query
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      const fields = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(fields);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

module.exports = APIFeatures;
