import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import ManufacturerRepository from '../repositories/manufacturers-repository.mjs';
import AppError from '../models/appError.mjs';

export const addManufacturer = catchErrorAsync(async (req, res, next) => {
  const manufacturer = await new ManufacturerRepository().add(req.body);

  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { manufacturer } });
});
