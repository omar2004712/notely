const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

// NOTE: declared the functions outside the module.exports
// because the comparePasswords function requires hashPassword

async function hashPassword(password, salt) {
    // @params: <password> you want to hash
    // @params: [salt] to add to the password can be auto generated
    // @return: returns the hashed password and the salt in the form of string
    // @return: the password and the salt are seperated by a .
    // like this => 'hashedPassowrd.salt'

    // eslint-disable-next-line no-param-reassign
    salt = salt || crypto.randomBytes(4).toString('hex');
    const buff = await scrypt(password, salt, 64);
    const hashed = buff.toString('hex');
    return `${hashed}.${salt}`;
}

async function comparePasswords(saved, supplied) {
    // @params: <saved> is the hashed password in the db
    // @params: <supplied> password inserted by the user, not hashed
    // @return: hashed the supplied and compares them

    // eslint-disable-next-line no-unused-vars
    const [_, salt] = saved.split('.');
    const hashedSupplied = await hashPassword(supplied, salt);
    return hashedSupplied === saved;
}

module.exports = {
    hashPassword,
    comparePasswords,
};
