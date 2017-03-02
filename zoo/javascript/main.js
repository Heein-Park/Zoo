/*---------------------------------*/
/*------------- Blipp -------------*/
/*---------------------------------*/

blipp = require('blippar').blipp;

blipp.getPeel()
     .setOrientation("landscape")
     .setType("fill");

var sensor = require('blippar').blipp.getSensor();

/*-------------------------------------*/
/*----------- Scene Create ------------*/
/*-------------------------------------*/
var title_scene = blipp.addScene("default");
var tiger_scene = blipp.addScene("tiger_scene");

/*------------------*/
/* Size of a marker */
/*------------------*/
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();

/*-------------*/
/* Screen Size */
/*-------------*/
var sW = blipp.getScreenWidth();
var sH = blipp.getScreenHeight();

/*-----------*/
/* Variables */
/*-----------*/

/*--------------*/
/*--Titlescene--*/
/*--------------*/
title_scene.onCreate = function()
{   
    title_scene.title = title_scene.addSprite()
                                   .setTexture('zoo_chroma.png')
                                   .setName("title")
                                   .setBlend("chromakey")
                                   .setChromakey([120, 0.7, 0.67, 72])
                                   .setTranslation(0, 55, 1)
                                   .setScale(mW*0.4, mH*0.4, 1);
    
    title_scene.startBtn = title_scene.addSprite()
                                      .setTextures(['zoo-touchToStart.png', 'zoo-touchToStart-clicked.png'])
                                      .setActiveTexture(1)
                                      .setName("startBtn")
                                      .setTranslation(0, -130, 1)
                                      .setScale(348  , 52, 1);
    
//    title_scene.getBackground().addSprite()
//                               .setTexture('sky.png')
////                                        .setColor([0, 0.87, 1, 1])
//                               .setName("background")
//                               .setTranslation(0, 0, 0)
//                               .setScale(mW, mH);
    
    title_scene.startBtn.onTouchEnd = function(id, x, y)
    {
        title_scene.startBtn.setActiveTexture(0);
        blipp.preloadScene("tiger_scene");
        title_scene.startBtn.animate()
                            .alpha(0)
                            .interpolator("easeIn")
                            .delay(750)
                            .duration(2000);
        title_scene.title.animate()
                         .alpha(0)
                         .interpolator("easeIn")
                         .delay(750)
                         .duration(2000)
                         .on("end", function () {
                            blipp.log("Go to the next scene");
                            blipp.goToScene("tiger_scene");
                         });
    }
}

title_scene.onShow = function()
{
    blipp.log("Log on");
}

/*--------------*/
/*--Tigerscene--*/
/*--------------*/

tiger_scene.onCreate = function()
{   
    tiger_scene.isPhotoOpened = true;
    
    tiger_scene.getBackground().addSprite()
               .setName("background")
               .setScale(sW, sH, 1)
               .setColor("#00ddffff");
    
    tiger_scene.tiger = tiger_scene.addSprite()
                                   .setTexture('tiger.gif')
                                   .setName("tiger")
                                   .setBlend("chromakey")
                                   .setChromakey([120, 0.7, 0.67, 72])
		                               .setTranslation(90, 0, 1)
		                               .setScale(400, 400, 1)
                                   .setAlpha(0);
    
    var photo_mul = 1.2;
    
    tiger_scene.tiger_oldPhoto = tiger_scene.getScreen().addSprite()
                                                        .setTexture('tiger-oldPhoto.png')
                                                        .setName("tiger_oldPhoto")
                                                        .setTranslation(0, 0, 1)
                                                        .setRotation(0, 0, 90)
                                                        .setScale(438*photo_mul, 500*photo_mul, 1)
                                                        .setAlpha(1);
    
    tiger_scene.tiger.animate()
                     .alpha(1)
                     .duration(2000)
                     .interpolator("easeOut");
    
    tiger_scene.tiger_oldPhoto.onTouchEnd = function(id, x, y)
    {
        if(tiger_scene.isPhotoOpened) {
            tiger_scene.tiger_oldPhoto.animate()
                                      .translationX(sW/2 + 100)
                                      .duration(750)
                                      .interpolator("easeOut");
            tiger_scene.isPhotoOpened = false;
        } else {
            tiger_scene.tiger_oldPhoto.animate()
                                      .translationX(0)
                                      .duration(750)
                                      .interpolator("easeOut");
            tiger_scene.isPhotoOpened = true;
        }
    }
    
    tiger_scene.setRequiredAssets(['tiger.gif']);
}

tiger_scene.onShow() = function()
{
}