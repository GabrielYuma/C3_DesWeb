var cad = document.querySelector('#cad')
var cons = document.querySelector('#cons')
var pesq = document.querySelector('#pesq')
var email, nome
let lat, long
var arr = []
var mapa
var maps;

cad.addEventListener('click', function (event) {
    event.preventDefault()

    nome = prompt('Insira seu Nome: ')
    email = prompt('Insira seu Email: ')

    if (nome && email) {
        selfGeoLoc()        
    }
})

pesq.addEventListener('click', function (event) {
    event.preventDefault()
    var name = document.querySelector('#name').value;
    var mail = document.querySelector('#mail').value;

    var find = arr.filter(function (valor, indice) {
        return valor.nome == name || valor.email == mail
    })

    if (find.length > 0) {
        var myIcon = L.icon({
            iconUrl: 'newIcon.png',
            iconSize: [46, 46],
            iconAnchor: [22, 46],
            popupAnchor: [-3, -76]
        });
        mapa.removeLayer(L.marker([find[0].position.latitude, find[0].position.longitude]))        
        L.marker([find[0].position.latitude, find[0].position.longitude], {icon: myIcon}).addTo(mapa);
    }
})

cons.addEventListener('click', function (event) {
    event.preventDefault()
    var matr = document.querySelector('#matriz')
    consultar(matr)
})

function consultar(mat) {
    var rows = ''
    mapa = L.map('map').setView([-20.3108594, -40.3150544], 19);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mapa);

    if (nome && email) {
        L.marker([lat, long]).addTo(mapa).bindPopup(nome);
    }


    fetch('http://localhost:3000')
        .then(function (result) {
            return result.json()
        })
        .then(function (pessoas) {
            for (var i = 0; i < pessoas.length; i++) {
                L.marker([pessoas[i].position.latitude, pessoas[i].position.longitude]).addTo(mapa).bindPopup(pessoas[i].nome);
                rows += '<tr>'
                rows += `<th scope="row">${i + 1}</th>
                <td>${pessoas[i].nome}</td>
                <td>${pessoas[i].email}</td>`
                rows += '</tr>'
                arr.push(pessoas[i])
            }
            var tabela =
                `<table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NOME</th>
            <th scope="col">E-MAIL</th>
          </tr>
        </thead>
        <tbody>
        ${rows}
        </tbody>
      </table>`
            mat.innerHTML += tabela
        })
}
function selfGeoLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
        return true
    } else {
        x.innerHTML = "Geolocation is not supported by this browser."
        return false
    }

    function showPosition(position) {
        lat = position.coords.latitude
        long = position.coords.longitude
        L.marker([lat, long]).addTo(mapa).bindPopup(nome);
    }
}