const User = require('../Models/User');
const jwt = require('jsonwebtoken');

class AccountService {
  async register(userData) {
    const { email, password, firstName, lastName } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    return userResponse;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    return {
      user: userResponse,
      token
    };
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);

    const userResponse = user.toJSON();
    delete userResponse.password;

    return userResponse;
  }
}

module.exports = new AccountService();
