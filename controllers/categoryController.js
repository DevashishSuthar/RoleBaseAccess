const categoryModel = require('../models/categoryModel');
const authUser = require('../authUser/authUser');
const createCategory = (req, res, next) => {
    console.log("Create Category API called");
    new categoryModel({
            "name": req.body.name,
            "description": req.body.description,
            "isImage": req.body.isImage,
            "isCnt": req.body.isCnt,
            "items": req.body.items
        })
        .save()
        .then((result) => {
            return res.json({
                success: true,
                message: 'Category Added Successfully!',
                data: result
            })
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Category Not Added!',
                data: err
            })
        });
}

const viewCategory = async (req, res, next) => {
    console.log("View Category API called");
    const result = await categoryModel.findById(req.params.id);
    if (result) {
        return res.json({
            success: true,
            message: 'Category Found Successfully!',
            data: result
        });
    }

    return res.json({
        success: false,
        message: 'Category Not Found!',
        data: result
    });
}


const updateCategory = (req, res, next) => {
    console.log("Update Category API called");
    categoryModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }).then((result) => {
            return res.json({
                success: true,
                message: 'Category Updated Successfully!',
                data: result
            })
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Category Not Updated!',
                data: err
            })
        });
};

const deleteCategory = (req, res, next) => {
    console.log("Delete Category API called");
    categoryModel.findByIdAndDelete(req.params.id).then((result) => {
            return res.json({
                success: true,
                message: 'Category Deleted Successfully!',
                data: result
            })
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Category Not Deleted!',
                data: err
            })
        });

}
const getAllCategory = (req, res, next) => {
    console.log("Get All Category API called");
    categoryModel.find().then((result) => {
            return res.json({
                success: true,
                message: 'Category Deleted Successfully!',
                data: result
            })
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Category Not Deleted!',
                data: err
            })
        });
}

const authController = (req, res, next) => {
    console.log("auth controller called!");
    const role = 'admin';
    const url = req.url;
    console.log("req.url: ", req.url)
    const finalResult = checkPermission(authUser, url, role);
    if (finalResult) {
        console.log("Final result found! :", finalResult)
        next();
    } else {
        return res.json({
            success: false,
            message: `You don't have any permission to access this API!!`
        })
    }
}

const checkPermission = (authObj, url, role) => {
    console.log("check permission function invoked!");
    let flag = false;
    if (authObj && typeof authObj == "object" && !Array.isArray(authObj)) {
        for (let key in authObj) {
            if (authObj[key].hasOwnProperty("URL") && authObj[key].URL == url && authObj[key].roles.indexOf(role) > -1) {
                console.log("TRUE")
                return true;
            } else {
                console.log("above checkpermission function");
                const tempResult = checkPermission(authObj[key], url, role)
                console.log("tempResult: ", tempResult)
                if (tempResult) {
                    flag = tempResult;
                    break;
                }
            }
        }
    }

    return flag;
}

module.exports = {
    createCategory,
    viewCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    authController
}