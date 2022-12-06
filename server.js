const fs = require('fs')
const path = require('path');
const express = require("express")
const { json } = require('express')
const app = express()
const multer = require('multer');
const { name } = require('ejs');

const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

app.get("/data",(req,res) => {

    fs.readFile("./dataBase.json", (err, dataString) => {
        if (err) {
            console.log(err)
        } else {
            res.send(jsonObject);
        }
    })

})


app.set("view engine", "ejs")
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.');
        cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
    },
});

const upload = multer({ storage });


app.get("/", (req, res) => {

    fs.readFile("./dataBase.json", (err, dataString) => {
        if (err) {
            console.log(err)
        } else {
            jsonObject = JSON.parse(dataString)
            res.render("index", jsonObject)

        }
    })
})

app.get('/addClass', (req, res) => {

    let classNameServer = req.query.NameOfClassQuery;
    fs.readFile("./dataBase.json", (err, dataString) => {
        jsonObject = JSON.parse(dataString)
        array = jsonObject.nameOfClasses//array
        array.push(classNameServer)

        fs.writeFile('./dataBase.json', JSON.stringify(jsonObject, null, 4), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(jsonObject)
    })
})

/*app.get('/addedSound', (req, res) => {

    let soundNameServer = req.query.NameOfAddedSound;
    let soundClassServer = req.query.classSound;

    fs.readFile("./dataBase.json", (err, dataString) => {
        jsonObject = JSON.parse(dataString)
        tracks = jsonObject.tracks;

        const newTrack = {
            name: soundNameServer,
            class: soundClassServer
        };

        tracks.push(newTrack);

        fs.writeFile('./dataBase.json', JSON.stringify(jsonObject, null, 4), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(jsonObject)
    })
})*/

app.post('/newTrackArrived', (req, res) => {
    console.log(req.body)
    const nameTrack = req.body.name;
    
    const classTrack = req.body.class;
    console.log(classTrack);
    
    const files = fs.readdirSync(path.join(__dirname, 'uploads'));
    const id = files[files.length -1].split('.')[0];

    fs.readFile("./dataBase.json", (err, dataString) => {
        jsonObject = JSON.parse(dataString)
        tracks = jsonObject.tracks;

        const newTrack = {
            name: nameTrack,
            class: classTrack,
            id: id 
        };

        tracks.push(newTrack);

        fs.writeFile('./dataBase.json', JSON.stringify(jsonObject, null, 4), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.sendStatus(200);
        res.end();
    })}

);

app.post('/record', upload.single('audio'), (req, res) =>
    res.json({ success: true })
);

app.get('/recordings', (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, 'uploads'));
    files = files.filter((file) => {
        // check that the files are audio files
        const fileNameArr = file.split('.');
        return fileNameArr[fileNameArr.length - 1] === 'mp3';
    }).map((file) => `/${file}`);
    return res.json({ success: true, files });
});

app.use(express.static('public/assets'));
app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.ejs'));
});


app.listen(3000)


