function uniteResp(status, msg, data) {
    return JSON.stringify({
        status,
        msg,
        data
    })
}
module.exports = uniteResp;