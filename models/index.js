// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});



Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_tag',
  });
  
  // Tags belongToMany Products (through ProductTag)
  Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'category_id',
  });
  

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};