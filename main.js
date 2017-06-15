console.log("working?")

let resource = "films";

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

$('#filmsButton').click(function(){
  resource = "films";
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
})

$('#planetsButton').click(function(){
  resource = "planets";
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
})

$('#speciesButton').click(function(){
  resource = "species";
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
})

$('#starshipsButton').click(function(){
  resource = "starships";
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
})

$('#vehiclesButton').click(function(){
  resource = "vehicles";
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
})

$('#peopleButton').click(function(){
  resource = "people";
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
})

$('#search').submit(function() {
  event.preventDefault();
  if ($('#table').children().length > 0) {
    console.log('head')
  $('#table').DataTable().clear();
  }
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
  </tfoot>`)

  $('#table').removeClass('hidden');
  const $inputs = $('#search :input');
  let $url = "https://swapi.co/api/" + resource + "/?search=" + $inputs[0].value;
  currUrl = $url;
  console.log('url', $url)
  $('#table').DataTable( {
    ajax: {
        url: $url,
        dataSrc: 'results'
    },
    columns: [
        { data: key1 },
        { data: key2 },
        { data: key3 },
        { data: key4 },
        { data: key5 },
        { defaultContent: '<button>Save</button>' }
    ],
  });
  $("#input").val("");
})



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

$('#fave').click(function(){
  favorites.push(currUrl);
  console.log('faves', favorites)
})

$('#displayFaves').click(function() {
  event.preventDefault();
    let $url = favorites[0];
    console.log('url', $url)
      $.ajax({
    url: $url,
    datatype: 'JSONP'
  })
    .done(function(data) {
      // $('tr').remove();
      // $('td').remove();
      console.log(data);
      let result = data.results[0];
      let resultArr = Object.keys(result);
      $('#favesHeader').removeClass('hidden');
      for (let i = 0; i < resultArr.length; i += 1) {
        let temp = resultArr[i];
        let tempVal = result[resultArr[i]];
        $('#favorites').append(`<tr><td>${temp}</td><td>${tempVal}</td></tr>`);
      }
    })
    .fail(function(data) {
      console.log('error', data)
      let $error = $('<p>', { text: 'Error' });
        $('#table').append($error)
    })
    $("#input").val("");
});