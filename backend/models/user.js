const bcrypt = require('bcrypt');

const users = []; // In-memory storage

const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    return user;
};

const findUser = (username) => users.find(u => u.username === username);

module.exports = { createUser, findUser };
