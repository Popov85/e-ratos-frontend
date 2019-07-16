import stringValidator from 'validator';
import passwordValidator from 'password-validator';

const UtilsValidation = {

    // Validates password
    isPasswordValid: function (password) {
        const validator = new passwordValidator()
        .is().min(8)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();
        return validator.validate(password) ? true : false;
    },

    isEmailValid: function (email) {
        return stringValidator.isEmail(email) ? true : false;
    }
}

export default UtilsValidation;


