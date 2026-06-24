// ── Reveal on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Waitlist form → Supabase ──
const SUPABASE_URL = 'https://qcipcgzsppjdxutufgfo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aV8bI9HIFG7TqanoR0jXRg_sGVdwWX4';

document.getElementById('waitlistForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('waitlistEmail').value.trim().toLowerCase();
  const form = e.target;
  const success = document.getElementById('formSuccess');
  const button = form.querySelector('button');

  if (!email || !email.includes('@')) return;

  button.disabled = true;
  button.textContent = 'Joining...';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({
        email: email,
        country: 'Landing Page',
        exam: 'N/A',
        source: 'landing',
        created_at: new Date().toISOString(),
      }),
    });

    if (res.ok || res.status === 409) {
      form.style.display = 'none';
      success.style.display = 'block';
    } else {
      throw new Error('Request failed');
    }
  } catch {
    button.disabled = false;
    button.textContent = 'Notify Me 🔔';
    alert('Something went wrong. Please try again.');
  }
});