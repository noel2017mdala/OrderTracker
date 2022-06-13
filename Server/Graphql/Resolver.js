const {
    getOrders,
    getOrder,
    createDocument,
    getOrderByEmail,
    updateOrder,
    deleteOrderById,
    deleteOrderByEmail,
    getUsers
} = require('../Models');
const orders = [
  {
    title: "Iphone 15 purchase",
    uid: 1,
    customer: {
      name: "Abel",
      phone: "0881926459",
      email: "noelmdala2017@gmail.com",
    },
  },
  {
    title: "Iphone 12 purchase",
    uid: 2,
    customer: {
      name: "Noel",
      phone: "0997216715",
      email: "noelmdala2017@gmail.com",
    },
  },
];

const rootResolver = {
  name: () => {
    return "Hello Abel";
  },

  email: () => {
    return "Hello noelmdala2017@gmail.com";
  },

  getOrders: ({limit}) => {
    return getOrders(limit);
  },

  getOrder: async ({ id }) =>{
       return getOrder(id);  
  },

  getUsers: ({limit}) =>{
    return getUsers(limit)
  },

  getOrderByEmail: ({email}) =>{

    return getOrderByEmail(email);
  },

  updateOrder: ({input}) =>{
    return updateOrder(input);
  },

  addOrder: ({input}) =>{
      orders.push(input);
      return input;
  },

  createOrder: ({input}) =>{
      return createDocument(input);
  },

  deleteOrder: ({id}) =>{
    return deleteOrderById(id);
  },

  deleteAllOrdersByEmail: ({email}) =>{
    return deleteOrderByEmail(email);
  }

};

module.exports = rootResolver;
