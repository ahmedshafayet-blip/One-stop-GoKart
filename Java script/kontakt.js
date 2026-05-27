/*kollar om mejlet är som standard och kollar om den har med @*/
function emailIsValid(email) {
  return email.includes('@');
}

/* visar felmeddelandet*/
function showEmailError() {
  const emailInput = document.getElementById('email');
  const errorMsg = document.getElementById('emailError');

  emailInput.classList.add('invalid');
  errorMsg.classList.remove('hidden');
}

/* felmedeande men den är gömd*/
function hideEmailError() {
  const emailInput = document.getElementById('email');
  const errorMsg = document.getElementById('emailError');

  emailInput.classList.remove('invalid');
  errorMsg.classList.add('hidden');
}

/* login klick, checkar username och mejl för att kunna loggas in*/
function handleLogin() {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const successMsg = document.getElementById('successMsg');

  // gömmer success meddelande från förra försöket
  successMsg.classList.add('hidden');

  // kolla om mejlen är giltig
  if (!emailIsValid(email)) {
    showEmailError();
    return;   // stoppa här — logga inte in
  }

  // om mejl är ok då gömmer den felmedelandet 
  hideEmailError();

  // visa success meddelande
  successMsg.classList.remove('hidden');

  // vänta 1 (1000 millisekunder) sekund så användaren ser meddelandet, gå sedan till main sidan
  setTimeout(function() {
    window.location.href = 'gokart.html';
  }, 1000);
}

/* event listener*/
document.addEventListener('DOMContentLoaded', function() {

  // login knappen
  document.getElementById('loginBtn').addEventListener('click', handleLogin);

  // ta bort felmeddelande direkt när användaren börjar skriva i mejl-fältet
  document.getElementById('email').addEventListener('input', function() {
    hideEmailError();
  });

});