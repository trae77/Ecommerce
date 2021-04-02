const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  const userData =  Product.findAll({ include: [{ model: Category }, { model: Tag }],
    attributes: {
      
    }
  }).catch((err) => {

  // attributes: {
    res.json(err);
  });
  res.json(userData);
  // find all products
  // be sure to include its associated Category and Tag data
});
  // find all categories
  // be sure to include its associated Products


router.get('/:id', (req, res) => {
  const userData =  Category.findByPk(req.params.id);

  res.json(userData);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  const userData =  Category.create(req.body);
  res.json(userData);
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Category) => {
      // find all associated tags from ProductTag
      return Category.findAll({ where: { product_id: req.params.id } });
    })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Category) => {
      // find all associated tags from ProductTag
      return Category.findAll({ where: { product_id: req.params.id } });
    })
});

module.exports = router;
