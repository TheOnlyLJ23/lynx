    /* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("document").ready(function() {
    $("#page_content").load("home.html", function () {
        var images = [];
    
        $("#left_animation img").each(function() {
            images.push($(this)[0]);
        });

        $("#right_animation img").each(function() {
            images.push($(this)[0]);
        });

        setInterval(function() {
            animate(images);
        }, 5000);
    });
});

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
    //console.log("Images array after shuffling: " + images);
    if(images.length > 0) {
        $("#left_animation").fadeOut(10000, function() {
            $("#left_animation").html("");
            for(let i = 0; i < images.length; i++) {
                if ((i % 2)== 0) {
                    //$("#left_animation").hide();
                    $("#left_animation").append(images[i]);
                }
            }
            $("#left_animation").fadeIn(10000);
        });

        $("#right_animation").fadeOut(10000, function() {
            $("#right_animation").html("");
            for(let i = 0; i < images.length; i++) {
                if(i % 2 == 1) {
                    //$("#right_animation").hide();
                    $("#right_animation").append(images[i]);
                }
            }
            $("#right_animation").fadeIn(10000);
        });
    }
}