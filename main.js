console.log("working?")

let resource = "films";

let favorites = [];

let currUrl = "";

$('#filmsButton').click(function(){
  resource = "films";
  console.log(resource)
})

$('#planetsButton').click(function(){
  resource = "planets";
  console.log(resource)
})

$('#speciesButton').click(function(){
  resource = "species";
  console.log(resource)
})

$('#starshipsButton').click(function(){
  resource = "starships";
  console.log(resource)
})

$('#vehiclesButton').click(function(){
  resource = "vehicles";
  console.log(resource)
})

$('#peopleButton').click(function(){
  resource = "people";
  console.log(resource)
})


$('#search').submit(function() {

  event.preventDefault();
    const $inputs = $('#search :input');
    let $url = "https://swapi.co/api/" + resource + "/?search=" + $inputs[0].value;
    currUrl = $url;
    console.log('url', $url)
      $.ajax({
    url: $url,
    datatype: 'JSONP'
  })
    .done(function(data) {
      $('tr').remove();
      $('td').remove();
      console.log(data);

      let result = data.results[0];
      $('#table').append(`<tr id='1tableHeader'></tr>`)
      $('#1tableHeader').append(`<th>Favorite?</th>`)
      Object.keys(result).forEach(function(ele){
        $('#1tableHeader').append(`<th>${ele}</th>`)
      })
      data.results.forEach(function(ele){
        $('#table').append('<tr></tr>')
        console.log('ele', ele)
        let resultArr = Object.keys(ele);
        $('tr').last().append(`<button>Favorite</button>`)
        for (let i = 0; i < resultArr.length; i += 1) {
          let temp = resultArr[i];
          let tempVal = ele[resultArr[i]];
          $('tr').last().append(`<td>${tempVal}</td>`);
        }
      })
    })
    .fail(function(data) {
      console.log('error', data)
      let $error = $('<p>', { text: 'Error' });
        $('#table').append($error)
    })
    $("#input").val("");
});

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