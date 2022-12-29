/**
* DOCU: This will return true or false if the email is valid.
* Last Updated Date: December 29, 2022
* @author Demy
*/
checkValidEmail = (email) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}