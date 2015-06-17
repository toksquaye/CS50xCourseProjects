/**
 * service.js
 *
 * Computer Science 50
 * Problem Set 8
 *
 * Implements a shuttle service.
 */

// default height
var HEIGHT = 0.8;

// default latitude
var LATITUDE = 42.3745615030193;

// default longitude
var LONGITUDE = -71.11803936751632;

// default heading
var HEADING = 1.757197490907891;

// default number of seats
var SEATS = 10;

// default velocity
var VELOCITY = 50;

// global reference to shuttle's marker on 2D map
var bus = null;

// global reference to 3D Earth
var earth = null;

// global reference to 2D map
var map = null;

// global reference to shuttle
var shuttle = null;

// load version 1 of the Google Earth API
google.load("earth", "1");

// load version 3 of the Google Maps API
google.load("maps", "3", {other_params: "sensor=false"});

// once the window has loaded
$(window).load(function() {

    // listen for keydown anywhere in body
    $(document.body).keydown(function(event) {
        return keystroke(event, true);
    });

    // listen for keyup anywhere in body
    $(document.body).keyup(function(event) {
        return keystroke(event, false);
    });

    // listen for click on Drop Off button
    $("#dropoff").click(function(event) {
        dropoff();
    });

    // listen for click on Pick Up button
    $("#pickup").click(function(event) {
        pickup();
    });

    // listen for click on teleport button
    $("#go").click(function(event) {
        teleport();
    });
    
    //listen for click on change velocity button
    $("#c_velocity").click(function(event) {
        change_velocity();
    });
    
    // load application
    load();
});

// unload application
$(window).unload(function() {
    unload();
});

/**
 * Renders seating chart.
 */
function chart()
{
    var html = "<ol start='0'>";
    for (var i = 0; i < shuttle.seats.length; i++)
    {
        if (shuttle.seats[i] == null)
        {
            html += "<li>Empty Seat</li>";
        }
        else
        {
            html += "<li>" + shuttle.seats[i].name + " to " + shuttle.seats[i].house + "</li>";
        }
    }
    html += "</ol>";
    $("#chart").html(html);
}

/**
 * Drops up passengers if their stop is nearby.
 */
function dropoff()
{
    if(gameover)
    {
        return;
    }
    var droppedoff = 0;
    for(var i=0; i < shuttle.seats.length; i++)
    {
        if(shuttle.seats[i] != null)
        {
            var lat = HOUSES[shuttle.seats[i].house].lat;
            var lng = HOUSES[shuttle.seats[i].house].lng; 
            var distance = shuttle.distance(lat,lng);
            if (distance <= 30)
            {                              
                shuttle.seats[i] = null;
                points++;
                chart();
                droppedoff++;                
                totaldroppedoff++;  //increment global var to track # of passengers dropped off
                
            }
        }
     }//for i=0

    if(droppedoff == 0)
    {
       $("#announcements").html("No passengers to drop off at this location.");        
       document.getElementById("announcements").style.color = "red";
       points--;
    }
    else
    {
       $("#announcements").html(droppedoff + " passenger(s) dropped off at this location.");
       document.getElementById("announcements").style.color = "red";
       $("#alldropoff").html("Dropped Off: " + totaldroppedoff);
       if(totaldroppedoff == totalvalidpass)
       {
        $("#alldropoff").html("Dropoff Complete");
          var el = document.getElementById("alldropoff");
           el.style.backgroundColor = "green";

        $("#announcements").html("*** GAME OVER ***");
        el = document.getElementById("announcements");
        el.style.color = "red";
        el.style.fontSize = "18px";
        gameover = true;
     }
    }
    
    el = document.getElementById("score");
    el.innerHTML = "Score: " + points; 
       
    if(points < 0)                
       el.style.color = "red";               
    else
       el.style.color = "blue";
        

}

/**
 * Called if Google Earth fails to load.
 */
function failureCB(errorCode) 
{
    // report error unless plugin simply isn't installed
    if (errorCode != ERR_CREATE_PLUGIN)
    {
        alert(errorCode);
    }
}

/**
 * Handler for Earth's frameend event.
 */
function frameend() 
{
    shuttle.update();
}

/**
 * Called once Google Earth has loaded.
 */
function initCB(instance) 
{
    // retain reference to GEPlugin instance
    earth = instance;

    // specify the speed at which the camera moves
    earth.getOptions().setFlyToSpeed(100);

    // show buildings
    earth.getLayerRoot().enableLayerById(earth.LAYER_BUILDINGS, true);

    // disable terrain (so that Earth is flat)
    earth.getLayerRoot().enableLayerById(earth.LAYER_TERRAIN, false);

    // prevent mouse navigation in the plugin
    earth.getOptions().setMouseNavigationEnabled(false);

    // instantiate shuttle
    shuttle = new Shuttle({
        heading: HEADING,
        height: HEIGHT,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        planet: earth,
        seats: SEATS,
        velocity: VELOCITY
    });

    // synchronize camera with Earth
    google.earth.addEventListener(earth, "frameend", frameend);

    // synchronize map with Earth
    google.earth.addEventListener(earth.getView(), "viewchange", viewchange);

    // update shuttle's camera
    shuttle.updateCamera();

    // show Earth
    earth.getWindow().setVisibility(true);

    // render seating chart
    chart();

    // populate Earth with passengers and houses
    populate();
    
    pop_tp_menu();
}

/**
 * Handles keystrokes.
 */
function keystroke(event, state)
{
    // ensure we have event
    if (!event)
    {
        event = window.event;
    }
    else if (event.keyCode == 65 || event.keyCode == 97 || event.keyCode == 68 || event.keyCode == 100 || 
             event.keyCode == 83 || event.keyCode == 115 || event.keyCode == 87 || event.keyCode == 119 )
    {
        $("#announcements").html("no announcements at this time");
        document.getElementById("announcements").style.color = "black";
    }

    // left arrow
    if (event.keyCode == 37)
    {
        shuttle.states.turningLeftward = state;
        return false;
    }

    // up arrow
    else if (event.keyCode == 38)
    {
        shuttle.states.tiltingUpward = state;
        return false;
    }

    // right arrow
    else if (event.keyCode == 39)
    {
        shuttle.states.turningRightward = state;
        return false;
    }

    // down arrow
    else if (event.keyCode == 40)
    {
        shuttle.states.tiltingDownward = state;
        return false;
    }

    // A, a
    else if (event.keyCode == 65 || event.keyCode == 97)
    {
        shuttle.states.slidingLeftward = state;
        return false;
    }

    // D, d
    else if (event.keyCode == 68 || event.keyCode == 100)
    {
        shuttle.states.slidingRightward = state;
        return false;
    }
  
    // S, s
    else if (event.keyCode == 83 || event.keyCode == 115)
    {
        shuttle.states.movingBackward = state;     
        return false;
    }

    // W, w
    else if (event.keyCode == 87 || event.keyCode == 119)
    {
        shuttle.states.movingForward = state;    
        return false;
    }
  
    return true;
}

/**
 * Loads application.
 */
function load()
{
    // embed 2D map in DOM
    var latlng = new google.maps.LatLng(LATITUDE, LONGITUDE);
    map = new google.maps.Map($("#map").get(0), {
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoom: 17,
        zoomControl: true
    });

    // prepare shuttle's icon for map
    bus = new google.maps.Marker({
        icon: "https://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/bus.png",
        map: map,
        title: "you are here"
    });

    // embed 3D Earth in DOM
    google.earth.createInstance("earth", initCB, failureCB);
}
/**
 * Returns the next free seat on the shuttle. returns -1 if no free seats
 */
function shuttleseat()
{
    var seatnum = -1
    var j = 0;
    while((j < shuttle.seats.length) && (seatnum == -1) )
    {
        if (shuttle.seats[j] == null)
        {
            seatnum = j;
        }
        j++
    }
    
    return seatnum;

}
/**
 *Return true if the house given house name is in houses.js
 */
function inhouses(housename)
{
  for(var house in HOUSES)
  {
    if (house == housename)
    {
        return true;
    }
  }
  
  return false;
}
/**
 * Picks up nearby passengers.
 */
function pickup()
{
    if(gameover)
    {
        return;
    }
    var avail_seat = shuttleseat();
    if(avail_seat == -1)
    {
        $("#announcements").html("Shuttle is full! Cannot pick up any more passengers"); 
        document.getElementById("announcements").style.color = "red";
        return;
    }
    var pickedup = 0;
    for(var i=0; i < PASSENGERS.length; i++)
    {
        var lat = PASSENGERS[i].placemark.getGeometry().getLatitude();
        var lng = PASSENGERS[i].placemark.getGeometry().getLongitude(); 
        var distance = shuttle.distance(lat,lng);
        if (distance <= 15)
        {
            if(!inhouses(PASSENGERS[i].house))
            {
                $("#announcements").html("Cannot pickup passenger going to a freshman dorm");
                document.getElementById("announcements").style.color = "red";
                return
            }                        
            if (PASSENGERS[i].seated == false)
            {//passenger isn't seated already
               shuttle.seats[avail_seat] = PASSENGERS[i];
               chart();
               pickedup++;
               totalpickedup++;               
               var features = earth.getFeatures();
               features.removeChild(PASSENGERS[i].placemark);
               PASSENGERS[i].seated = true;
               PASSENGERS[i].marker.setMap(null);
               seatfound = true;
               avail_seat = shuttleseat(); //get the next available seat ready.
            }                                       
        }
     }//for i=0
     if(pickedup == 0)
     {
        $("#announcements").html("No passengers within 15 meters of the shuttle"); 
        document.getElementById("announcements").style.color = "red";
     }
     else
     {
        $("#announcements").html(pickedup + " passenger(s) picked up");
        document.getElementById("announcements").style.color = "red";
        $("#allpickup").html("Picked Up: " + totalpickedup);
        if(totalpickedup == totalvalidpass)
        {
           $("#allpickup").html("Pickup Complete"); 
           var el = document.getElementById("allpickup");
           el.style.backgroundColor = "green";
           
        }                 
     }       
}//pickup()

/**
 * Populates Earth with passengers and houses.
 */
function populate()
{
    // mark houses
    for (var house in HOUSES)
    {
        // plant house on map
        new google.maps.Marker({
            icon: "https://google-maps-icons.googlecode.com/files/home.png",
            map: map,
            position: new google.maps.LatLng(HOUSES[house].lat, HOUSES[house].lng),
            title: house
        });
    }

    // get current URL, sans any filename
    var url = window.location.href.substring(0, (window.location.href.lastIndexOf("/")) + 1);

    // keep track of # of passengers not going to freshman dorms
    totalvalidpass = 0;
    
    //track of pickedup & dropped off passengers
    totalpickedup =0; totaldroppedoff=0;
    
    //track score & game status
    gameover = false; points=0;
    
    // scatter passengers
    for (var i = 0; i < PASSENGERS.length; i++)
    {
        // pick a random building
        var building = BUILDINGS[Math.floor(Math.random() * BUILDINGS.length)];

        // prepare placemark
        var placemark = earth.createPlacemark("");
        placemark.setName(PASSENGERS[i].name + " to " + PASSENGERS[i].house);

        // prepare icon
        var icon = earth.createIcon("");
        icon.setHref(url + "/img/" + PASSENGERS[i].username + ".jpg");

        // prepare style
        var style = earth.createStyle("");
        style.getIconStyle().setIcon(icon);
        style.getIconStyle().setScale(4.0);

        // prepare stylemap
        var styleMap = earth.createStyleMap("");
        styleMap.setNormalStyle(style);
        styleMap.setHighlightStyle(style);

        // associate stylemap with placemark
        placemark.setStyleSelector(styleMap);

        // prepare point
        var point = earth.createPoint("");
        point.setAltitudeMode(earth.ALTITUDE_RELATIVE_TO_GROUND);
        point.setLatitude(building.lat);
        point.setLongitude(building.lng);
        point.setAltitude(0.0);

        // associate placemark with point
        placemark.setGeometry(point);

        // add placemark to Earth
        earth.getFeatures().appendChild(placemark);

        // add marker to map
        var marker = new google.maps.Marker({
            icon: "https://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/man.png",
            map: map,
            position: new google.maps.LatLng(building.lat, building.lng),
            title: PASSENGERS[i].name + " at " + building.name
        });

        //remember passenger's placemark and marker for pick-up's sake
        
        PASSENGERS[i].placemark = placemark;
        PASSENGERS[i].marker = marker;
        if (inhouses(PASSENGERS[i].house))
        {
            totalvalidpass++;
        }
    }
    
    $("#announcements").html("Total of " + totalvalidpass + " valid passengers"); 
    document.getElementById("announcements").style.color = "red";
}

/**
 * Handler for Earth's ```change event.
 */
function viewchange() 
{
    // keep map centered on shuttle's marker
    var latlng = new google.maps.LatLng(shuttle.position.latitude, shuttle.position.longitude);
    map.setCenter(latlng);
    bus.setPosition(latlng);
}

/**
 * Unloads Earth.
 */
function unload()
{
    google.earth.removeEventListener(earth.getView(), "viewchange", viewchange);
    google.earth.removeEventListener(earth, "frameend", frameend);
}

function pop_tp_menu()
{
    var dropdown = document.getElementById("blds_dl_id");
    for(var i=0; i < BUILDINGS.length; i++)
    {
       var opt = BUILDINGS[i].name;
       var el = document.createElement("option");
       el.textContent = opt;
       el.value = opt;
       dropdown.appendChild(el);
    }
}

//Teleport the shuttle to selected location
function teleport()
{
    for(var i=0; i < BUILDINGS.length; i++)
    {
        var curr_building = document.getElementById("blds_dl_id").value;
        if(BUILDINGS[i].name == curr_building)
        {
          shuttle.teleport(BUILDINGS[i].lat, BUILDINGS[i].lng);
          viewchange();
        }
    }
    shuttle.velocity = 50;
}

//Change the velocity of the shuttle
function change_velocity()
{
    var speed = document.getElementById("vel_dl_id").value;
    if(speed == "normal")
        shuttle.velocity = 50;
    else if (speed == "slow")
        shuttle.velocity = 10;
    else if (speed == "fast")
        shuttle.velocity = 120;
    else if (speed == "nitro")
        shuttle.velocity = 300;
}
