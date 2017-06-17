//  Initialize default values for variables
let resource = 'films';

let tr1 = 'Title';
let tr2 = 'Director';
let tr3 = 'Producers';
let tr4 = 'Episode';
let tr5 = 'Release Date';

let key1 = 'title';
let key2 = 'director';
let key3 = 'producer';
let key4 = 'episode_id';
let key5 = 'release_date';

//  re-assign variables on resource selection
$('#filmsButton').click(() => {
  resource = 'films';
  tr1 = 'Title';
  tr2 = 'Director';
  tr3 = 'Producers';
  tr4 = 'Episode';
  tr5 = 'Release Date';
  key1 = 'title';
  key2 = 'director';
  key3 = 'producer';
  key4 = 'episode_id';
  key5 = 'release_date';
});

$('#planetsButton').click(() => {
  resource = 'planets';
  tr1 = 'Name';
  tr2 = 'Terrain';
  tr3 = 'Climate';
  tr4 = 'Population';
  tr5 = 'Gravity';
  key1 = 'name';
  key2 = 'terrain';
  key3 = 'climate';
  key4 = 'population';
  key5 = 'gravity';
});

$('#speciesButton').click(() => {
  resource = 'species';
  tr1 = 'Name';
  tr2 = 'Language';
  tr3 = 'Classification';
  tr4 = 'Designation';
  tr5 = 'Lifespan';
  key1 = 'name';
  key2 = 'language';
  key3 = 'classification';
  key4 = 'designation';
  key5 = 'average_lifespan';
});

$('#starshipsButton').click(() => {
  resource = 'starships';
  tr1 = 'Name';
  tr2 = 'Starship Class';
  tr3 = 'Model';
  tr4 = 'Manufacturer';
  tr5 = 'Passengers';
  key1 = 'name';
  key2 = 'starship_class';
  key3 = 'model';
  key4 = 'manufacturer';
  key5 = 'passengers';
});

$('#vehiclesButton').click(() => {
  resource = 'vehicles';
  tr1 = 'Name';
  tr2 = 'Vehicle Class';
  tr3 = 'Model';
  tr4 = 'Manufacturer';
  tr5 = 'Cost';
  key1 = 'name';
  key2 = 'vehicle_class';
  key3 = 'model';
  key4 = 'manufacturer';
  key5 = 'cost_in_credits';
});

$('#peopleButton').click(() => {
  resource = 'people';
  tr1 = 'Name';
  tr2 = 'Birth Year';
  tr3 = 'Gender';
  tr4 = 'Height';
  tr5 = 'Mass';
  key1 = 'name';
  key2 = 'birth_year';
  key3 = 'gender';
  key4 = 'height';
  key5 = 'mass';
});

// submit search conditions
$('#search').submit(() => {
  event.preventDefault();

  //  conditional to clear table for reload
  if ($('#table').children().length > 0) {
    $('#table').DataTable().destroy();
    $('#table').empty();
  }

  //first append table headers and footers
  $('#table').append(
    `<thead>
      <tr>
          <th>${tr1}</th>
          <th>${tr2}</th>
          <th>${tr3}</th>
          <th>${tr4}</th>
          <th>${tr5}</th>
          <th>Favorite</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
          <th>${tr1}</th>
          <th>${tr2}</th>
          <th>${tr3}</th>
          <th>${tr4}</th>
          <th>${tr5}</th>
          <th>Favorite</th>
      </tr>
    </tfoot>`);

  //  AJAX call to api
  let $inputs = $('#search :input');
  let condition = $inputs[0].value;
  let $url = `https://swapi.co/api/${resource}/?search=${condition}`;
  $('#table').DataTable( {
    ajax: {
      url: $url,
      dataSrc: 'results',
    },
    columns: [
      { data: key1 },
      { data: key2 },
      { data: key3 },
      { data: key4 },
      { data: key5 },
      { defaultContent: '<button id="saver" class="saveButton">Save</button>' },
    ],
  });
  $('#input').val('');
});

//save button functionality
$('#table').on( 'click', '.saveButton', function(e) {
  let row = $(this).closest('tr');
  let rowsData = $('#table').DataTable().row(row).data();

  let sendObj = {};
  sendObj[key1] = rowsData[key1];
  sendObj[key2] = rowsData[key2];
  sendObj[key3] = rowsData[key3];
  sendObj[key4] = rowsData[key4];
  sendObj[key5] = rowsData[key5];

  let name = rowsData[key1];

  console.log('Object to send', sendObj);

    $.ajax({
      method: 'POST',
      url: '/starwars',
      data: sendObj,
      success: (result) => {
        alert(`Been saved, ${name} has.`);
      },
      error: (xhr, text, err) => {
        console.log('error: ', err);
        console.log('text: ', text);
        console.log('xhr: ', xhr);
        console.log('Lord Vader has force choked your ajax request');
      },
    });
});

// GET request to favorites in database
$('#displayFaves').click(() => {

  // Conditional so function doesn't fire if favorites are already displayed
  if ($('#favorites').children().length > 1) {
    return false;
  }

  $.get('/starwars', (data, status) => {

    // conditional to alert if user has no favorites
    if (Object.keys(data) < 1) {
      alert('Only a Sith Lord has no favorites!');
      return false;
    }

    // append Header to favorites section with remove button
    $('#favorites').prepend(`<div id='faveHead'><h2 id='faveHeader'>Favorites</h2><button id='faveClose'>X</button></div><br>`);

      // Render each 'favorite' as tile holding table data, textarea for notes, and buttons to save notes and delete favorite from database
    data.forEach((ele) => {
      let arr = Object.keys(ele);
      $('#faveList').append(`<div class='flexEle'><div class='leftDiv'><table class='lastTable'></table></div><div class='rightDiv'><form class='textareaForm'><textarea class='notes' placeholder='Notes...'></textarea><a class='textSave' id='textareaSave'>Save</a><a class='delete'>X</a></form></div></div>`);
      for (let i = 1; i < arr.length; i += 1) {
        let tempKey = arr[i];
        let tempVal = ele[arr[i]];
        $('.lastTable').last().append(`<tr><td>${tempKey}</td><td>${tempVal}</td></tr>`);
      }
    });
  });
});


//Save notes to database
$('#favorites').on( 'click', '#textareaSave', function(e) {
  let note = $(this).parent().find(".notes").val();
  let arr = $(this).parent().parent().parent().find('td');
  let key = arr[0].innerText;
  let val = arr[1].innerText;

  let noteObj = {};
  noteObj[key] = val;
  noteObj['notes'] = note;

  $.ajax({
    method: 'POST',
    url: '/update',
    data: noteObj,
    success: (result) => {
      alert('Been saved, your notes have.');
    },
    error: (xhr, text, err) => {
      console.log('error: ',err);
      console.log('text: ', text);
      console.log('xhr: ',xhr);
      console.log('Lord Vader has force choked your ajax request');
    }
  })
})

// Remove favorite from database
$('#favorites').on( 'click', '.delete', function(e) {
  let arr = $(this).parent().parent().parent().find('td');
  let key = arr[0].innerText;
  let val = arr[1].innerText;

  let dObj = {};
  dObj[key] = val;

  let name = dObj[key];

  $.ajax({
    method: 'DELETE',
    url: '/starwars',
    data: dObj,
    success: (result) => {

      // Remove deleted favorite tile from DOM
      $(this).parent().parent().parent().parent().find('div').first().remove();
      alert(`You've erased ${name} from the archive memory.`);
    },
    error: (xhr, text, err) => {
      console.log('error: ',err);
      console.log('text: ', text);
      console.log('xhr: ',xhr);
      console.log('Lord Vader has force choked your ajax request');
    },
  });
});

// Remove all favorites from DOM
$('#favorites').on( 'click', '#faveClose', (e) => {
  $('#favorites').find('div').first().remove();
  $('#favorites').find('br').first().remove();
  $('#faveList').empty();
});



//OLD CODE FOR DISPLAYING TABLE WITHOUT BOOTSTRAP

// $('#search').submit(function() {
//   event.preventDefault();
//     const $inputs = $('#search :input');
//     let $url = "https://swapi.co/api/" + resource + "/?search=" + $inputs[0].value;
//     currUrl = $url;
//     console.log('url', $url)
//       $.ajax({
//       url: $url,
//       datatype: 'JSONP'
//   })
//     .done(function(data) {
//       $('tr').remove();
//       $('td').remove();
//       console.log('data', data);

//       let result = data.results[0];
//       $('#table').append(`<tr id='1tableHeader'></tr>`)
//       $('#1tableHeader').append(`<th>Favorite?</th>`)
//       Object.keys(result).forEach(function(ele){
//         $('#1tableHeader').append(`<th>${ele}</th>`)
//       })
//       data.results.forEach(function(ele){
//         $('#table').append('<tr></tr>')
//         console.log('ele', ele)
//         let resultArr = Object.keys(ele);
//         $('tr').last().append(`<td><button class='faveButton'>Favorite</button></td>`)
//         for (let i = 0; i < resultArr.length; i += 1) {
//           let temp = resultArr[i];
//           let tempVal = ele[resultArr[i]];
//           $('tr').last().append(`<td>${tempVal}</td>`);
//         }
//       })
//     })
//     .fail(function(data) {
//       console.log('error', data)
//       let $error = $('<p>', { text: 'Error' });
//         $('#table').append($error)
//     })
//     $("#input").val("");
// });

// $('#fave').click(function(){
//   favorites.push(currUrl);
//   console.log('faves', favorites)
// })

// $('#displayFaves').click(function() {
//   event.preventDefault();
//     let $url = favorites[0];
//     console.log('url', $url)
//       $.ajax({
//     url: $url,
//     datatype: 'JSONP'
//   })
//     .done(function(data) {
//       // $('tr').remove();
//       // $('td').remove();
//       console.log(data);
//       let result = data.results[0];
//       let resultArr = Object.keys(result);
//       $('#favesHeader').removeClass('hidden');
//       for (let i = 0; i < resultArr.length; i += 1) {
//         let temp = resultArr[i];
//         let tempVal = result[resultArr[i]];
//         $('#favorites').append(`<tr><td>${temp}</td><td>${tempVal}</td></tr>`);
//       }
//     })
//     .fail(function(data) {
//       console.log('error', data)
//       let $error = $('<p>', { text: 'Error' });
//         $('#table').append($error)
//     })
//     $("#input").val("");
// });