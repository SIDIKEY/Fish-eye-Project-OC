function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    
  }
  
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none"; 
  closeModal.focus(); 
}


const formSubmitted = document.getElementById("form");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const message = document.getElementById("textarea");
formSubmitted.addEventListener("submit", (e) =>{
  e.preventDefault();
  
  if (firstName.value && lastName.value && email.value && message.value) {

    alert("This form has been successfully submitted!");
    console.log(`form submitted with ${firstName.value} ${lastName.value} ${email.value} ${message.value}`)
     
  } else {
    alert("champs de saisie vide!");
  }

})