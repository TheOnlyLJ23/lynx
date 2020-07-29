/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("document").ready(function (){
    $(".navbar-nav a").on("click", function() {
        var link = $(this).attr("href");
        switch (link) {
            case "#home":
                $("#page_content").load("home.html");                
                break;
            
            case "#about":
                $("#page_content").load("about.html");
                break;
                
            case "#contacts":
                $("#page_content").load("contacts.html");
                break;
                
            case "#photogallery":   
                $("#page_content").load("photogallery.html");
                break;
                
            case "#videos":
                $("#page_content").load("videos.html");
                break;
                
            default:
        }
    })
});

