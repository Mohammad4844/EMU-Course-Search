
$(document).ready(function() {
  $('.js-example-basic-single').select2();
});

const addEntryButton = document.getElementById("add-entry");
const entriesList = document.getElementById("entries");
const dayInput = document.getElementById("days");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");

addEntryButton.addEventListener("click", () => {
  const days = Array.from(dayInput.selectedOptions, option => option.value);
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;

  if (days && startTime && endTime) {
    days.forEach(day => {
      const entry = document.createElement("li");
      entry.innerHTML = `
        <strong><span class="m-1">${day}</span></strong> |
        <span class="m-1">${startTime}</span> - <span class="m-1">${endTime}</span>
        <a href="#" class="remove btn btn-outline-danger btn-sm m-1">Remove</a>
      `;
      entry.className += 'list-group-item'
      entriesList.appendChild(entry);
  
      // Clear days field
      $('#days').select2();
      function deselect($selector, idToDeselect) {
        if($selector.val() !== null) {
          new_data = $.grep($selector.val(), function (id) {
            return id != idToDeselect;
          });
          $selector.val(new_data).trigger('change');
        }
      }
      ['M', 'T', 'W', 'R', 'F'].forEach(day => deselect($('#days'), day));
      // Clear time fields
      startTimeInput.value = "";
      endTimeInput.value = "";
  
      // Add remove functionality
      const removeLink = entry.querySelector(".remove");
      removeLink.addEventListener("click", () => {
        entriesList.removeChild(entry);
      });
    });
  }
});