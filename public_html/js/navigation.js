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
                
                param = "posts";
               
                ajax(param);
                
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
                
                param = "images";
                
                ajax(param);
                
                break;
                
            case "#videos":
                $("#page_content").load("videos.html");
                $("#page_content").css("background-color", "black");
                
                param = "videos";
                
                ajax(param);
                
            default:
        }
    })
});

function ajax(param) {
    console.log("Performing GET request...");
    var URL = "http://localhost:3000/" + param;
    $.ajax({
            url: URL,
            type: 'GET',
            success: function(data) {
                
                var res = JSON.parse(data);
                
                if(res) {
                    //saveFile(param, res);
                    switch(param) {
                        case "images":
                            loadImageInPhotoGallery(res);
                            break;
                        case "videos":
                            /* load video in videogallery */
                            break;
                        case "posts":
                            loadPost(res);
                    }
                }
            },
            error: function(err) {
                console.log("Ooops, something went wrong: " + err);
            }
        });
}

function saveFile(param, data) {
    
    var newFile = {
        src: data.source,
        caption: data.caption,
        type: data.file
    };
     
    
    var files = JSON.parse(localStorage.getItem(param));
    if (files === null) files = [];

    files.push(JSON.stringify(newFile));
    localStorage.setItem(param, JSON.stringify(files));
            
}

function loadImagePost(res) {
    var img_div = $('<div></div>');
    img_div.addClass("image_post post");

    var img = $('<img>');
    img.attr('src', res.source);
    img.attr('alt', "New Image");
    img.css('width', "100%");
    img.appendTo(img_div);
    
    if(res.caption) {
        var caption_div = $('<div></div>');
        caption_div.addClass("caption");
        caption_div.appendTo(img_div);

        var txt = $('<p></p>');
        txt.text(res.caption);
        txt.appendTo(img_div);
    }

    return img_div;
}

function loadVideoPost(res) {
    
    var video_div = $('<div></div>');
    video_div.addClass("video_post post");
    
    var newVideo = $('<video></video>');
    newVideo.attr('src', res.source);
    newVideo.attr('controls', true);
    newVideo.appendTo(video_div);
    
    if(res.caption) {
        var caption_div = $('<div></div>');
        caption_div.addClass("caption");
        caption_div.appendTo(video_div);

        var txt = $('<p></p>');
        txt.text(res.caption);
        txt.appendTo(video_div);
    }    
    return video_div;
    
}

function loadTextOnlyPost(res) {
    var text_div = $('<div></div>');
    text_div.addClass("text_post post");
    
    var text_p = $('<p></p>');
    text_p.text(res.caption);
    text_p.appendTo(text_div);
       
    return text_div;
}

function loadPost(res) {
    
    var newPost;
    switch (res.file) {
        case "image":
            newPost = loadImagePost(res);
            break;
        case "video":
            newPost = loadVideoPost(res);
            break;
        case "text-only":
            newPost = loadTextOnlyPost(res);
            break;
        default:
   }
   console.log(newPost);
   if(newPost) {
    newPost.prependTo($("#posts"));
   }
   
}
   
function loadImageInPhotoGallery(res) {
    console.log(res);
    
    if(res.source) {
    
        console.log(res);

        var col_div = $('<div></div>');
        col_div.addClass("col-md-4");

        var thumb_div = $('<div></div>');
        thumb_div.addClass("thumbnail");

        var href = $('<a></a>');
        href.attr("href", res.source);
        href.attr("target", "_blank");

        var img = $('<img>');
        img.attr("src", res.source);
        img.css("width", "100%");
        img.appendTo(href);

        if(res.caption) {
            img.attr("alt", res.caption);
            var div_caption = $('<div></div>');
            div_caption.addClass("caption");

            var p_caption_text = $('<p></p>');
            p_caption_text.text(res.caption);

            p_caption_text.appendTo(div_caption);
            div_caption.appendTo(href);
        } else {
            img.attr("alt", "Image with no caption");
        }


        href.appendTo(thumb_div);
        thumb_div.appendTo(col_div);
        col_div.prependTo($("#gallery"));
    }
}





