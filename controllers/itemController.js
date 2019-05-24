const categoryModel = require('../models/categoryModel');
const itemModel = require('../models/itemModel');

const createItem = (req, res, next) => {
    console.log("Create Item API called");
    if (req.body.categoryId) {
        categoryModel.findById(req.body.categoryId)
            .then((result) => {
                const item = req.body;
                delete item['categoryId'];
                const data = new itemModel({
                    ...item
                });
                console.log(data);
                if (data) {
                    data.save().then((newResult) => {
                        result.items.push(newResult._id);
                        result.save().then(() => {
                            return res.json({
                                success: true,
                                message: 'Item Created Successfully!!',
                                data: newResult
                            });
                        });
                    });
                }
            }).catch((err) => {
                return res.json({
                    success: false,
                    message: 'Item not created!',
                    data: err
                })
            })
    } else {
        return res.json({
            success: false,
            message: "Category Id Not Available!!",
            data: null
        })
    }
}

const updateItem = (req, res) => {
    console.log("Update Item API called")
    // console.log("category id: ", req.body);
    categoryModel.findById(req.body.categoryId).then((result) => {
        const index = result.items.findIndex(item => item._id == req.body.itemId);
        if (index > -1) {
            itemModel.findByIdAndUpdate(req.body.itemId, {
                $set: req.body
            }).then((itemResult) => {
                const item = req.body;
                delete item['categoryId'];
                delete item['itemId'];
                itemResult.save()
                    .then(newResult => {
                        return res.json({
                            status: 200,
                            success: true,
                            message: 'Item updated successfully',
                            data: newResult
                        });
                    })
            })
        } else {
            res.json({
                success: false,
                message: 'Item not found',
                data: {}
            });
        }
    })
}

const viewItem = (req, res, next) => {
    console.log("View Item API called");
    categoryModel.findById(req.body.categoryId).then((result) => {
        const resultId = result.items.filter((item) => item._id == req.body.itemId);
        itemModel.findById(resultId).then((itemResult) => {
            return res.json({
                success: true,
                message: 'Item Found!!',
                data: [itemResult]
            })
        })
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Item Not Found!!',
            data: err
        })
    })
}

const deleteItem = (req, res, next) => {
    console.log("Delete Item API called");
    categoryModel.findById(req.body.categoryId).then((result) => {
        const resultId = result.items.filter(item => item._id == req.body.itemId);
        const idIndex = result.items.indexOf(resultId[0]);
        if (idIndex > -1) {
            result.items.splice(idIndex, 1);
            result.save();
            itemModel.findByIdAndDelete(resultId).then((itemResult) => {
                return res.json({
                    success: true,
                    message: 'Item removed successfully',
                    data: itemResult
                });
            }).catch((err) => {
                return res.json({
                    success: false,
                    message: 'Item not removed!!',
                    data: err
                })
            })
        }
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Category ID not found!',
            data: err
        })
    })
}

const getAllItem = (req, res, next) => {
    console.log("Get All Item API called");
    itemModel.find().then((result) => {
        return res.json({
            success: true,
            message: 'All Items Received!',
            data: result
        })
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Items not received!',
            data: err
        })
    })
}
module.exports = {
    createItem,
    updateItem,
    viewItem,
    deleteItem,
    getAllItem
};