const express = require('express');
const router = express.Router();

const categoryController = require('../controller/categoryController');

//for creating ==>
router.post('/create-category', categoryController.authController, categoryController.createCategory);
//To get specific id ==>
router.get('/view-category/:id', categoryController.authController, categoryController.viewCategory);
//for update ==>
router.put('/update-category/:id', categoryController.updateCategory);
//for delete ==>
router.delete('/delete-category/:id', categoryController.deleteCategory);
//To get all collections ==>
router.get('/get-all-category', categoryController.getAllCategory);

module.exports = router;
