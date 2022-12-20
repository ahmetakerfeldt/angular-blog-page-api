import multer from 'multer'

const fileDestinations = {
    POST_IMAGE: './assets/posts',
    POST_VIDEO: './assets/posts',
    USER_PROFILE_IMAGE: './assets/profile-photos',
    USER_COVER_IMAGE: './assets/cover-photos'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileType = req.query.fileType;
        const fileDestinationPath = fileDestinations[fileType];

        if (!fileDestinationPath) {
            throw new Error('Invalid file type')
        }

        cb(null, fileDestinationPath)
        console.log(fileDestinationPath)
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    },
})
const upload = multer({storage: storage})
export const uploader = upload.single(`image`)

