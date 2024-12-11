import multer, {StorageEngine, Multer} from 'multer'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name
        const extension = path.extname(file.originalname)
        const id = uuidv4()

        const newName = `${originalName}_${id}${extension}`
        cb(null, newName)
    }
})

const upload: Multer = multer({storage: storage})

export default upload