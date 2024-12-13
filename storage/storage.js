const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    filename:(req, file, callback) =>{
        const mimetype = file.mimetype;
        const [tipo, extension] = mimetype.split("/");
        if(tipo !== "image"){
            callback(new Error("no es un imagen"));
        }else{
            const nombre =
            file.originalname.split(".")[0] + "-" + Date.now() + "." + extension;
            callback(null, nombre);
        }
    },
    destination:(req, file, callback) =>{
        callback(null, "public/image/obras");
    },
});
//se crea
const uploadImagenes = multer({storage: storage});

module.exports = uploadImagenes;