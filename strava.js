const auth_link = "https://www.strava.com/oauth/token"

function getActivites(res){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then((data) => populateTable(data))
        // .then(function (data){          
        //     console.log(data.length)
            
        //     for(var x=0; x<data.length; x++){  
        //         var map = L.map('map').setView(data[1].start_latlng, 11);

        //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //         }).addTo(map);                             
        //         console.log(data[x].map.summary_polyline)
        //         var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
        //         console.log(coordinates)
        //         L.polyline(
        //             coordinates,
        //             {
        //                 color:"green",
        //                 weight:5,
        //                 opacity:.7,
        //                 lineJoin:'round'
        //             }

        //         ).addTo(map)
        //     }
        // })
}
// var table = "";   
function populateTable(data){  
   
    for (var i = 0; i < 3; i++)
    {           
            var activitiesData = document.createElement('div')          
            var totalDistance = parseInt(data[i].distance)
            var totalMovingTime = parseInt(data[i].moving_time)
            var date = new Date(data[i].start_date)
            var elevation = data[i].total_elevation_gain
            var table =
            `
            <h1>${data[i].name}</h1> 
            <p>🏆 On ${date.toLocaleString('en-US',{ day: '2-digit',month: 'long',year:'numeric',hour12:false,hour:'2-digit',minute:'2-digit' })}
            went ${(Math.round(totalDistance)/1000).toFixed(2)} km during ${toHHMMSS(totalMovingTime)} climbing ${elevation} meters
            </p>
            `
            // table += "<h1>"+ data[i].name +"</h1>" 
            // table +=  "<p>🏆 On " + date.toLocaleString('en-US',{ day: '2-digit',month: 'long',year:'numeric',hour12:false,hour:'2-digit',minute:'2-digit' }) + 
            // " went "+ (Math.round(totalDistance)/1000).toFixed(2) + 
            // " km during " + toHHMMSS(totalMovingTime)+  " climbing " + elevation +
            // " meters</p>"                                       
            activitiesData.innerHTML = table;
            document.getElementById("activities").append(activitiesData)
            console.log(activitiesData)
    }
}

function toHHMMSS(seconds) {
    var h, m, s, result='';
    // HOURs
    h = Math.floor(seconds/3600);
    seconds -= h*3600;
    result = h<10 ? '0'+h+':' : h+':';
    // MINUTEs
    m = Math.floor(seconds/60);
    seconds -= m*60;
    result += m<10 ? '0'+m+':' : m+':';
    // SECONDs
    s=seconds%60;
    result += s<10 ? '0'+s : s;
    return result;
}

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '93949',
            client_secret: '5c2a408f10810f460a96e8b885c8e7fb59bd2791',
            refresh_token: '685fff2f40eab4259119d60833724a363773f731',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json())
      .then(res => getActivites(res))  
}

reAuthorize()


