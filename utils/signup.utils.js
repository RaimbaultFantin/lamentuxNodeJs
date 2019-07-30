// verif signup
module.exports = {
    validUser: function (user) {
        const REGEX_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validPseudo = typeof user.pseudo == 'string' && user.pseudo.trim() != ''
            && user.pseudo.trim().length >= 3 && user.pseudo.trim().length <= 15;
        const validEmail = typeof user.email == 'string' && user.email.trim() != '' && REGEX_EMAIL.test(user.email);
        const validPassword = typeof user.password == 'string' && user.password.trim() != ''
            && user.password.trim().length >= 6 && user.password.trim().length <= 25;
        const validPassword2 = user.password === user.password2;
    
        if (!validPseudo || !validEmail || !validPassword || !validPassword2) {
            return false
        }
        return true;
    }
}