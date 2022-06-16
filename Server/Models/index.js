const admin = require("../Configs/config");
const db = admin.firestore();

const emailValidator = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getOrders = async (limit) => {
  let userOrders = db.collection("orders");

  try {
    const docs = await userOrders
      .where("uid", "!=", "")
      .limit(limit || 5)
      .get();

    let data = [];
    if (!docs.empty) {
      docs.forEach((orders) => {
        if (orders.exists) {
          data.push({
            ...orders.data(),
          });
        } else {
          return "error";
        }
      });
    } else {
      return [];
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (limit) => {
  const users = db.collection("users").limit(limit || 5);
  try {
    const docs = await users.get();
    let data = [];
    if (!docs.empty) {
      docs.forEach((user) => {
        if (user.exists) {
          data.push({
            ...user.data(),
          });
        } else {
          return [];
        }
      });
    } else {
      return []
    }
    return data;
  } catch (error) {
    return error;
  }
};

const getOrder = async (id) => {
  if (id !== "") {
    const citiesRef = db.collection("orders");
    const snapshot = await citiesRef.where("uid", "==", id).get();

    try {
      let data = [];
      if (!snapshot.empty) {
        snapshot.forEach((docs) => {
          if (docs.exists) {
            data.push({
              ...docs.data(),
            });
          } else {
            return;
          }
        });
      } else {
        return [];
      }

      return data;
    } catch (error) {
      return error;
    }
  }
};

const getOrderByEmail = async (input) => {
  if (input !== "" && emailValidator(input)) {
    try {
      let arr = [];
      const citiesRef = db.collection("orders");
      const data = await citiesRef.where("customer.email", "==", input).get();
      if (!data.empty) {
        data.forEach((docs) => {
          arr.push({
            ...docs.data(),
          });
        });
      } else {
        return [];
      }
      return arr;
    } catch (error) {
      return error;
    }
  } else {
    return [];
  }
};

const updateOrder = async (input) => {
  if (input !== "") {
    const getUser = await getOrder(input.uid);
    if (getUser) {
      const updateUser = await db
        .collection("orders")
        .doc(input.uid)
        .update({ ...input });

      if (updateUser) {
        const getUser = await db.collection("orders").doc(input.uid).get();
        return getUser.data();
      }
    } else {
      return false;
    }
  }
};

const createDocument = async (input) => {
  if (input.uid) {
    const getUser = await getOrder(input.uid);
    if (!getUser) {
      try {
        let insertDAta = await db
          .collection("orders")
          .doc(input.uid)
          .set(input);
        if (insertDAta) {
          const getUser = await db.collection("orders").doc(input.uid).get();
          return getUser.data();
        } else {
          console.log("Failed to add data");
        }
      } catch (error) {
        return false;
      }
    } else {
      console.log("failed to create user");
    }
    return;
  }
};

const deleteOrderById = async (id) => {
  if (id !== "") {
    const getUser = await getOrder(id);

    if (getUser) {
      try {
        let order = await db.collection("orders").where("uid", "==", id).get();

        const batch = db.batch();

        order.forEach((doc) => {
          batch.delete(doc.ref);
        });

        let data = await batch.commit();

        if (data) {
          return id;
        } else {
          console.log("Failed to delete");
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  }
};

const deleteOrderByEmail = async (email) => {
  if (email !== "" && emailValidator(email)) {
    try {
      const snapshot = await db
        .collection("orders")
        .where("customer.email", "==", email)
        .get();

      if (!snapshot.empty) {
        const batch = db.batch();

        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        let data = await batch.commit();

        if (data) {
          return email;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
};

module.exports = {
  getOrders,
  getOrder,
  createDocument,
  getOrderByEmail,
  updateOrder,
  deleteOrderById,
  deleteOrderByEmail,
  getUsers,
};
