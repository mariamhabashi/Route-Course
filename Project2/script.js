const startedCounters = new Set();

    window.addEventListener("scroll", function () {
      const counters = document.querySelectorAll(".counter");

      counters.forEach(counter => {
        const sectionTop = counter.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight && !startedCounters.has(counter)) {
          startedCounters.add(counter);

          let count = 0;
          const target = +counter.getAttribute("data-count");
          const duration = 500;
          const increment = target / (duration / 5);

          const update = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(update);
            }
            counter.textContent = Math.floor(count);
          }, 20);
        }
      });
    });

    