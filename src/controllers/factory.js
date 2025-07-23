import catchAsync from "../utils/catchAsync.js";

export const createOne = (Model) =>
  catchAsync(async (req, res) => {
    await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;

    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: `${Model.modelName} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

export const getAll = (Model, filterOptions) =>
  catchAsync(async (req, res) => {
    let filter = filterOptions || {};

    const docs = await Model.find(filter);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        [Model.collection.collectionName]: docs,
      },
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: `${Model.modelName} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: `${Model.modelName} not found`,
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
