const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        
      }
    }
  )
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  // find all categories
  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  try {
    const userData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
 });
    if (!userData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
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
