  function initialize() {
    var latlng = new google.maps.LatLng(35.656603,139.544097);
    var myOptions = {
      zoom: 17,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
  var marker = new google.maps.Marker({
      position: latlng,
      map: map, 
      title:"A303!!"
  });   
  }
