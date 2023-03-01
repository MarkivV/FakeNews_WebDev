import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { method1 } from "../../../utils/upload";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {method} = req


    switch (method){
        case "POST":
            try{
                const resImg = await method1(req, res);
                res.status(201).send(resImg);
            }catch(err){
                console.error(err)
                res.status(413).json(err)
            }
    }

}
