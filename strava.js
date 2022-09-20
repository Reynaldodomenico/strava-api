const auth_link = "https://www.strava.com/oauth/token"



function getActivites(res){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then((data) => populateTable(data,res))   
}

function populateTable(data,res){  
    for (var i = 0; i < 5; i++){  
            // var mapVariable =['map1','map2','map']               
            var activitiesData = document.createElement('div') 
            activitiesData.classList.add('card')
            var activityName =  data[i].name       
            var totalDistance = (Math.round(parseInt(data[i].distance))/1000).toFixed(2)
            var totalMovingTime = toHHMMSS(parseInt(data[i].moving_time))
            var date = new Date(data[i].start_date).toLocaleString('en-US',{ 
                day: '2-digit',
                month: 'long',
                year:'numeric',
                hour12:false,
                hour:'2-digit',
                minute:'2-digit' 
            })

            var obj;
            const activityLink = `https://www.strava.com/api/v3/activities/${data[i].id}?access_token=${res.access_token}&id=${data[i].id}`
            fetch(activityLink)
            .then((res) => res.json())
            .then((qwe) => console.log(qwe.calories))
            
            var isWorkout = ['Walk','Run','Ride']
            var workoutType = data[i].type
            var elevation = data[i].total_elevation_gain

            if(isWorkout.includes(workoutType) === true){
              var isClimbing = ` climbing ${elevation} meters `
            }
            else{
              var isClimbing = ""
            }
                    
            var table =
            `
            <div>
            <h1>${activityName}</h1> 
            <p>🏆 On ${date}
            went ${totalDistance} km during ${totalMovingTime} ${isClimbing} 
            </p>
            </div>
            `                                            
            activitiesData.innerHTML = table;               
            document.getElementById("activities").append(activitiesData)      

            // mapVariable[i] = L.map(`${mapVariable[i]}`).setView(data[i].start_latlng, 12)                
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(mapVariable[i]); 

            // var coordinates = L.Polyline.fromEncoded(data[i].map.summary_polyline).getLatLngs()
            // console.log(coordinates)
            // L.polyline(
            //         coordinates,
            //         {
            //             color:"green",
            //             weight:5,
            //             opacity:.7,
            //             lineJoin:'round'
            //         }

            // ).addTo(mapVariable[i])                   
            // console.log(activitiesData)
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
            client_id: '78127',
            client_secret: '5e1181a1c94e39982c98e69fc42d257f2fab2e8c',
            refresh_token: 'ffdb6cba763a6970bc6d3dddadd540fc26abf9f7',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json())
      .then(res => getActivites(res))  
}

reAuthorize()


