import { Inngest } from "inngest";
import { dbConnection } from "./db.js";
import { User } from "@/models/User.js";
import { Order } from "@/models/Order.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-e-commerce" });

// inngest to save user to database
export const userCreation = inngest.createFunction(
  { id: "async-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imgUrl: image_url,
    };
    await dbConnection();
    await User.create(userData);
  }
);

// update
export const UserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.update" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imgUrl: image_url,
    };
    await dbConnection();
    await User.findByIdAndUpdate(id, userData);
  }
);

// delete function

export const UserDeleted = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.update" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnection();
    await User.findByIdAndDelete(id);
  }
);

// create user order

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 25,
      timeout: "5s",
    },
  },
  { event: "order/create" },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      };
    });
    await dbConnection()
    await Order.insertMany(orders)
    return {success:true,process:orders.length}
  }
);
