(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".copy-btn").forEach(function (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy") || "";
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      });
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });

  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.startsWith("#")) {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: link, el: sec });
    }
  });

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.remove("active");
            });
            var match = sections.find(function (s) {
              return s.el === entry.target;
            });
            if (match) match.link.classList.add("active");
          }
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      navObserver.observe(s.el);
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  var terminalTabs = document.querySelectorAll(".terminal-tab");
  if (terminalTabs.length) {
    terminalTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-terminal");
        terminalTabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        ["starter", "pro"].forEach(function (id) {
          var el = document.getElementById("terminal-" + id);
          if (!el) return;
          var show = id === target;
          el.hidden = !show;
          el.classList.toggle("terminal-hidden", !show);
        });
      });
    });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var flip = false;
      setInterval(function () {
        flip = !flip;
        var next = document.querySelector('.terminal-tab[data-terminal="' + (flip ? "pro" : "starter") + '"]');
        if (next) next.click();
      }, 8000);
    }
  }
})();
