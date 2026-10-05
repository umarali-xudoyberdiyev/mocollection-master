const prisma = require("../prisma");

const getAll_Davlat = async (req, res, next) => {
  try {
    const items = await prisma.davlat.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

const getById_Davlat = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid id" });
    }

    const item = await prisma.davlat.findFirst({
      where: { id, userId: req.userId },
    });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, error: "Davlat topilmadi" });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

const create_Davlat = async (req, res, next) => {
  try {
    const { title, description, imageUrl, size, flag, location } = req.body;
    console.log(req.userId);
    const item = await prisma.davlat.create({
      data: {
        title,
        location,
        size,
        description,
        imageUrl: imageUrl || null,
        flag,
        userId: req.userId,
      },
    });

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

const update_Davlat = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid id" });
    }

    const existing = await prisma.davlat.findFirst({
      where: { id, userId: req.userId },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Davlat topilmadi" });
    }

    const item = await prisma.davlat.update({
      where: { id },
      data: req.body,
    });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

const remove_Davlat = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid id" });
    }

    const existing = await prisma.davlat.findFirst({
      where: { id, userId: req.userId },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Davlat topilmadi" });
    }

    await prisma.davlat.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll_Davlat,
  getById_Davlat,
  create_Davlat,
  update_Davlat,
  remove_Davlat,
};
