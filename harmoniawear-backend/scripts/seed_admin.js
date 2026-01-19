// scripts/seed_admin.js
/* eslint-env node */
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

(async () => {
  const hash = await bcrypt.hash('Admin.1234', 10);
  await prisma.user.upsert({
    where: { email: 'contact@harmoniawear.com' },
    update: {},
    create: {
      email: 'contact@harmoniawear.com',
      password: hash,
      firstName: 'Aziz',
      lastName: 'HW',
      role: 'ADMIN',      // Rôle administrateur
      address: 'Siège',
    },
  });
  console.log('✅ Admin prêt');
  process.exit(0);
})();
