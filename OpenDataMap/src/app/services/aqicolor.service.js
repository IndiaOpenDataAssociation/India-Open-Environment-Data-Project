(function() {
    'use strict';

    angular.module('app')
        .service('AQIColorService', AQIColorService);

    
    function AQIColorService() {
        var self = this;
        this.getColorVal = function(aqi){
            var colorVal = '#6ecc58';
            if(aqi < 51){
                colorVal = '#6ecc58';
            } else if(aqi > 50 && aqi < 101){
                colorVal = '#bbcf4c';
            } else if(aqi > 100 && aqi < 201){
                colorVal = '#eac736';
            } else if(aqi > 200 && aqi < 301){
                colorVal = '#ed9a2e';
            } else if(aqi > 300 && aqi < 401){
                colorVal = '#e8633a';
            } else {
                colorVal = '#d63636';
            }
            return colorVal;
        };

        this.getVisibilityPercentage = function(aqi){
            var visibility = 0;
            if(aqi < 51){
                visibility = 0;
            } else if(aqi > 50 && aqi < 101){
                visibility = 1;
            } else if(aqi > 100 && aqi < 201){
                visibility = 2;
            } else if(aqi > 200 && aqi < 301){
                visibility = 3;
            } else if(aqi > 300 && aqi < 401){
                visibility = 4;
            } else {
                visibility = 5;
            }
            return visibility+2;
        };

        this.getLabel = function(aqi){
            var label = "Good";
            if(aqi < 51){
                label = "Good";
            } else if(aqi > 50 && aqi < 101){
                label = "Satisfactory";
            } else if(aqi > 100 && aqi < 201){
                label = "Moderate";
            } else if(aqi > 200 && aqi < 301){
                label = "Poor";
            } else if(aqi > 300 && aqi < 401){
                label = "Very Poor";
            } else {
                label = "Severe";
            }
            return label;
        };

        this.getPinPath = function(aqi){
            var label = "good";
            var prePath = "assets/images/pins/";
            var postPath = ".svg";
            if(aqi < 51){
                label = "good";
            } else if(aqi > 50 && aqi < 101){
                label = "satisfactory";
            } else if(aqi > 100 && aqi < 201){
                label = "moderate";
            } else if(aqi > 200 && aqi < 301){
                label = "poor";
            } else if(aqi > 300 && aqi < 401){
                label = "very-poor";
            } else {
                label = "severe";
            }
            return prePath + label +postPath;
        };

        this.getActivityArray = function(aqi){
            var rPath = "assets/images/icons/do.png";
            var wPath = "assets/images/icons/dont.png";
            var sPath = "assets/images/icons/prefferd.png";
            var n_baby_out = "assets/images/icons/n_baby_out.png";
            var n_elderly = "assets/images/icons/n_elderly.png";
            var n_fire = "assets/images/icons/n_fire.png";
            var n_smoking = "assets/images/icons/n_smoking.png";
            var n_use_two_wheeler = "assets/images/icons/n_use_two_wheeler.png";
            var p_cycling = "assets/images/icons/p_cycling.png";
            var p_dinner_out = "assets/images/icons/p_dinner_out.png";
            var p_jogging = "assets/images/icons/p_jogging.png";
            var p_pet_walk = "assets/images/icons/p_pet_walk.png";
            var p_photography = "assets/images/icons/p_photography.png";
            var p_plantation = "assets/images/icons/p_plantation.png";
            var y_use_mask = "assets/images/icons/y_use_mask.png";
            var y_use_public_transport = "assets/images/icons/y_use_public_transport.png";
            var y_wear_protective_eye_glasses = "assets/images/icons/y_wear_protective_eye_glasses.png";

            var activityArray = [], activityObj1 = {},activityObj2 = {}, activityObj3 = {},activityObj4 = {};
            if(aqi < 51){
                activityObj1.u1 = rPath;
                activityObj1.u2 = n_baby_out;
                activityObj1.t = "Take Baby out";
                activityArray.push(activityObj1);
                activityObj2.u1 = sPath;
                activityObj2.u2 = p_dinner_out;
                activityObj2.t = "Take Dinner out";
                activityArray.push(activityObj2);
                activityObj3.u1 = rPath;
                activityObj3.u2 = p_pet_walk;
                activityObj3.t = "Take Pet for walk";
                activityArray.push(activityObj3);
                activityObj4.u1 = sPath;
                activityObj4.u2 = p_photography;
                activityObj4.t = "Explore Nature by photography";
                activityArray.push(activityObj4);
            } else if(aqi > 50 && aqi < 101){
                activityObj1.u1 = rPath;
                activityObj1.u2 = p_cycling;
                activityObj1.t = "Cycling";
                activityArray.push(activityObj1);
                activityObj2.u1 = rPath;
                activityObj2.u2 = p_jogging;
                activityObj2.t = "Jogging";
                activityArray.push(activityObj2);
                activityObj3.u1 = sPath;
                activityObj3.u2 = p_plantation;
                activityObj3.t = "Plant a tree";
                activityArray.push(activityObj3);
                activityObj4.u1 = rPath;
                activityObj4.u2 = n_use_two_wheeler;
                activityObj4.t = "Use Two wheeler";
                activityArray.push(activityObj4);
            } else if(aqi > 100 && aqi < 201){
                activityObj1.u1 = wPath;
                activityObj1.u2 = n_baby_out;
                activityObj1.t = "Take Baby out";
                activityArray.push(activityObj1);
                activityObj2.u1 = rPath;
                activityObj2.u2 = y_use_public_transport;
                activityObj2.t = "Use Public transport";
                activityArray.push(activityObj2);
                activityObj3.u1 = wPath;
                activityObj3.u2 = n_smoking;
                activityObj3.t = "Smoking";
                activityArray.push(activityObj3);
                activityObj4.u1 = wPath;
                activityObj4.u2 = n_fire;
                activityObj4.t = "Fire light";
                activityArray.push(activityObj4);
            } else if(aqi > 200 && aqi < 301){
                activityObj1.u1 = rPath;
                activityObj1.u2 = y_use_mask;
                activityObj1.t = "Use Mask";
                activityArray.push(activityObj1);
                activityObj2.u1 = rPath;
                activityObj2.u2 = y_use_public_transport;
                activityObj2.t = "Use Public transport";
                activityArray.push(activityObj2);
                activityObj3.u1 = wPath;
                activityObj3.u2 = n_use_two_wheeler;
                activityObj3.t = "Use Two wheeler";
                activityArray.push(activityObj3);
                activityObj4.u1 = wPath;
                activityObj4.u2 = n_baby_out;
                activityObj4.t = "Take Baby out";
                activityArray.push(activityObj4);
            } else if(aqi > 300 && aqi < 401){
                activityObj1.u1 = rPath;
                activityObj1.u2 = y_use_mask;
                activityObj1.t = "Use Mask";
                activityArray.push(activityObj1);
                activityObj2.u1 = rPath;
                activityObj2.u2 = y_wear_protective_eye_glasses;
                activityObj2.t = "Wear protective eye glasses";
                activityArray.push(activityObj2);
                activityObj3.u1 = wPath;
                activityObj3.u2 = n_use_two_wheeler;
                activityObj3.t = "Use Two wheeler";
                activityArray.push(activityObj3);
                activityObj4.u1 = rPath;
                activityObj4.u2 = y_use_public_transport;
                activityObj4.t = "Use Public transport";
                activityArray.push(activityObj4);
            } else {
                activityObj1.u1 = rPath;
                activityObj1.u2 = y_use_mask;
                activityObj1.t = "Use Mask";
                activityArray.push(activityObj1);
                activityObj2.u1 = wPath;
                activityObj2.u2 = n_use_two_wheeler;
                activityObj2.t = "Use Two wheeler";
                activityArray.push(activityObj2);
                activityObj3.u1 = wPath;
                activityObj3.u2 = n_smoking;
                activityObj3.t = "Smoking";
                activityArray.push(activityObj3);
                activityObj4.u1 = rPath;
                activityObj4.u2 = y_use_public_transport;
                activityObj4.t = "Use Public transport";
                activityArray.push(activityObj4);
            }
            return activityArray;
        };

    }
})();
