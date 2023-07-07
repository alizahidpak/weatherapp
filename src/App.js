import '../style.css';
import { handleInput, handleDropdownItemClick } from './city-auto-complete';

const inputField = document.getElementById('cityInput');
const dropdownList = document.getElementById('cityDropdown');

inputField.addEventListener('input', handleInput);
inputField.addEventListener('click', handleInput);
dropdownList.addEventListener('click', (e) => {
  const unclickableTexts = ['No results found.', 'Fetching data, please wait...'];
  const clickedItemText = e.target.textContent;

  if (!unclickableTexts.includes(clickedItemText)) {
    handleDropdownItemClick(e);
  }
});

// Hide the dropdown list when clicking outside of it
document.addEventListener('click', (event) => {
  if (
    event.target !== inputField &&
    event.target !== dropdownList &&
    !dropdownList.contains(event.target)
  ) {
    dropdownList.innerHTML = '';
  }
});

// Hide the dropdown list when pressing the ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dropdownList.innerHTML = '';
  }
});
