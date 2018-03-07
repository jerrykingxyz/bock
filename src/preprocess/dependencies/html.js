module.exports = function (content) {
    return content.match(/((src|href)=['"][^'":]['"])/g)
};