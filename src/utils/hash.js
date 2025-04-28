const bcrypt = require('bcrypt');

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (userPassword, hashedPassword) => {
    return bcrypt.compareSync(userPassword, hashedPassword);
};

module.exports = {
    createHash,
    isValidPassword
};