class appErorr extends Error {
    constructor(statusCode , statusMessage , message){
        super(message);
            this.statusCode = statusCode;
        this.statusMessage=statusMessage;
}}


module.exports = appErorr;