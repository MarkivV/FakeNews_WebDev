import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../models/User";
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{token}} = req

    await dbConnect()

    try {
        const user = await User.findOneAndUpdate({ token }, { emailVerified: true });
        if (user) {
            res.status(200).json({ message: 'User verified' })
        } else{
            res.status(400).json({ message: "User not found"})
        }
    } catch (error) {
        res.status(500).json(error)
        return;
    }

}