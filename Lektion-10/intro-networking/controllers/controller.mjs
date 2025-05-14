export const getInfo = (req, res) => {
  res.status(200).json({ success: true, message: `${req.headers.host}` });
};
