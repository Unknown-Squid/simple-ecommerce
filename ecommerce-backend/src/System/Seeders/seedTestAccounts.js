const bcrypt = require('bcryptjs');
const { User } = require('../ModelsRelationship/models');

const seedTestAccounts = async () => {
  try {
    console.log('Seeding test accounts...');

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('customer123', 10);
    const janePassword = await bcrypt.hash('jane123', 10);

    const testAccounts = [
      {
        email: 'admin@test.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true
      },
      {
        email: 'customer@test.com',
        password: customerPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer',
        isActive: true
      },
      {
        email: 'jane@test.com',
        password: janePassword,
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'customer',
        isActive: true
      }
    ];

    for (const account of testAccounts) {
      const [user, created] = await User.findOrCreate({
        where: { email: account.email },
        defaults: account
      });

      if (created) {
        console.log(`✓ Created test account: ${account.email}`);
      } else {
        console.log(`- Account already exists: ${account.email}`);
      }
    }

    console.log('Test accounts seeding completed!');
    return true;
  } catch (error) {
    console.error('Error seeding test accounts:', error);
    throw error;
  }
};

module.exports = seedTestAccounts;
