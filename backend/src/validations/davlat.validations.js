const { z } = require("zod");

const createDavlatSchema = z.object({
  title: z
    .string()
    .min(2, "Sarlavha kamida 2 ta belgidan iborat bo'lishi kerak"),
  description: z.string().optional(),
  imageUrl: z
    .union([z.string().url("Rasm URL noto'g'ri formatda"), z.literal("")])
    .optional(),
  size: z.float32(),
  flag: z.string().optional(),
  location: z.string(),
});

const updateDavlatSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  imageUrl: z
    .union([z.string().url("Rasm URL noto'g'ri formatda"), z.literal("")])
    .optional(),
  size: z.float32().optional(),
  flag: z.string().optional(),
  location: z.string().optional(),
});

module.exports = { createDavlatSchema, updateDavlatSchema };
