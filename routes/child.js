const router = require('express').Router()
const ChildModel = require('../models/child')
const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mimeType');
        if (isValid) {
            error = null
        }
        cb(error, './image/')
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now() + file.originalname + "." + ext)
    }
})
var upload = multer({ storage: storage })

router.post('/add', upload.single('image'), async (req, res, next) => {
    try {
        const { name, sex, dob, fathername, mothername, state, district } = req.body;
        if (req.file == undefined) {
            imagePath = ''
        } else {
            const url = req.protocol + '://' + req.get('host')
            imagePath = url + '/image/' + req.file.filename
        }
        const newchild = new ChildModel({
            name: name,
            sex: sex,
            dob: dob,
            fathername: fathername,
            mothername: mothername,
            state: state,
            district: district,
            imagePath: imagePath
        })
        await newchild.save()
        return res.status(200).json({ 'message': 'Child Added' })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})

router.get('/getall', async (req, res, next) => {
    try {
        const details = await ChildModel.find({}, { imagePath: 0 })
        return res.status(200).json({ 'message': details })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})

router.post('/getspecific', async (req, res, next) => {
    try {
        const details = await ChildModel.find({ 'name': req.body.name });
        return res.status(200).json({ 'message': details })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})


module.exports = router