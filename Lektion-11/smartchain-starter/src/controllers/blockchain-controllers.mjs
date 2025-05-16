import Blockchain from '../models/Blockchain.mjs';

const blockChain = new Blockchain();

export const listAllBlocks = (req, res) => {
  res.status(200).json({ success: true, data: blockChain });
};

export const addBlock = (req, res) => {
  const { data } = req.body;

  blockChain.addBlock({ data });

  res
    .status(201)
    .json({ success: true, message: 'Block is added', data: blockChain.chain });
  // VERY BAD PRACTICE!!!
  // res.redirect('/');
};
