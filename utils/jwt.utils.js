var jwt = require('jsonwebtoken');

const SECRET_SIGN = 'zGryOY7ZB7doq5Z0AzBJgwkRCyFrzX5Mqai46OUH8rHCawmK3SEpHGVY2oljkd0t';
// exports
module.exports = {
    generateUserToken: function (userData) {
        return jwt.sign({
            id: userData._id,
        },
            SECRET_SIGN,
            {
                expiresIn: '1h'
            }
        )
    },
    parseToken: function (token) {
        return (token != null) ? token.replace(/token=/gi, '') : null;
    },
    getUserId: function (token) {
        // init id negativ 
        var userId = -1;
        var tk = module.exports.parseToken(token);
        if (tk != null) {
            try {
                var jwtToken = jwt.verify(tk, SECRET_SIGN);
                if (jwtToken != null) {
                    userId = jwtToken.id;
                }
            } catch (err) {
                console.error(err)
            }
        }
        return userId;
    }
}

