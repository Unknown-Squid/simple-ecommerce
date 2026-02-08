const Product = require('../Models/Product');
const Order = require('../Models/Order');
const OrderItem = require('../Models/OrderItem');

class StoreService {
  // Product methods
  async getAllProducts(filters = {}) {
    const where = {};
    
    if (filters.category) {
      where.category = filters.category;
    }
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    } else {
      where.isActive = true;
    }

    return await Product.findAll({ where, order: [['createdAt', 'DESC']] });
  }

  async getProductById(productId) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(productId, updateData) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    await product.update(updateData);
    return product;
  }

  async deleteProduct(productId) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    await product.destroy();
    return { message: 'Product deleted successfully' };
  }

  // Order methods
  async createOrder(userId, orderData) {
    const { items, shippingAddress } = orderData;
    
    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      userId,
      totalAmount,
      shippingAddress,
      status: 'pending'
    });

    // Create order items and update stock
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      // Update product stock
      await product.update({
        stock: product.stock - item.quantity
      });
    }

    return await this.getOrderById(order.id);
  }

  async getOrderById(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product'
            }
          ]
        }
      ]
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async getUserOrders(userId) {
    return await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product'
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    await order.update({ status });
    return order;
  }
}

module.exports = new StoreService();
