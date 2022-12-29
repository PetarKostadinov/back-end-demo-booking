

async function login(username, password) {
    new Promise((res, rej) => {
        if (username.toLowerCase() == 'peter' && password == '123456') {

            res({
                _id: 'sdfwf3sfdf4dfdf',
                username: 'Peter',
                roles: ['user']
            });
        }else{
            rej(new Error('Incorect username or password'))
        }
    });
}

module.exports = {
    login
}