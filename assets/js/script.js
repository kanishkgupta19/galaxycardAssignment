
function adduser(){
    document.getElementById("add-user-form").submit();
    $("#add-user-form").submit();
}

function edit_user(uid){
    var id = uid.toString();
    document.getElementbyId('username-rec-'+id).style="border: 1px solid black;";
    document.getElementbyId('email-rec-'+id).style="border: 1px solid black;";
    document.getElementbyId('contact-rec-'+id).style="border: 1px solid black;";
    document.getElementbyId('username-rec-'+id).readonly="false";
    document.getElementbyId('email-rec-'+id).readonly="false";
    document.getElementbyId('contact-rec-'+id).readonly="false";
}
