const { deletingImages, deletiongProcess } = require('../deletingContent/deletingImages')
const inputEmpty = (req, res, next) => {
    const data = req.body;
    let fileTypeAvailable = ['image/jpeg', 'image/png', 'image/jpeg']
    let errorMessage = {};
    for (let key in data) {
        //validate empty fields
        if(data[key] === ''){
            errorMessage[key] = `${key.split(/(?=[A-Z 0-9])/).map(x => x[0].toUpperCase() + x.slice(1)).join(' ')} is Required.`;
        }
    }
    //validate multiple files upload
    if(req.files){
        let files = req.files
        for (let key in files) {
            let filetype = files[key][0].mimetype.toLocaleLowerCase()
            if (!fileTypeAvailable.includes(filetype)) {
                errorMessage[key] = `${key.split(/(?=[A-Z 0-9])/).map(x => x[0].toUpperCase() + x.slice(1)).join(' ')} Invalid File Type. ${fileTypeAvailable} Only`;
            }
        }
    }

    //validate single file upload
    if(req.file){
        let file = req.file
        console.log(file)
        if (!fileTypeAvailable.includes(file.mimetype.toLocaleLowerCase())) {
            errorMessage[file.fieldname] = `${file.fieldname.split(/(?=[A-Z 0-9])/).map(x => x[0].toUpperCase() + x.slice(1)).join(' ')} Invalid File Type. ${fileTypeAvailable} Only`;
        }
    }

    //validate all entries 
    if(!validateEntries(Object.entries(errorMessage).length, req.files, req.file)){
        return res.status(500).send(errorMessage)
    }
    next()
}
const emailValidation = (req, res, next) => {
    //validate emails 
    const {email} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(500).send({email: 'Invalid email address. Please enter a valid email.'})
    }
    next()
}
const validateEntries = (entries, filemore, filesingle) => {
    //validate entries error
    if(entries !== 0){
        if(filemore){
            const filenames = Object.values(filemore).flat().map((file) => file.filename);
            deletingImages(filenames)
            return false
        }else if(filesingle){
            deletiongProcess(filesingle.filename)
            return false
        }else{
            return false
        }
    }else{
        return true
    }
}
module.exports = { inputEmpty, emailValidation}