document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
  
	  // Add a click event on each of them
	  $navbarBurgers.forEach( el => {
		el.addEventListener('click', () => {
  
		  // Get the target from the "data-target" attribute
		  const target = el.dataset.target;
		  const $target = document.getElementById(target);
  
		  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		  el.classList.toggle('is-active');
		  $target.classList.toggle('is-active');
  
		});
	  });
	}
  
});
let idleTime = 0;
$(document).ready(function () {
	// Increment the idle time counter every minute.
	let idleInterval = setInterval(timerIncrement, 60000); // 1 minute

	// Zero the idle timer on mouse movement.
	$(this).mousemove(function (e) {
		idleTime = 0;
	});
	$(this).keypress(function (e) {
		idleTime = 0;
	});
});

async function timerIncrement() {
	idleTime = idleTime + 1;
	if (idleTime > 4) { // 5 minutes
		const response = await fetch('/api/users/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		  });
		
		  if (response.ok) {
			  document.location.replace('/');
			  alert('You\'ve been logged out for being idle to log');
		  }
	}
}