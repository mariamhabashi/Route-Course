// Counter Animation
const startedCounters = new Set();

window.addEventListener("scroll", function () {
  const counters = document.querySelectorAll(".counter");
  const screenHeight = window.innerHeight;

  counters.forEach(counter => {
    // Check if counter element is still in the DOM
    if (!document.body.contains(counter)) {
        startedCounters.delete(counter); // Clean up if element is removed
        return;
    }
    const sectionTop = counter.getBoundingClientRect().top;

    if (sectionTop < screenHeight && !startedCounters.has(counter)) {
      startedCounters.add(counter);

      let count = 0;
      const target = +counter.getAttribute("data-count");
      const duration = 1000; // Animation duration in ms
      const intervalTime = 20; // Update interval in ms
      
      const steps = duration / intervalTime;
      const increment = target / steps;

      const update = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(update);
        }
        counter.textContent = Math.floor(count);
      }, intervalTime);
    }
  });
});


// Navbar and Scrollspy Logic
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50; // Pixels to scroll before navbar changes

    // Navbar scroll effect
    if (navbar) { // Check if navbar exists
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement && navbar) { // Check if target and navbar exist
                    const navbarHeight = navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile navbar after click
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                } else if (targetElement) { // If navbar doesn't exist, scroll normally
                     window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.pageYOffset,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Active link highlighting based on scroll
    const sections = document.querySelectorAll('section[id]'); // Selects all sections with an ID
    const homeLink = document.querySelector('.navbar-nav a[href="#home"]'); // Get the Home link

    function navHighlighter() {
        if (!navbar) return; // Don't run if navbar doesn't exist

        let scrollY = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;
        let isAnySectionActive = false; // Flag to check if any regular section is active

        // Handle sections other than "home"
        sections.forEach(current => {
            const sectionId = current.getAttribute('id');
            const currentLink = document.querySelector('.navbar-nav a[href="#' + sectionId + '"]');

            if (currentLink) { // Ensure the link exists
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - navbarHeight - 50; // Adjust offset

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentLink.classList.add('active');
                    if (currentLink.parentNode.tagName === 'LI') {
                        currentLink.parentNode.classList.add('active-li');
                    }
                    if (sectionId !== 'home') { // 'home' might be a header, not a section
                        isAnySectionActive = true;
                    }
                } else {
                    currentLink.classList.remove('active');
                    if (currentLink.parentNode.tagName === 'LI') {
                        currentLink.parentNode.classList.remove('active-li');
                    }
                }
            }
        });

        // Handle the "Home" link (which usually points to the top/header)
        if (homeLink) {
            // Determine the top of the first *actual* content section
            let firstContentSectionTop = Infinity;
            const firstContentSection = document.querySelector('section[id]:not([id="home"])'); // Find first section not named 'home'
            if (firstContentSection) {
                firstContentSectionTop = firstContentSection.offsetTop - navbarHeight - 50;
            } else {
                // If no other sections, home is active if at top
                 firstContentSectionTop = headerHeight > 0 ? headerHeight - navbarHeight - 50 : 200; // Fallback if no sections
            }


            if (!isAnySectionActive && scrollY < firstContentSectionTop) {
                // If no other section is active and we are above the first content section, "Home" is active
                homeLink.classList.add('active');
                if (homeLink.parentNode.tagName === 'LI') {
                    homeLink.parentNode.classList.add('active-li');
                }
            } else {
                // Otherwise (another section is active OR we are scrolled past the 'home' area), "Home" is not active
                homeLink.classList.remove('active');
                if (homeLink.parentNode.tagName === 'LI') {
                    homeLink.parentNode.classList.remove('active-li');
                }
            }

            // Special case: If we are at the very top, explicitly make Home active
            // This is important for initial load and scrolling back to the top.
            if (scrollY < 50) { // A small threshold for "very top"
                 homeLink.classList.add('active');
                 if (homeLink.parentNode.tagName === 'LI') {
                    homeLink.parentNode.classList.add('active-li');
                }
                 // And ensure no other section thinks it's active if we are truly at the top
                 if (!isAnySectionActive) {
                    sections.forEach(s => {
                        const sId = s.getAttribute('id');
                        if (sId !== 'home') { // Assuming 'home' is the id of your header/top section
                           const sLink = document.querySelector(`.navbar-nav a[href="#${sId}"]`);
                           if (sLink) {
                               sLink.classList.remove('active');
                               if (sLink.parentNode.tagName === 'LI') {
                                   sLink.parentNode.classList.remove('active-li');
                               }
                           }
                        }
                    });
                 }
            }
        }
    }

    // Initial call and on scroll for navHighlighter
    if (sections.length > 0 || homeLink) { // Only add listener if there are sections or a home link
        window.addEventListener('scroll', navHighlighter);
        navHighlighter(); // Call it once on load to set initial state
    }
});