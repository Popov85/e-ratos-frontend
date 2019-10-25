import stringValidator from 'validator';
import passwordValidator from 'password-validator';


const UtilsValidation = {

    // Validates password
    isPasswordValid: function (password) {
        if (!password) return false;
        const validator = new passwordValidator()
        .is().min(8)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();
        return validator.validate(password);
    },

    // Validates email
    isEmailValid: function (email) {
        if (!email) return false;
        return stringValidator.isEmail(email);
    },

    // Validates select
    isSelectValid: function (item) {
        if (!item) return false;
        if (!isNaN(item)) return true;
        return stringValidator.isNumeric(item);
    }
}

export default UtilsValidation;


