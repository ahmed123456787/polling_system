const catchAsync = (fn) => {
  return (res, req, next) => {
    fn(res, req, next).catch(next);
  };
};

export default catchAsync;
