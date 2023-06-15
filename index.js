
let selector = document.getElementById('selector'),
    optionInput = document.getElementById('optionInput'),
    submit = document.getElementById('submit'),
    infarr = document.querySelectorAll('.vessel-li'),
    infoBtn = document.getElementById('infoBtn');

let selectorValue,
    inputValue,
    arr,
    arrbon1,
    arrbon2;


let bool = 0,
    bool2 = 0;

let id,
    nameV,
    lat,
    lon,
    mmsi,
    mesid,
    comstat,
    navstat,
    cog,
    sog,
    accuracy,
    raim,
    turn,
    repeater,
    spare,
    manoeuvre,
    heading,
    valid,
    time;

for(let i=4; i<18; i++) {
    infarr[i].style.display = 'none';
}


submit.addEventListener('click', function (event) {
    event.preventDefault();
    selectorValue = selector.value;
    inputValue = optionInput.value;

    axios
        .post('./api/index.php', {
            selectorValue: selectorValue,
            inputValue: inputValue
        })
        .then(async response => {
            console.log(response);
            let array = response.data;
            console.log(array);
            console.log(array[0]);

            if (Array.isArray(array)) {
                for(let j = 0; j < array.length; j++){
                    const parameters = ['nameV', 'lat', 'lon', 'mmsi', 'mesid', 'comstat', 'navstat', 'cog', 'sog', 'accuracy', 'raim', 'turn', 'repeater', 'spare', 'manoeuvre', 'heading', 'valid', 'time']
                    /* for(let k = 0; k < 18; k++){
                        arr[k] = array[j][k];
                    } */
                    array[j][18] = array[j][18].slice(0, 20);
                    
                    if (bool2 == 0) {
                        bool2 = 1;
                        for(let i=0; i<18; i++) {
                            infarr[i].innerHTML = infarr[i].innerHTML + array[j][i + 1];
                        }
                        arrbon1 = array[j];
                    } else if (bool2 == 1) {
                        bool2 = 3;
                        for(let i=0; i<18; i++) {
                            infarr[i].innerHTML = infarr[i].innerHTML.replace(arrbon1[i + 1], "") + array[j][i + 1];
                        }
                        arrbon2 = array[j];
                    } else if (bool2 == 3) {
                        bool2 = 1;
                        for(let i=0; i<18; i++) {
                            infarr[i].innerHTML = infarr[i].innerHTML.replace(arrbon2[i + 1], "") + array[j][i + 1];
                        }
                        arrbon1 = array[j];
                    }
                    const marker2 = L.marker([array[j][2], array[j][3]])
                        .addTo(map)
                        .bindPopup(array[j][4] || inputValue)
                        .addTo(map);
                }
            } else {

                const parameters = ['nameV', 'lat', 'lon', 'mmsi', 'mesid', 'comstat', 'navstat', 'cog', 'sog', 'accuracy', 'raim', 'turn', 'repeater', 'spare', 'manoeuvre', 'heading', 'valid', 'time']
                    for(let k = 0; k < parameters.lenght; k++){
                        arr[k] = array[parameters[k]]
                    }
                
                if (bool2 == 0) {
                    bool2 = 1;
                    for(let i=0; i<18; i++) {
                        infarr[i].innerHTML = infarr[i].innerHTML + arr[i];
                    }
                    arrbon1 = arr;
                } else if (bool2 == 1) {
                    bool2 = 3;
                    for(let i=0; i<18; i++) {
                        infarr[i].innerHTML = infarr[i].innerHTML.replace(arrbon1[i], "") + arr[i];
                    }
                    arrbon2 = arr;
                } else if (bool2 == 3) {
                    bool2 = 1;
                    for(let i=0; i<18; i++) {
                        infarr[i].innerHTML = infarr[i].innerHTML.replace(arrbon2[i], "") + arr[i];
                    }
                    arrbon1 = arr;
                }
                const marker2 = L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(nameV || inputValue)
                    .addTo(map);
            }

            

            

        })
        .catch(err => {
            console.error(err);
        });
});

infoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (bool == 0) {
        for(let i=4; i<18; i++) {
            infarr[i].style.display = 'block';
        }
        infoBtn.innerHTML = 'Less info';
        bool = 1;
    } else {
        bool = 0;
        for(let i=4; i<18; i++) {
            infarr[i].style.display = 'none';
        }
        infoBtn.innerHTML = 'More info';
    }
})


const map = L.map('map', {
    center: [60, 30],
    zoom: 3.5
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
/*   const marker1 = L.marker([59.936724, 30.313326]).addTo(map)
    .bindPopup('Whitehaven Beach, Whitsunday Island')
    .addTo(map); */