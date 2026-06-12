// Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Waitlist form (placeholder — wire to Supabase later)
  function handleWaitlist(e) {
    e.preventDefault();
    const email = document.getElementById('waitlistEmail').value;
    const form = e.target;
    const success = document.getElementById('formSuccess');

    // TODO: replace with real Supabase insert, e.g.
    // fetch('https://YOUR_PROJECT.supabase.co/rest/v1/waitlist', { ... })

    form.style.display = 'none';
    success.style.display = 'block';
    console.log('Waitlist signup:', email);
    return false;
  }