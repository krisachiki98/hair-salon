const searchInput = document.getElementById('search-input');
const teamCards = Array.from(document.querySelectorAll('#team-grid .card'));
const searchCount = document.getElementById('search-count');
const searchEmpty = document.getElementById('search-empty');

const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const timeButtons = Array.from(document.querySelectorAll('.time-buttons button'));
const bookingForm = document.getElementById('booking-form');

const summaryService = document.getElementById('summary-service');
const summaryDate = document.getElementById('summary-date');
const summaryTime = document.getElementById('summary-time');

const formatCount = (count) => {
  if (count === 1) {
    return '1 резултат';
  }
  return `${count} резултата`;
};

const updateSearch = () => {
  const query = searchInput.value.toLowerCase().trim();
  let visible = 0;

  teamCards.forEach((card) => {
    const haystack = `${card.dataset.name} ${card.dataset.tags}`.toLowerCase();
    const match = query.length === 0 || haystack.includes(query);
    card.style.display = match ? 'block' : 'none';
    if (match) {
      visible += 1;
    }
  });

  searchCount.textContent = formatCount(visible);
  searchEmpty.hidden = visible !== 0;
};

const updateSummary = () => {
  const service = bookingForm.service.value;
  const dateValue = dateInput.value;
  const timeValue = timeInput.value;

  summaryService.textContent = service || '—';

  if (dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    summaryDate.textContent = date.toLocaleDateString('bg-BG', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  } else {
    summaryDate.textContent = '—';
  }

  summaryTime.textContent = timeValue || '—';
};

const syncTimeButtons = (value) => {
  timeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.time === value);
  });
};

searchInput.addEventListener('input', updateSearch);

bookingForm.addEventListener('input', () => {
  syncTimeButtons(timeInput.value);
  updateSummary();
});

timeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.time;
    timeInput.value = value;
    syncTimeButtons(value);
    updateSummary();
  });
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  updateSummary();
  bookingForm.reset();
  syncTimeButtons('');
  updateSummary();
  alert('Благодарим! Ще се свържем с вас за потвърждение на часа.');
});

updateSearch();
updateSummary();
