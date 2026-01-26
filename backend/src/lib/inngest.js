import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.model.js";

export const inngest = new Inngest({
    id: "talent-iq"
});

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) => {
        await connectDB();

        const {
            id,
            email_addresses,
            image_url,
            first_name,
            last_name
        } = event.data

        const newUser = {
            name: `${first_name || ""} ${last_name || ""}`,
            email: email_addresses[0]?.email_address,
            profileImage: image_url,
            clerkId: id
        }

        await User.create(newUser)
    }
)

const deleteUser = inngest.createFunction(
    {id: "delete-user"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connectDB();

        const {id} = event.data

        await User.findOneAndDelete({ clerkId: id });

    }
)

export const functions = [syncUser, deleteUser]