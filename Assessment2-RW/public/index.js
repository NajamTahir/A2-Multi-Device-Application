// Function to toggle forms
function toggleForms(formToShow) {
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    if (formToShow === 'signUpForm') {
      signUpForm.style.display = 'block';
      signInForm.style.display = 'none';
    } else if (formToShow === 'signInForm') {
      signUpForm.style.display = 'none';
      signInForm.style.display = 'block';
    }
  }
  document.getElementById('signup').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('signupPhone').value;
    const age = parseInt(document.getElementById('signupAge').value, 10);
    const gender = document.getElementById('signupGender').value;
  
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, phone, age, gender }),
    });
  
    const result = await response.text();
    alert(result); // Show the response from the server
  });
  

  // Redirect to home.html on sign-in form submission
  document.getElementById('signin').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Redirect to home.html
    window.location.href = 'home.html';
  });