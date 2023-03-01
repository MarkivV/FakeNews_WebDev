import formidable from "./formidable-serverless";
import { createReadStream } from "fs";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";
import parseForm from "./parseForm";
import * as gcs from "./gcs";

export const method1 = async (
    req: NextApiRequest | IncomingMessage) => {
    const form = new formidable.IncomingForm();
    const { files } = await parseForm(form, req);

    const file = files.file as any;

    const fileNameRandom = `${Math.random().toString(26).substring(2)}-${
        file.originalFilename
    }`;

    return new Promise((resolve, reject) => {
        createReadStream(file.filepath)
            .pipe(gcs.createWriteStream(fileNameRandom, file.mimetype))
            .on("finish", async () => {
                const publicURL = `https://storage.googleapis.com/brazhkovich/${fileNameRandom}`;
                console.log(publicURL);
                resolve(publicURL);
            })
            .on("error", (err) => {
                console.error(err.message);
                reject(err);
            });
    });
};