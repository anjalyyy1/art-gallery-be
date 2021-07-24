module.exports = (fn) => {
  return (req, res, next) => {
    // the function we pass will return a promise,th4 we can chain catch to it
    fn(req, res, next).catch(next); // this will call the global error handler which has 4 args

    // (err) => next(err) ====> next
  };
};
