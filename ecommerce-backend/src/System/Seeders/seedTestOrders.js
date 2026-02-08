const { Order, OrderItem, User, Product } = require('../ModelsRelationship/models');

const seedTestOrders = async () => {
  try {
    console.log('Seeding test orders...');

    // Get test user
    const customer = await User.findOne({ where: { email: 'customer@test.com' } });
    if (!customer) {
      console.log('Customer account not found. Please seed test accounts first.');
      return false;
    }

    // Get some products
    const products = await Product.findAll({ limit: 3 });
    if (products.length < 2) {
      console.log('Not enough products found. Please seed test products first.');
      return false;
    }

    const testOrders = [
      {
        userId: customer.id,
        totalAmount: products[0].price * 2 + products[1].price,
        status: 'delivered',
        shippingAddress: '123 Main Street, City, State 12345'
      },
      {
        userId: customer.id,
        totalAmount: products[1].price * 3,
        status: 'processing',
        shippingAddress: '123 Main Street, City, State 12345'
      },
      {
        userId: customer.id,
        totalAmount: products[0].price,
        status: 'pending',
        shippingAddress: '123 Main Street, City, State 12345'
      }
    ];

    for (let i = 0; i < testOrders.length; i++) {
      const orderData = testOrders[i];
      
      // Check if order already exists
      const existingOrder = await Order.findOne({
        where: {
          userId: orderData.userId,
          totalAmount: orderData.totalAmount,
          status: orderData.status
        }
      });

      if (existingOrder) {
        console.log(`- Order already exists for customer`);
        continue;
      }

      const order = await Order.create(orderData);

      // Create order items
      if (i === 0) {
        // First order: 2 of product 0, 1 of product 1
        await OrderItem.create({
          orderId: order.id,
          productId: products[0].id,
          quantity: 2,
          price: products[0].price
        });
        await OrderItem.create({
          orderId: order.id,
          productId: products[1].id,
          quantity: 1,
          price: products[1].price
        });
      } else if (i === 1) {
        // Second order: 3 of product 1
        await OrderItem.create({
          orderId: order.id,
          productId: products[1].id,
          quantity: 3,
          price: products[1].price
        });
      } else {
        // Third order: 1 of product 0
        await OrderItem.create({
          orderId: order.id,
          productId: products[0].id,
          quantity: 1,
          price: products[0].price
        });
      }

      console.log(`✓ Created test order #${order.id} with status: ${order.status}`);
    }

    console.log('Test orders seeding completed!');
    return true;
  } catch (error) {
    console.error('Error seeding test orders:', error);
    throw error;
  }
};

module.exports = seedTestOrders;
