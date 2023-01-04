const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

const {speech} = require("./public/js/tts");
const maleSpeech = speech.synthesizeMaleSpeech;
const femaleSpeech = speech.synthesizeFemaleSpeech;

const folderPath = __dirname + "/outputAudio";

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req,res) => {
    res.render("index");
})

const uploadHandler = multer({
    dest: 'uploadedFiles/',
    limits: {
        fileSize: 1000000
    }
})

app.post("/uploadFile", uploadHandler.single('file') , (req, res) => {
    const filePath = req.file.path
    const fileName = req.file.originalname.slice(0,-4)
    if(req.headers["speech-type"]==="male"){
        maleSpeech(filePath, fileName)
        res.download(`${folderPath}/${fileName}-male.wav`, (err) => {
            console.log(err);
        })
    }
    if(req.headers["speech-type"]==="female"){
        femaleSpeech(filePath, fileName);
        res.download(`${folderPath}/${fileName}-female.wav`, (err) => {
            console.log(err);
        })
    }
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Listening To Port ${port}`);
})