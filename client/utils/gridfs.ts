const mongoose = require('mongoose');
const conn = mongoose.connection;

import Grid from "gridfs-stream"

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});