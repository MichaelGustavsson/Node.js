import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import ManufacturerRepository from '../repositories/manufacturers-repository.mjs';
import AppError from '../models/appError.mjs';

export const addManufacturer = catchErrorAsync(async (req, res, next) => {
  let manufacturer = await new ManufacturerRepository().add(req.body);

  manufacturer = await new ManufacturerRepository().find(req.body.name);
  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { manufacturer } });
});
