const validateInputProcess = (object) => {
    let status = true
    for (var key in object) {
        if(!object[key]) {
            status = false
            break
        }
    }
    return status
}
module.exports = { validateInputProcess }