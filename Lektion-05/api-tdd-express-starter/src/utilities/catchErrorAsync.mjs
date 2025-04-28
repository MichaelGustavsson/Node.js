export const catchErrorAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
