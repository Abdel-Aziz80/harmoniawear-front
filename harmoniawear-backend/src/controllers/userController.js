/* eslint-env node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateMe = async (req, res, next) => {
  try {
    const { firstName, lastName, address } = req.body || {};
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { firstName, lastName, address },
      select: { id: true, email: true, firstName: true, lastName: true, address: true, role: true }
    });
    res.json({ ok: true, user });
  } catch (e) { next(e); }
};
