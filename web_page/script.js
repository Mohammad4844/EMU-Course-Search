const possible_codes = {'0': ['031', '035', '045', '097', '098'], '1': ['100', '100L4', '101', '101L1', '101L3', '102', '102L1', '103', '103L1', '104', '104L1', '105', '105L4', '106', '106L1', '106L3', '107', '108', '109', '110', '110L1', '111', '112', '112L1', '113', '113L1', '114', '114L1', '115', '115A', '115B', '116', '116A', '116B', '117', '118', '118L1', '119', '120', '121', '121A', '121L5', '122', '122A', '122L5', '123', '123L1', '124', '124L1', '125', '125L1', '125L2', '126', '126L1', '127', '127L1', '128L1', '130', '130L1', '131', '131L3', '132', '134', '135', '135L4', '137', '138L1', '140', '140L1', '141', '143L1', '144', '145', '146', '149L1', '150', '151', '152', '153', '155', '156', '158', '160', '161', '162', '165', '167', '169', '170', '170L1', '171L1', '173L1', '175', '175A', '175B', '178', '179', '180', '180L1', '193L1', '195', '196'], '2': ['200', '200L4', '201', '201L1', '202', '202L4', '203', '204', '205', '206', '207', '208', '209', '209L4', '210', '210L1', '211', '211L5', '212', '213', '214', '215', '216', '217', '219', '220', '221', '221L5', '222', '223', '224', '225', '226', '226L1', '227', '228', '229', '229L1', '230', '230L1', '230L2', '231', '231L1', '232', '233', '233L5', '234L5', '235', '236L4', '237', '238L1', '239', '240', '240L1', '241', '242', '243', '243L3', '244', '244L3', '245', '246', '247', '247L3', '248L3', '249L3', '250', '250L4', '251', '251L3', '251L4', '252', '252L4', '253', '254', '255', '255L1', '256', '256L1', '257', '258', '260', '261', '262', '263', '264', '265', '267', '269', '270', '270L1', '271', '274', '275', '276', '279', '280', '281', '283', '284', '285', '285L4', '286L4', '287L4', '290', '293', '295', '296', '297', '299'], '3': ['300', '300W', '301', '301L1', '301L2', '301W', '302', '303', '304', '304L4', '304W', '305', '305L4', '306', '306W', '307', '307L4', '307W', '308', '309', '309W', '310', '310L4', '311', '311L4', '311W', '312', '313', '314', '314W', '315', '316', '317', '318', '319', '319W', '320', '320L3', '321', '322', '322L5', '323', '323L4', '324', '324W', '325', '325W', '326', '327', '328', '328W', '329', '329W', '330', '330L4', '331', '331L4', '331W', '332', '333', '333W', '334', '335', '335W', '336', '337', '340', '341', '342', '343', '343L5', '343W', '344', '344L5', '345', '346', '347', '348L1', '349', '350', '350L2', '350W', '351', '351L4', '352', '352W', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365', '365W', '367', '368', '368W', '369', '370', '371', '371A', '371B', '372', '373', '373L2', '374', '374L2', '375', '375A', '375B', '375L2', '375W', '376', '376L2', '379', '379B', '380', '380W', '381', '381L4', '382', '382L4', '384', '385', '385L4', '385W', '386', '386W', '387L4', '388', '388L4', '390', '392', '394', '395', '396', '398L5', '399', '399L5'], '4': ['400', '400W', '401', '401L1', '401L2', '402', '403', '403W', '404', '405', '405L4', '406W', '407', '408', '408W', '409', '409W', '410', '411', '412', '412W', '413', '414', '415', '415A', '415B', '415W', '416', '416A', '416B', '417', '418', '419', '420', '421', '422', '422W', '423', '424', '425', '426', '426W', '427', '427L4', '427W', '428', '429', '430', '430W', '431', '432', '433', '435', '436', '437', '438', '439', '440', '440W', '441', '442', '443W', '444', '444W', '445', '445L5', '446', '446L5', '447', '447W', '448', '449L4', '449W', '450', '450L4', '450W', '451', '451L4', '452L4', '453', '454', '454L4', '455', '455W', '456', '457', '460', '461', '462', '463', '464', '465', '465W', '466W', '467', '468', '469', '470', '471', '472', '473', '474', '475', '475W', '476', '477', '478', '479', '479C', '480', '480L4', '480W', '481', '481L4', '481W', '482', '482L4', '483', '483L4', '485', '485W', '486', '486L4', '487L4', '488L2', '488L4', '489L4', '489L5', '490', '490L4', '490W', '491', '492', '492L4', '492L6', '493', '493L4', '493L6', '494L4', '495', '495L2', '495L4', '495W', '496', '496L4', '496W', '497', '497L4', '497L5', '497L6', '498', '498L4', '498L5', '498L6', '499', '499L1', '499L4', '499L5', '499L6'], '5': ['500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '509A', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', '521', '522', '525', '526', '527', '528', '529', '530', '531', '535', '538', '540', '541', '542', '543', '544', '545', '546', '547', '548', '550', '551', '552', '553', '554', '555', '556', '558', '559', '560', '562', '563', '564', '565', '567', '568', '569', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '580', '581', '582', '583', '584', '585', '586', '588', '589', '590', '591', '592', '593', '595', '596', '597', '598', '599'], '6': ['600', '601', '602', '603', '604', '605', '606', '607', '608', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '632', '635', '636', '638', '640', '641', '642', '645', '646', '647', '648', '650', '651', '654', '655', '657', '659', '660', '661', '662', '664', '665', '667', '669', '670', '671', '672', '673', '674', '674A', '674B', '674C', '674D', '675', '676', '677', '678', '680', '683', '685', '686', '687', '688', '689', '690', '691', '691A', '691B', '691C', '691D', '692', '693', '694', '695', '696', '697', '698', '699'], '7': ['701', '709', '710', '710A', '710B', '710C', '710D', '710E', '710F', '710G', '710H', '710I', '713', '726', '740', '743', '751', '767', '773', '787', '788', '797', '798', '799'], '8': ['800', '801', '805', '808', '811', '815', '817', '852', '879', '882', '883', '885', '889', '891', '893', '894', '895', '896', '897', '898', '899'], '9': ['990']};

$(document).ready(function() {
  $('.js-example-basic-single').select2();
});

const addEntryButton = document.getElementById("add-entry");
const entriesList = document.getElementById("entries");
const dayInput = document.getElementById("days");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");

// updating availability each time one is added
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

function get_possible_codes(i) {
  if (i == 7) {
    return possible_codes[7].concat(possible_codes[8]).concat(possible_codes[9])
  } else {
    return possible_codes[i]
  }
}

document.addEventListener('DOMContentLoaded', async function temp() {
  const fetchButton = document.getElementById('search');
  const resultsContainer = document.getElementById('results');

  function array_to_url_params(array, param_name) {
    if (param_name === 'availabilities') {
      return array.map(item =>
        `availabilities[][day]=${encodeURIComponent(item.day)}&availabilities[][start_time]=${encodeURIComponent(item.start_time)}&availabilities[][end_time]=${encodeURIComponent(item.end_time)}`
      ).join('&');
    } else {
      return array.map(dept => `${param_name}[]=${encodeURIComponent(dept)}`).join('&');
    }
  }

  fetchButton.addEventListener('click', async function () {
    let departments = Array.from(document.getElementById('departments').selectedOptions).map(option => option.value);
    let course_codes = Array.from(document.getElementById('course_codes').selectedOptions).map(option => get_possible_codes(option.value)).flat();
    let characteristics = Array.from(document.getElementById('characteristics').selectedOptions).map(option => option.value);
    let availabilities = get_availabilities_from_html();

    api_url = 'http://127.0.0.1:3000/search?'

    
    if (departments.length > 0) {
      api_url += array_to_url_params(departments, 'departments');
    }
    if (course_codes.length > 0) {
      api_url += array_to_url_params(course_codes, 'course_codes');
    }
    if (characteristics.length > 0) {
      api_url += array_to_url_params(characteristics, 'characteristics');
    }
    if (availabilities.length > 0) {
      api_url += array_to_url_params(availabilities, 'availabilities');
    }

    const response = await fetch(api_url);
    
    const data = await response.json();
    console.log(response.status); // Check the response status
console.log(response.headers); // Check the response headers
    console.log(data);
    resultsContainer.textContent += data
  });
});



