export const myLogger = async (req, res, next) => {
  console.log(req.headers["authorization"]);
  next();
};
