const checkExtRule = function (ext, rule) {

  if (typeof rule === 'string') {
    return rule === '*' || rule === ext;
  }

  if (Array.isArray(rule)) {
    return rule.indexOf(ext) !== -1;
  }

  return false;
};

module.exports = { checkExtRule };