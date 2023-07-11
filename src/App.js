import '../style.css';
import { handleInput, handleDropdownItemClick } from './city-auto-complete';

const inputField = document.getElementById('cityInput');
const dropdownList = document.getElementById('cityDropdown');

inputField.addEventListener('input', handleInput);
inputField.addEventListener('click', () => dropdownList.classList.remove('hidden'));
dropdownList.addEventListener('click', (e) => {
  const clickedItemText = e.target.textContent;

  if (clickedItemText != 'No results found.') {
    handleDropdownItemClick(e);
  }
});

document.addEventListener('click', (event) => {
  if (
    event.target !== inputField &&
    event.target !== dropdownList &&
    !dropdownList.contains(event.target)
  ) {
    dropdownList.classList.add('hidden');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dropdownList.classList = 'hidden';
  }
});
