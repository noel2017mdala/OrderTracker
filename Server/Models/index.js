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
  const docs = await userOrders
    .orderBy("title")
    .limit(limit || 5)
    .get();

  try {
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
      console.log("List is empty");
    }

    return data;
  } catch (error) {
    console.log(error);
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
        return false;
      }

      //console.log(data);
      return data;
    } catch (error) {}
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
        console.log("empty");
        return;
      }
      return arr;
    } catch (error) {}
  } else {
    console.log("failed to create document");
    return null;
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
        const deleteUser = await db.collection("orders").doc(id).delete();
        if (deleteUser) {
          return id;
        } else {
          return false;
        }
      } catch (error) {
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
      }else{
        return false;
      }
    } catch (error) {
      return false;
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
};