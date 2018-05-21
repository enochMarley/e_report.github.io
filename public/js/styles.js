var longitude, latitude;
var elems = document.querySelectorAll('.response-modal');
var modalInstance = M.Modal.init(elems);
var uploadPhoto = "";
var storageRef = firebase.storage().ref('images');
var saveDataRef = firebase.database().ref('data/');

function upload() {
    if (longitude && latitude) {
        $(".modal-content").html(`
            <img src="/images/loading.gif" class="loader-img"> <small>Uploading. Please wait...</small>
        `);
        $(".modal-footer").hide();
        $(".response-modal").modal('open',{
            dismissible: false
        })

       
        var file = uploadPhoto;
        const name = (+new Date()) + '-' + file.name;
       
        var task = storageRef.child(name).put(file);
        task.then(function(snapshot) {
            setTimeout(function() {
                storageRef.child(name).getDownloadURL().then(function(url) {
                    var data = {
                        longitude: longitude,
                        latitude: latitude,
                        photo_url: url,
                        date_added: Date.now()
                    };
    
                    saveDataRef.push(data).then(function() {
                        $(".modal-footer").show();
                        $(".modal-content").html("Upload successful")
                    }).catch(function(error) {
                        $(".modal-footer").show();
                        $(".modal-content").html("Unable to upload photo. Please check your internet connection")
                    })
                }).catch((error) => {
                    console.log(error)
                })
            },1000);
        });

    } else {
        alert("Sorry, your mobile device does not support geolocation...")
    }
}

function refresh() {
    $(".preview-div").css("visibility","hidden");
    $(".intro-div").show();
    $(".upload-form").trigger("reset");
}



$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    } else {
        alert("Sorry, your mobile device does not support geolocation...")
    }
});


function readURL(input) {
    if (input.files && input.files[0]) {
        $(".preview-div").css("visibility","visible");
        $(".intro-div").hide();
        uploadPhoto = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#upload-img").change(function(){
    readURL(this);
});