var saveDataRef = firebase.database().ref('data/');
initMap();

saveDataRef.on("value", function(snapshot) {
    var template = '';
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var itemObj = JSON.stringify(childData);
        template += `
            <li onclick="viewOnMap(${childData.longitude}, ${childData.latitude}, '${moment(childData.date_added).format("MM D, YYYY")}','${childData.photo_url}','${childData.upload_comment}')"><i class="fa fa-globe"></i> Alert - ${moment(childData.date_added).format("MM D, YYYY")}</li>
        `;
    });

   
    $(".side-div-content").html(template)
    
}, function (error) {
    console.log("Error: " + error.code);
});


function viewOnMap(lon, lat, date, url, comment) {
    var myLatLng = {lat: lat, lng: lon};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: ''
    });

    $(".map-img").prop("src",url);
    $(".map-desc").html(comment)

}

function initMap() {
    var myLatLng = {lat: 0.00000000, lng: 0.00000000};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: ''
    });
}