/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("document").ready(function (){
    $("#page_content").css("background-color", "black");
    $(".navbar-nav a").on("click", function() {
        var link = $(this).attr("href");
        var param;
        switch (link) {
            case "#home":
                $("#page_content").load("home.html"); 
                $("#page_content").css("background-color", "black");
                
                param = "images";
                var result;
                var request = ajax(param);
                request.done(function(res) {
                    
                    result = res;
                    
                    console.log("src: " + result.source);
                    console.log("caption: " + result.caption);
                    console.log("type: " + result.file);
                    
                    var newImage = {
                        src: result.source,
                        caption: result.caption,
                        type: result.file
                    }
                    
                    console.log("newImage: " + Object.values(newImage));
                    var images = JSON.parse(localStorage.getItem("images"));
                    if (images === null) images = [];

                    images.push(JSON.stringify(newImage));
                    localStorage.setItem("images", JSON.stringify(images));
                }).fail(function () {
                    console.log("ajax call failed...");
                });
                
                break;
            
            case "#about":
                $("#page_content").load("about.html");
                $("#page_content").css("background-color", "white")
                break;
                
            case "#contacts":
                $("#page_content").load("contacts.html");
                $("#page_content").css("background-color", "white")
                break;
                
            case "#photogallery":   
                $("#page_content").load("photogallery.html");
                $("#page_content").css("background-color", "black");
                break;
                
            case "#videos":
                $("#page_content").load("videos.html");
                $("#page_content").css("background-color", "black");
                
                var newVideo = {};
                console.log("Performing GET request...");
                URL = "http://localhost:3000/videos";
                $.ajax({
                    url: URL,
                    type: 'GET',
                    success: function(data) {
                        
                        newVideo.src = data.source;
                        newVideo.caption = data.caption;
                        newVideo.type = data.file;
                    },
                    error: function(error) {
                        console.log("Ooops, something went wrong: " + error);
                    }
                });
                
                var videos = JSON.parse(localStorage.getItem("videos"));
                if (videos === null) videos = [];
                videos.push(JSON.stringify(newVideo));
                localStorage.setItem("videos", JSON.stringify(videos));
                break;
                
            default:
        }
    })
});

function ajax(param) {
    console.log("Performing GET request...");
    var URL = "http://localhost:3000/" + param;
    var request = $.ajax({
            url: URL,
            type: 'GET',
            success: function(data) {
                console.log("data: " + data);
            },
            error: function(err) {
                console.log("Ooops, something went wrong: " + err);
            }
        });
    return request;
}

