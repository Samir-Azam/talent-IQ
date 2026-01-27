
import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
import { use } from "react";

const api_key = ENV.STREAM_API_KEY;
const api_secret = ENV.STREAM_API_SECRET;

if (!api_key || !api_secret) {
    console.error("Missing Stream API key or secret");
}

export const serverClient = StreamChat.getInstance(api_key, api_secret);

export const upsertStreamUser = async(userData)=>{
    try {
        await serverClient.upsertUser(userData);
        console.log("Stream user is upserted successfully...",userData);
    } catch (error) {
        console.error("Error upserting user into Stream", error);
    }
}

export const deleteStreamUser = async(userId)=>{
    try {
        await serverClient.deleteUser(userId);
        console.log("Stream user is deleted successfully...",userId);
        
    } catch (error) {
        console.error("Error deleting user from Stream", error);
    }
}