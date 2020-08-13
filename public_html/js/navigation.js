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

