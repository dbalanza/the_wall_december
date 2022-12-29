document.querySelector("#signin_form").addEventListener("submit", submitSignInForm); /* Will trigger the processing of sign in form */

/**
* DOCU: This will process the sign in form.
* Triggered: on submit signin form;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function submitSignInForm (event){
    event.preventDefault();

    let inputs = document.querySelectorAll("input");
    let error_count = 0;
    let email_input_value = document.querySelector("#email_input").value;
    let pass_input_value = document.querySelector("#password_input").value;

    /* Loop tru the inputs; will add and remove border when error */
    for (let input_index = 0; input_index < inputs.length; input_index++) {
        let active_input = inputs[input_index];
        
        /* Will check if the input is not empty */
        if(active_input.value === ""){
            error_count +=1;
            active_input.classList.add("border_red");
        }
        else{
            active_input.classList.remove("border_red");
        }
    }
    
    /* Will check if the email is valid */
    if(!checkValidEmail(email_input_value) && pass_input_value !== ""){
        document.querySelector("error_text").innerText = "Invalid Email";
        
        error_count +=1;
    }
    
    if(error_count === 0){
        document.querySelector("#error_text").innerText = "";
        
        /* Will process if the email and password is matched */
        if(email_input_value === dummy_account.email && pass_input_value === dummy_account.password){
            document.querySelector("button").innerText = "Processing...";
            
            /* Simulation for redirect to timeline*/
            setTimeout(() => {
                window.location.replace("../timeline/timeline.html");
            }, time_out_speed.slow);
        }
        else{
            document.querySelector("#error_text").innerText = "Email and Password did not match!";
        }
    }
}