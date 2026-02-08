const { sequelize } = require('../../../config/database');
const User = require('../../Account/Models/User');
const Product = require('../../Store/Models/Product');
const Order = require('../../Store/Models/Order');
const OrderItem = require('../../Store/Models/OrderItem');
const Payment = require('../../Payment/Models/Payment');

// ============================================
// USER RELATIONSHIPS
// ============================================
// User has many Orders
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders',
  onDelete: 'RESTRICT', // Prevent deleting user with orders
  onUpdate: 'CASCADE'
});

// ============================================
// ORDER RELATIONSHIPS
// ============================================
// Order belongs to User
Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

// Order has many OrderItems
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE', // Delete order items when order is deleted
  onUpdate: 'CASCADE'
});

// Order has many Payments
Order.hasMany(Payment, {
  foreignKey: 'orderId',
  as: 'payments',
  onDelete: 'CASCADE', // Delete payments when order is deleted
  onUpdate: 'CASCADE'
});

// Order has many Products (through OrderItems)
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});

// ============================================
// ORDER ITEM RELATIONSHIPS
// ============================================
// OrderItem belongs to Order
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// OrderItem belongs to Product
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
  onDelete: 'RESTRICT', // Prevent deleting product that's in orders
  onUpdate: 'CASCADE'
});

// ============================================
// PRODUCT RELATIONSHIPS
// ============================================
// Product has many OrderItems
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

// Product has many Orders (through OrderItems)
Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

// ============================================
// PAYMENT RELATIONSHIPS
// ============================================
// Payment belongs to Order
Payment.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Sync database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Payment,
  syncDatabase
};
