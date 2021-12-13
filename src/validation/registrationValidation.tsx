import validator from 'validator';
export const isValid = (field: string, fieldValue: string, action: any): any => {
    //console.log(field);
    switch (field) {
        case "userid":
            if (fieldValue !== "" && validateEmail(fieldValue) && fieldValue.length < 39) {
                action.removeError("error_email")
                action.addError("error_validate")
            }
            else {
                action.addError("error_email")
                action.removeError("error_validate")
            }
            break;
        case "mobile":
            if (fieldValue !== "" && validateMobile(fieldValue)) {
                action.removeError("error_password");
                action.addError("error_validate")
            }
            else {
                action.addError("error_password")
                action.removeError("error_validate")
            }
            break;
        case "password":
            if (fieldValue !== "" && (validPassword(fieldValue) && fieldValue.length < 39)) {
                action.removeError("error_password")
                action.addError("error_validate")
            }
            else {
                console.log(fieldValue)
                console.log(fieldValue.length)
                action.addError("error_password")
                action.removeError("error_validate")
            }
            break;
        default:
            return;
    }
}
export const validateEmail = (emailId: string): boolean => {
    //console.log(validator.isEmail(emailId));
    return validator.isEmail(emailId, { domain_specific_validation: true });
}
export const validateMobile = (mobileNum: string) => {
    return validator.isMobilePhone("+91" + mobileNum, 'en-IN')
}
export const validPassword = (password: string) => {
    let passwordValue = validator.isStrongPassword(password, { returnScore: true });
    //console.log(passwordValue)
    return passwordValue;
}