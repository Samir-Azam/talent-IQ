import { serverClient } from "../lib/stream.js";

export const getStreamToken = async()=>{
    try {
        const token = serverClient.createToken(req.user.clerkId);
        return res.status(200).json({
            token,
            id: req.user.clerkId,
            name: req.user.name,
            image: req.user.profileImage
        })
    } catch (error) {
        console.error("Error getting Stream token", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}