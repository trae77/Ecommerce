const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  const userData =  Product.findAll({ include: [{ model: Category }, { model: Product }],
    attributes: {
      
    }
  }).catch((err) => {

  // attributes: {
    res.json(err);
  });
  res.json(userData);
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  try {
    const userData =  Tag.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  try {
    const userData =  Tag.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Tag) => {

      return Tag.findAll({ where: { product_id: req.params.id } });
    })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.delete(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Tag) => {

      return Tag.findAll({ where: { product_id: req.params.id } });
    })
  // updat
  // userData.destroy

  // delete on tag by its `id` value
});

module.exports = router;
