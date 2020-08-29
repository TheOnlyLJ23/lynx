/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("document").ready(function (){
    $("#page_content").css("background-color", "black");
    $(".navbar-nav a").on("click", function() {
        var link = $(this).attr("href");
        switch (link) {
            case "#home":
                $("#page_content").load("home.html"); 
                $("#page_content").css("background-color", "black");
                console.log("Performing GET request");
                const URL = "http://localhost:3000/images";
                $.ajax({
                    url: URL,
                    type: 'GET',
                    success: function(data) {
                        console.log("I have received this: " + data);
                    },
                    error: function(error) {
                        console.log("Ooops, something went wrong: " + error);
                    }
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
                break;
                
            default:
        }
    })
});

