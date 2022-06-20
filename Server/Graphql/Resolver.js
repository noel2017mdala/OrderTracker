const {
  getOrders,
  getOrder,
  createDocument,
  getOrderByEmail,
  updateOrder,
  deleteOrderById,
  deleteOrderByEmail,
  getUsers,
} = require("../Models");

const rootResolver = {
  getOrders: ({ limit }) => {
  
    return getOrders(limit);
  },

  getOrder: async ({ id }) => {
    return getOrder(id);
  },

  getUsers: ({ limit }) => {
    return getUsers(limit);
  },

  getOrderByEmail: ({ email, limit }) => {
    return getOrderByEmail(email, limit);
  },

  updateOrder: ({ input }) => {
    return updateOrder(input);
  },

  createOrder: ({ input }) => {
    return createDocument(input);
  },

  deleteOrder: ({ id }) => {
    return deleteOrderById(id);
  },

  deleteAllOrdersByEmail: ({ email }) => {
    return deleteOrderByEmail(email);
  },
};

module.exports = rootResolver;
