const {buildSchema} = require('graphql');

const schema = buildSchema(`
type Orders{
    bookingDate: String,
    title: String,
    uid: ID
    customer: Customer
    address: Address
}

type Order{
    address: Address,
    bookingDate: String,
    customer: Customer,
    title: String,
    uid: String
}

type Customer{
    name: String,
    email: String,
    phone: String
}

type Address{
    city: String,
    country: String,
    street: String,
    zip: String
}

type Query{
    name: String,
    email: String,
    getOrders(limit: Int): [Orders],
    getOrder(id: String): [Orders]
    getOrderByEmail(email: String): [Orders]
}


type Mutation{
    addOrder(input: OrderInput): Order
    createOrder(input: OrderInput): Order
    updateOrder(input: OrderInput): Order
    deleteOrder(id: String): String
    deleteAllOrdersByEmail(email: String): String
}

input CustomerInput{
    name: String,
    email: String,
    phone: String
}

input AddressInput{
    city: String,
    country: String,
    street: String,
    zip: String
    }

input OrderInput{
    title: String,
    uid: String,
    customer: CustomerInput,
    bookingDate: String,
    address: AddressInput,
}
`)

module.exports = schema;