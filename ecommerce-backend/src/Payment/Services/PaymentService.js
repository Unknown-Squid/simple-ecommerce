const Payment = require('../Models/Payment');
const Order = require('../../Store/Models/Order');

class PaymentService {
  async createPayment(paymentData) {
    const { orderId, amount, paymentMethod } = paymentData;

    // Verify order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Verify amount matches order total
    if (parseFloat(amount) !== parseFloat(order.totalAmount)) {
      throw new Error('Payment amount does not match order total');
    }

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const payment = await Payment.create({
      orderId,
      amount,
      paymentMethod,
      transactionId,
      status: 'pending'
    });

    // Simulate payment processing (in real app, integrate with payment gateway)
    setTimeout(async () => {
      try {
        // Simulate success (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        await payment.update({
          status: isSuccess ? 'completed' : 'failed'
        });

        if (isSuccess) {
          await order.update({ status: 'processing' });
        }
      } catch (error) {
        console.error('Payment processing error:', error);
      }
    }, 2000);

    return payment;
  }

  async getPaymentById(paymentId) {
    const payment = await Payment.findByPk(paymentId, {
      include: [
        {
          model: Order,
          as: 'order'
        }
      ]
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return payment;
  }

  async getPaymentsByOrderId(orderId) {
    return await Payment.findAll({
      where: { orderId },
      include: [
        {
          model: Order,
          as: 'order'
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async updatePaymentStatus(paymentId, status) {
    const payment = await Payment.findByPk(paymentId);
    
    if (!payment) {
      throw new Error('Payment not found');
    }

    await payment.update({ status });
    return payment;
  }
}

module.exports = new PaymentService();
