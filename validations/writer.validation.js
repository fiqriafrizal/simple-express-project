
const { z } = require("zod");
const { Writer } = require("../models");

const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const baseWriterBody = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .refine(
      async (value) => {
        const writer = await Writer.findOne({ where: { email: value } });
        return !writer;
      },
    ),
  bio: z.string().optional().nullable(),
});

const createWriterSchema = baseWriterBody;
const updateWriterSchema = baseWriterBody.partial();

module.exports = {
  idParamsSchema,
  createWriterSchema,
  updateWriterSchema,
};
