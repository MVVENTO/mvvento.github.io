
/*     Shop btn     */
// Create the shop button element
document.addEventListener("DOMContentLoaded", function() {
  const shopButton = document.getElementById('shop');

  if (shopButton) {
    // Set the button text
    shopButton.textContent = "Enter Shop";

    // Set the button link (assuming you want it to link to contact.html)
    shopButton.href = "contact.html";
  } else {
    console.error("Shop button element with ID 'shop' not found!");
  }
});

