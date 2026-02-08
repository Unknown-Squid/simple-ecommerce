const { Product } = require('../ModelsRelationship/models');

const seedTestProducts = async () => {
  try {
    console.log('Seeding test products...');

    const testProducts = [
      {
        name: 'Handwoven Bamboo Basket',
        description: 'Beautifully crafted bamboo basket made by skilled artisans. Perfect for storage or decoration.',
        price: 45.00,
        image: 'https://placehold.co/400x400/e8d5b7/6b4423?text=Handwoven+Basket',
        category: 'Baskets',
        stock: 25,
        isActive: true
      },
      {
        name: 'Ceramic Pottery Set',
        description: 'Traditional hand-thrown ceramic set with intricate patterns. Includes 4 pieces.',
        price: 85.00,
        image: 'https://placehold.co/400x400/d4a574/5c3a1f?text=Ceramic+Pottery',
        category: 'Pottery',
        stock: 15,
        isActive: true
      },
      {
        name: 'Wooden Carving Art',
        description: 'Intricate hand-carved wooden art piece showcasing traditional craftsmanship.',
        price: 120.00,
        image: 'https://placehold.co/400x400/8b7355/3d2817?text=Wooden+Carving',
        category: 'Woodwork',
        stock: 10,
        isActive: true
      },
      {
        name: 'Textile Art Tapestry',
        description: 'Hand-stitched traditional patterns on high-quality fabric. Perfect wall decoration.',
        price: 65.00,
        image: 'https://placehold.co/400x400/c9a96e/5d4a2f?text=Textile+Art',
        category: 'Textiles',
        stock: 20,
        isActive: true
      },
      {
        name: 'Handmade Leather Wallet',
        description: 'Premium leather wallet with hand-stitched details. Durable and elegant.',
        price: 55.00,
        image: 'https://placehold.co/400x400/a0826d/4a3a2a?text=Leather+Wallet',
        category: 'Leather',
        stock: 30,
        isActive: true
      },
      {
        name: 'Artisan Soap Collection',
        description: 'Natural handmade soaps with organic ingredients. Set of 6 bars.',
        price: 35.00,
        image: 'https://placehold.co/400x400/f4e4c1/8b7355?text=Artisan+Soap',
        category: 'Personal Care',
        stock: 50,
        isActive: true
      },
      {
        name: 'Woven Placemats Set',
        description: 'Colorful handwoven placemats. Set of 4 pieces with traditional patterns.',
        price: 28.00,
        image: 'https://placehold.co/400x400/d4a574/6b4423?text=Placemats',
        category: 'Textiles',
        stock: 40,
        isActive: true
      },
      {
        name: 'Handcrafted Jewelry Box',
        description: 'Beautifully carved wooden jewelry box with velvet interior.',
        price: 75.00,
        image: 'https://placehold.co/400x400/8b7355/4a3a2a?text=Jewelry+Box',
        category: 'Woodwork',
        stock: 12,
        isActive: true
      }
    ];

    for (const product of testProducts) {
      const [createdProduct, created] = await Product.findOrCreate({
        where: { name: product.name },
        defaults: product
      });

      if (created) {
        console.log(`✓ Created test product: ${product.name}`);
      } else {
        console.log(`- Product already exists: ${product.name}`);
      }
    }

    console.log('Test products seeding completed!');
    return true;
  } catch (error) {
    console.error('Error seeding test products:', error);
    throw error;
  }
};

module.exports = seedTestProducts;
