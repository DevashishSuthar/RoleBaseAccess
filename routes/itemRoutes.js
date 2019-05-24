const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const itemController = require('../controller/itemController');
//for create item array
router.post('/create-item', categoryController.authController, itemController.createItem);
//for view item array
router.get('/view-item', itemController.viewItem);
//to update item array
router.put('/update-item', itemController.updateItem);
//to delete item array
router.delete('/delete-item', itemController.deleteItem);
//get all item array
router.get('/get-all-item', itemController.getAllItem);
module.exports = router;