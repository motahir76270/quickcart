import { Inngest } from "inngest"; 
import userModel from "@/modals/user";
import { dbConnect } from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });



export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
    },
    { event: "clerk/user.created" },
    async ({ event }) => {
        // Function implementation goes here
        const { id, first_name,last_name, email_addresses, image_url } = event.data;

        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
            cartItem: {},
        }
        await dbConnect();
        await userModel.create(userData);
    }
)

//inngest function to update user data on clerk user update event
export const syncUserUpdate = inngest.createFunction(
    {
        id: "sync-user-update-from-clerk",
    },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        // Function implementation goes here
        const { id, first_name,last_name, email_addresses, image_url } = event.data;

        const updatedUserData = {
            _id : id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,    
            imageUrl: image_url,
        }
        await dbConnect();
        await userModel.findByIdAndUpdate(id, updatedUserData);
    }
)


//inngest function to delete user data on clerk user delete event
export const syncUserDeletion = inngest.createFunction(
    {
        id: "sync-user-deletion-from-clerk",
    },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        // Function implementation goes here
        const { id } = event.data;

        await dbConnect();
        await userModel.findByIdAndDelete(id);
    }
)