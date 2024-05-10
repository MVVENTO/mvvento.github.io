
/*     Shop btn     */
// Create the shop button element


// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the button element
  const shopButton = document.getElementById('shop');

  // Add a click event listener to the button
  shopButton.addEventListener('click', function() {
    // This function will be executed when the button is clicked
    console.log('Button clicked!');
    // Add your desired functionality here, such as navigating to another page
     window.location.href = 'product1.html'; 
  });
});


