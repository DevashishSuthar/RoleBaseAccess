const authObj = {
    CATEGORY: {
        UPDATE_CATEGORY: {
            URL: '/update-category',
            roles: ['admin'],
        },
        CREATE_CATEGORY: {
            URL: '/create-category',
            roles: ['admin'],
        },
        VIEW_CATEGORY: {
            URL: '/view-category/:id',
            roles: ['admin', 'user'],
        },
        DELETE_CATEGORY: {
            URL: '/delete-category/:id',
            roles: ['admin'],
        },
        GET_ALL_CATEGORY: {
            URL: '/get-all-category',
            roles: ['admin'],
        }
    },
    ITEM: {
        CREATE_ITEM: {
            URL: '/create-item',
            roles: ['admin'],
        },
        VIEW_ITEM: {
            URL: '/view-item',
            roles: ['admin', 'user'],
        },
        UPDATE_ITEM: {
            URL: '/update-item',
            roles: ['admin'],
        },
        DELETE_ITEM: {
            URL: '/delete-item',
            roles: ['admin'],
        },
        GET_ALL_ITEM: {
            URL: '/get-all-item',
            roles: ['admin'],
        }
    }
}

module.exports = authObj