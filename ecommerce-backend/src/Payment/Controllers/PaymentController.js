const paymentService = require('../Services/PaymentService');

class PaymentController {
  async createPayment(req, res) {
    try {
      const payment = await paymentService.createPayment(req.body);
      res.status(201).json({
        success: true,
        message: 'Payment initiated successfully',
        data: payment
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      res.status(200).json({
        success: true,
        data: payment
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getPaymentsByOrderId(req, res) {
    try {
      const payments = await paymentService.getPaymentsByOrderId(req.params.orderId);
      res.status(200).json({
        success: true,
        data: payments
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updatePaymentStatus(req, res) {
    try {
      const payment = await paymentService.updatePaymentStatus(req.params.id, req.body.status);
      res.status(200).json({
        success: true,
        message: 'Payment status updated successfully',
        data: payment
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new PaymentController();
