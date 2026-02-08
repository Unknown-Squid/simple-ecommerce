const { sequelize } = require('../../../config/database');
const seedTestAccounts = require('./seedTestAccounts');
const seedTestProducts = require('./seedTestProducts');
const seedTestOrders = require('./seedTestOrders');

const seedAll = async () => {
  try {
    console.log('========================================');
    console.log('Starting database seeding...');
    console.log('========================================\n');

    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established\n');

    // Seed in order: Accounts -> Products -> Orders
    await seedTestAccounts();
    console.log('');

    await seedTestProducts();
    console.log('');

    await seedTestOrders();
    console.log('');

    console.log('========================================');
    console.log('Database seeding completed successfully!');
    console.log('========================================');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await sequelize.close();
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedAll();
}

module.exports = seedAll;
