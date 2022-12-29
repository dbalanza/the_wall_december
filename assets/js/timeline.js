document.querySelector("#add_topic_form").addEventListener("submit", submitAddTopicForm); /* Will process the adding of topic */

/**
* DOCU: This will process the add topic.
* Triggered: on submit add topic form;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function submitAddTopicForm(event) {
    event.preventDefault();

    let topic_textarea   = this.querySelector("textarea");
    let topic_clone_item = document.querySelector("#topic_clone_item").cloneNode(true);
    
    topic_clone_item.removeAttribute("id");
    topic_clone_item.querySelector(".topic_text").innerText = topic_textarea.value;

    /* Will set event listener */
    topic_clone_item.querySelector(".comment_form").addEventListener("submit", submitAddComment);
    topic_clone_item.querySelector(".delete_button").addEventListener("click", toggleDeleteButton);
    topic_clone_item.querySelector(".delete_form").addEventListener("submit", submitDeleteForm);
    topic_clone_item.querySelector(".edit_button").addEventListener("click", onClickEditButton);
    topic_clone_item.querySelector(".no_button").addEventListener("click", toggleDeleteButton);

    /* Will check if the textarea is not empty */
    if(topic_textarea.value !== ""){
        topic_textarea.classList.remove("border_red");
        topic_textarea.value = "";
        document.querySelector("#topic_list").prepend(topic_clone_item);

        /* Will remove the no post yet item */
        if(!document.querySelector("#no_post_yet_item").length){
            document.querySelector("#no_post_yet_item").remove();
        }
    }
    else{
        topic_textarea.classList.add("border_red");
    }
}

/**
* DOCU: This will process the add comment.
* Triggered: on submit add comment form;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function submitAddComment(event) {
    event.preventDefault();
    let comment_textarea = this.querySelector("textarea");
    let comment_clone_item = document.querySelector("#comment_clone_item").cloneNode(true);
    comment_clone_item.removeAttribute("id");

    /* Will set event listener */
    comment_clone_item.querySelector(".delete_button").addEventListener("click", toggleDeleteButton);
    comment_clone_item.querySelector(".delete_form").addEventListener("submit", submitDeleteForm);
    comment_clone_item.querySelector(".no_button").addEventListener("click", toggleDeleteButton);
    comment_clone_item.querySelector(".edit_button").addEventListener("click", onClickEditButton);

    /* Will check if the textarea is not empty */
    if(comment_textarea.value !== ""){
        let topic_item = this.closest(".topic_item");

        comment_clone_item.querySelector(".comment_text").innerText = comment_textarea.value;
        comment_textarea.classList.remove("border_red");

        topic_item.querySelector(".comment_list").prepend(comment_clone_item);
        comment_textarea.value = "";

        /* Will change response count */
        topic_item.querySelector(".response_count").innerText = (topic_item.querySelectorAll(".comment_item").length) + " Responses";
    }
    else{
        comment_textarea.classList.add("border_red");
    }
}

/**
* DOCU: This will hide or show delete button confirmation.
* Triggered: on clicked delete button;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function toggleDeleteButton(event) {
    let delete_form =  this.closest("form").classList;

    /* Will hide or show  the confirmation buttons */
    (delete_form.contains("is_open")) ? delete_form.remove("is_open") : delete_form.add("is_open");
}

/**
* DOCU: This will process the deletion of item.
* Triggered: on submit delete form;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function submitDeleteForm(event) {
    event.preventDefault();
    let topic_item = this.closest(".topic_item");

    /* Will update response count */
    topic_item.querySelector(".response_count").innerText = (topic_item.querySelectorAll(".comment_item").length - 1) + " Responses";

    this.closest("li").remove();
}

/**
* DOCU: This show the edit textarea for edit form.
* Triggered: on click edit button;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function onClickEditButton(event) {
    let edit_clone_form = document.querySelector("#edit_form_clone").cloneNode(true);

    /* Will update the edit form value */
    edit_clone_form.removeAttribute("id");
    edit_clone_form.querySelector("textarea").innerText = this.closest("li").querySelector("p").innerText;
    edit_clone_form.addEventListener("submit", onsubmitEditForm);

    this.closest("li").querySelector("p").replaceWith(edit_clone_form);
}


/**
* DOCU: This process the editing of comment and topic.
* Triggered: on submit edit form;
* Last Updated Date: December 29, 2022
* @author Demy
*/
function onsubmitEditForm(event) {
    event.preventDefault();
    let edit_textarea = this.querySelector("textarea");

    /* Will check if the textarea is not empty */
    if(edit_textarea.value !== ""){
        let p_element = document.createElement("p");
        
        p_element.classList.add("topic_text");
        p_element.innerText = edit_textarea.value;
        
        this.replaceWith(p_element);

        edit_textarea.classList.remove("border_red");
    }
    else{
        edit_textarea.classList.add("border_red");
    }
}