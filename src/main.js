// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page is ready!");

  // Get a button and add a click event
  const logoButton = document.getElementById('logoHolder');
  const eventsButton = document.getElementById('eventButton');

  console.log("getters fired");

  if (logoButton){
    console.log("logoButton found");
    logoButton.addEventListener("click", function () {
      console.log("KLIK");
      goToPage("../index.html");
    });
  }
  if (eventsButton){
    console.log("eventsButton found");
    eventsButton.addEventListener("click", function () {
      console.log("KLIK");
      goToPage("../events.html");
    });
  }

});


function goToPage(url){
  window.location.href = url;
}

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Function to toggle the menu visibility
function toggleMenu() {
  menu.classList.toggle('active'); // Add or remove 'active' class to slide the menu in/out
}