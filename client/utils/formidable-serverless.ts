import formidable, { IncomingForm } from "formidable";

// modifying the parse function

IncomingForm.prototype.parse = function (req: any, cb?: Function) {
    // setup callback first, so we don't miss data events emitted immediately
    if (cb) {
        const fields: any = {};
        const files: any = {};
        this.on("field", function (name: string, value: any) {
            fields[name] = value;
        })
            .on("file", function (name: string, file: any) {
                if (this.multiples) {
                    if (files[name]) {
                        if (!Array.isArray(files[name])) {
                            files[name] = [files[name]];
                        }
                        files[name].push(file);
                    } else {
                        files[name] = file;
                    }
                } else {
                    files[name] = file;
                }
            })
            .on("error", function (err: any) {
                cb(err, fields, files);
            })
            .on("end", function () {
                cb(null, fields, files);
            });
    }

    const self = this;

    req.on("error", function (err: any) {
        self._error(err);
    });

    req.on("end", function () {
        if (self.error) {
            return;
        }
        const err = self._parser.end();
        if (err) {
            self._error(err);
        }
    });

    // handling serverless cases
    if (Buffer.isBuffer(req.rawBody)) {
        // firebase
        try {
            // parse headers
            this.writeHeaders(req.headers);
            // parse body
            this.write(req.rawBody);
        } catch (err) {
            this._error(err);
        }
    } else if (Buffer.isBuffer(req.body)) {
        // body parser
        try {
            // parse headers
            this.writeHeaders(req.headers);
            // parse body
            this.write(req.body);
        } catch (err) {
            this._error(err);
        }
    } else {
        // standard formidable parse prototype (not serverless)...

        this.pause = function () {
            try {
                req.pause();
            } catch (err) {
                // the stream was destroyed
                if (!this.ended) {
                    // before it was completed, crash & burn
                    this._error(err);
                }
                return false;
            }
            return true;
        };

        this.resume = function () {
            try {
                req.resume();
            } catch (err) {
                // the stream was destroyed
                if (!this.ended) {
                    // before it was completed, crash & burn
                    this._error(err);
                }
                return false;
            }
            return true;
        };

        // parse headers
        try {
            this.writeHeaders(req.headers);
        } catch (err) {
            this._error(err);
        }

        // start listening for data...

        req.on("aborted", function () {
            self.emit("aborted");
            self._error(new Error("Request aborted"));
        });

        req.on("data", function (buffer: any) {
            try {
                self.write(buffer);
            } catch (err) {
                self._error(err);
            }
        });
    }
    return this;
};

export default formidable;