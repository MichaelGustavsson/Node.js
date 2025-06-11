import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import AppError from '../models/appError.mjs';
import ManufacturerRepository from '../repositories/manufactures-repository.mjs';

export const addManufacturer = catchErrorAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(
      new AppError('Du har missat att skicka in ett namn på tillverkaren', 400)
    );
  }

  const manufacturer = await new ManufacturerRepository().add(name);

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { manufacturer: manufacturer },
  });
});

export const findManufacturer = catchErrorAsync(async (req, res, next) => {
  const manufacturer = await new ManufacturerRepository().find(req.params.id);

  if (!manufacturer) {
    return next(
      new AppError(
        `Kunde inte hitta någon tillverkare med id: ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { manufacturer: manufacturer },
  });
});

export const listManufacturers = catchErrorAsync(async (req, res, next) => {
  const manufacturers = await new ManufacturerRepository().list();

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { manufacturers: manufacturers },
  });
});
