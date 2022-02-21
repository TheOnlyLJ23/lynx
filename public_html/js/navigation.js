/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("document").ready(function (){
    
    $("#page_content").load("home.html", function () {
        const url = "posts.json";
        loadPostsFromJSON(url);
        animations();
    });
    $("#page_content").css("background-color", "black");
    
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB.");
    } else {
        console.log("IndexedDB is working fine, keep going!");
    }
    
    var db;
    
    var request = window.indexedDB.open("MediaDatabase", 1);
    
    request.onerror = function (e) {
        console.log("There was an error: " + e);
    };
    
    request.onsuccess = function (e) {
        db = e.target.result;
        //getFilesFromDB(db, "posts");
    };
    
    request.onupgradeneeded = function(event) { 
        
        db = event.target.result;

        // Create an objectStore for this database
        var postsDB = db.createObjectStore("posts", { autoIncrement: true });
        postsDB.createIndex("file", "file", {unique: false});           
        
    };
    
    
    
    $("#page_content").css("background-color", "black");
    
    $(".navbar-nav a").on("click", function() {
        var link = $(this).attr("href");
        var param;
        switch (link) {
            case "#home":
                $("#page_content").load("home.html", function() {
                    animations();
                });
                $("#page_content").css("background-color", "black");
                
                param = "posts";
               
                //ajax(param, db);
                
                //getFilesFromDB(db, param);
                            
                break;
            
            case "#about":
                $("#page_content").load("about.html");
                $("#page_content").css("background-color", "white");
                break;
                
            case "#contacts":
                $("#page_content").load("contacts.html");
                $("#page_content").css("background-color", "white");
                break;
                
            case "#photogallery":   
                $("#page_content").load("photogallery.html");
                $("#page_content").css("background-color", "black");
                
                param = "images";
                //ajax(param, db);
                
                //getFilesFromDB(db, param);    
                
                break;
                
            case "#videos":
                $("#page_content").load("videos.html");
                $("#page_content").css("background-color", "black");
                
                param = "videos";
                
                //ajax(param, db);
                
                //getFilesFromDB(db, param);
                
            default:
        }
    });
});

function ajax(param, db) {
    //console.log("Performing GET request...");
    var URL = "http://localhost:3000/" + param;
    $.ajax({
            url: URL,
            type: 'GET',
            success: function(data) {
                    console.log("data");
                    var res = JSON.parse(data);
                    if(res.file) {
                        addPostToDB(res, db);
                    }
            },
            error: function(err) {
                console.log("Ooops, something went wrong: " + err);
            }
    });
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
   //console.log(newPost);
   if(newPost) {
    newPost.prependTo($("#posts"));
   }
   
}
   
function loadImageInPhotoGallery(res) {
    //console.log(res);
    
    if(res.source) {

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

function loadVideoInVideoGallery(res) {
           
    var video_div = $('<div></div>');
    video_div.addClass("embed-responsive embed-responsive-16by9 video_div");
    
    var video = $('<video></video>');
    video.addClass("embed-responsive-item");
    video.attr("src", res.source);
    video.attr("controls", "controls");
    
    video.appendTo(video_div);
    video_div.prependTo($("#videos"));
}


function addPostToDB(res, db) {
    
    //console.log("Adding res: " + res);
    
    res.time = new Date();
    //console.log("Date: " + res.time);
    var transaction = db.transaction(["posts"], "readwrite");
    
    transaction.oncomplete = function() {
        console.log("Transaction completed!");
    };
    
    transaction.onerror = function (event) {
        console.log("Transaction failed: " + event);
    };
    var objectStore = transaction.objectStore("posts");
    var request = objectStore.add(res);
    
    request.onsuccess = function (e) {
        console.log("Added post: " + e.target.result.toString());
    };
}

function getFilesFromDB(db, param) {
    var files = [];
    var transaction = db.transaction(["posts"], "readonly");
    var objectStore = transaction.objectStore("posts");
    var index = objectStore.index("file");
    index.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if(cursor) {
            if(param === "images") {
                if(cursor.value.file === "image") {
                    files.push(JSON.stringify(cursor.value));
                }
            } else if (param === "videos") {
                if(cursor.value.file === "video") {
                    files.push(JSON.stringify(cursor.value));
                }
            } else {
                files.push(JSON.stringify(cursor.value));
            }
            cursor.continue();
        } else {
            files.sort(function(a, b) {
                var elem1 = JSON.parse(a);
                var elem2 = JSON.parse(b);
                return new Date(Date.parse(elem1.time)).getTime() - new Date(Date.parse(elem2.time)).getTime();
            });
        }
    };

    transaction.oncomplete = function() {
        var images = [];
        if(files.length > 0) {
            for(var i = 0; i < files.length || i < 20; i++) {
                if(files[i]) {
                    var file = JSON.parse(files[i]);

                    if(file.file === "image") {
                        images.push(file);
                        if(param === "images") {
                            loadImageInPhotoGallery(file);
                        } else {
                            loadPost(file);
                        }
                    } else if (file.file === "video") {
                        if(param === "videos") {
                            loadVideoInVideoGallery(file);
                        } else {
                            loadPost(file);
                        }
                    } else {
                        loadPost(file);
                    }
                }
            }

            $("#left_animation").html("");
            $("#right_animation").html("");
            images = shuffleArray(images);
            console.log("Number of images, GET FILES FROM DB: " + images.length);
            for(var i = 0; i < images.length && i < 6; i++) {
                loadImageForAnimations(images[i], i);
            }
            animations();
        }
        console.log("Transaction completed");
    };

    transaction.onerror = function (event) {
        console.log("Transaction failed: " + event);
    };
    
}

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function animate(images) {
    
    //console.log("Images array before shuffling (length: " + images.length.toString() +  ")" + images);
    images = shuffleArray(images);
    var first_six_images = images.slice(0, 6);
    var animation_length = 8000;
    //console.log("Images array after shuffling: " + images);
    var count = 0;
    if(images.length > 0) {
        $("#left_animation").fadeOut(animation_length, function() {
            $("#left_animation").html("");
            for(let i = 0; i < first_six_images.length; i++) {
                if ((i % 2) === 0) {
                    //$("#left_animation").hide();
                    $("#left_animation").append(first_six_images[i]);
                    //console.log("i = " + i.toString() + "appending to left_animation");
                    count++;
                }
            }
            $("#left_animation").fadeIn(animation_length);
        });

        $("#right_animation").fadeOut(animation_length, function() {
            $("#right_animation").html("");
            for(let i = 0; i < first_six_images.length; i++) {
                if(i % 2 === 1) {
                    //$("#right_animation").hide();
                    $("#right_animation").append(first_six_images[i]);
                    //console.log("i = " + i.toString() + "appending to right_animation");
                    count++;
                }
            }
            $("#right_animation").fadeIn(animation_length);
        });
    }
    //console.log(images);
}

function loadImageForAnimations(res, num) {
    var img = $('<img>');
    img.addClass("mw-100 img-responsive");
    img.attr("alt", res.caption);
    img.attr("src", res.source);
    if(num % 2 === 0) {
        //left animation
        img.appendTo($("#left_animation"));
    } else if(num % 2 === 1) {
        //right animation
        img.appendTo($("#right_animation"));
    }
}

function animations() {
    var images = [];
    
    $("#posts img").slice(0, 20).each(function() {
        var img = $('<img>');
        img.attr('src', $(this).attr('src'));
        img.attr('alt', $(this).attr('alt'));
        img.addClass("mw-100 img-responsive");
        images.push(img);
    });
    
    /*
    $("#left_animation img").each(function() {
        images.push($(this)[0]);
    });

    $("#right_animation img").each(function() {
        images.push($(this)[0]);
    });
    */
    console.log("Number of images, ANIMATIONS: " + images.length);
    setInterval(function() {
        animate(images);
    }, 5000);
}

function loadPostsFromJSON(url) {
    $.getJSON(url, function(data){
        posts = data["posts"];
        $.each(posts, function(key, value) {
            if(value["src"]) {
                console.log("This post contains an image");
            }
            else {
                console.log("This post contains just text");
            }
        });
    });
}