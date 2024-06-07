

function deleteFunc(){
if(confirm("Do You Want To Delete This Listing")){
    return true;
}
else{
    return false;
};

}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()



  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
    
  let taxInfo = document.querySelectorAll(".tax-info");
    
  taxSwitch.addEventListener("click",()=>{

    for(taxes of taxInfo){
     
     taxes.classList.toggle("tax");
    }
  })