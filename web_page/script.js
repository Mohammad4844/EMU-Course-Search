
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
      new_availabilty = {'day': day, 'start_time': startTime, 'end_time': endTime};
      availabilities = get_availabilities_from_html();
      updated_availabilities = add_availabilty(availabilities, new_availabilty)
      rebuild_availabilities_list(updated_availabilities)
    });
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
  }
});

function get_availabilities_from_html() {
  availabilities = []
  entries = entriesList.querySelectorAll('li');
  entries.forEach(li => {
    const spans = li.querySelectorAll('span');
    const day = spans[0].textContent;
    const startTime = spans[1].textContent;
    const endTime = spans[2].textContent;
    availabilities.push({'day': day, 'start_time': startTime, 'end_time': endTime});
  });
  return availabilities
}

function rebuild_availabilities_list(availabilities) {
  entriesList.innerHTML = '';
  availabilities.forEach(availability => {
    // add availabilty to the list
    const entry = document.createElement("li");
      entry.innerHTML = `
        <span class="m-1"><strong>${availability.day}</strong></span> |
        <span class="m-1">${availability.start_time}</span> - <span class="m-1">${availability.end_time}</span>
        <a href="#" class="remove btn btn-outline-danger btn-sm m-1">Remove</a>
      `;
      entry.className += 'list-group-item';
      entriesList.appendChild(entry);
      // add remove button to the list
      const removeLink = entry.querySelector(".remove");
      removeLink.addEventListener("click", () => {
        entriesList.removeChild(entry);
      });
  });
}

function add_availabilty(availabilities, new_availabilty) {
  // seperate the availabilities not on the same day
  different_day_availabilities = availabilities.filter(item => item.day !== new_availabilty.day);

  same_day_availabilities = availabilities.filter(item => item.day === new_availabilty.day);
  same_day_availabilities.push(new_availabilty);

  function join_operation(availabilities) {
    function do_times_overlap(a1, a2) {
      start1 = new Date(`1970-01-01T${a1.start_time}`);
      end1 = new Date(`1970-01-01T${a1.end_time}`);
      start2 = new Date(`1970-01-01T${a2.start_time}`);
      end2 = new Date(`1970-01-01T${a2.end_time}`);
      return (a1.day === a2.day && start1 <= end2 && end1 >= start2);
    }

    function join_time_interval(a1, a2) {
      start1 = new Date(`1970-01-01T${a1.start_time}`);
      end1 = new Date(`1970-01-01T${a1.end_time}`);
      start2 = new Date(`1970-01-01T${a2.start_time}`);
      end2 = new Date(`1970-01-01T${a2.end_time}`);

      startTime = start1 < start2 ? start1 : start2;
      startTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
      endTime = end1 > end2 ? end1 : end2;
      endTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

      return {
        'day': a1.day,
        'start_time': startTime,
        'end_time': endTime
      };
    }

    for (let i = 0; i < availabilities.length; i++) {
      for (let j = i + 1; j < availabilities.length; j++) {
        let a1 = availabilities[i]
        let a2 = availabilities[j]
        if (i != j && do_times_overlap(a1, a2)) {
          joined_availability = join_time_interval(a1, a2)
          return availabilities.filter(a => a != a1 && a != a2).concat([joined_availability]);
        }
      }
    }
    return false
  }

  while (true) {
    joined_availabilities = join_operation(same_day_availabilities);
    if (joined_availabilities == false) {
      break;
    } else {
      same_day_availabilities = joined_availabilities;
    }
  }

  return different_day_availabilities.concat(same_day_availabilities);
}



