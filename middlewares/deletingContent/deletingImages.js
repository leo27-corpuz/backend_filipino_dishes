const fs = require('fs');
const deletingImages = (filenames) => {
    filenames.forEach((filename) => {
        deletiongProcess(filename)
    });
}
const deletiongProcess = (filename) => {
    const imagePath = `public/images/${filename}`;
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist
            console.error(err);
        } else {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted ${filename}`);
                }
            })
        }
    })
}
module.exports = { deletingImages, deletiongProcess }