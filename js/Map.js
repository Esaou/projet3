class Map {
    constructor(carte) {
        this.map = carte;   // map
        
        // Récupération des éléments HTML dans le DOM
        
        this.panneau = document.getElementById('infoReservation');
        this.carte = document.getElementById('carte'); 
        this.infoStation = document.getElementById('infoStation');
        this.nomStationUn = document.getElementById('nomStation');
        this.nomStation = document.getElementById('nomStationDeux');
        this.ouvertureStation = document.getElementById('ouvertureStation');
        this.adresse = document.getElementById('adresseDeux');
        this.nbrPlaces = document.getElementById('nbrPlacesDeux');
        this.nbrVelos = document.getElementById('nbrVelosDeux');
        this.titre = document.getElementById('titre');
        this.form = document.getElementById('form');
        this.btnReserver = document.getElementById('btnReserver');
        
        this.nomStationSelectionnee = '';
        
        // Création des icones pour marqueurs
        
        this.marqueurVert = L.icon({
            iconUrl: 'images/marqueurVert.png',
            iconSize: [70, 70],
            popupAnchor: [0,-32],
        });
        this.marqueurOrange = L.icon({
            iconUrl: 'images/marqueurOrange.png',
            iconSize: [70, 70],
            popupAnchor: [0,-32]
        });
        this.marqueurRouge = L.icon({
            iconUrl: 'images/marqueurRouge.png',
            iconSize: [70, 70],
            popupAnchor: [0,-32]
        });
        
        // Création des icones pour groupement de marqueurs
        
        this.markers = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                return L.divIcon({ 
                    html: cluster.getChildCount(), 
                    className: 'mycluster', 
                    iconSize: null 
                });
            }});
    }

    // Les différentes méthodes pour le fonctionnement de la map
    
    // Méthode d'initialisation de la carte
    
    mapInit(){
        this.map;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoiZXNhb3UiLCJhIjoiY2s0YjZxajJxMGF5NTNla2RlanZpdHU0aiJ9.WahFKT--zBVeywHI5U6i3Q'
        }).addTo(this.map);
    }

    // Méthode appel API + fonction permettant  la gestion des données recues
    
    async callAPI() {
            
            this.response = await fetch("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=f7ca37d9b99de628a093dbc0bbe285da7a78f630");
            this.data = await this.response.json();
    
            this.data.forEach(element => {

                // Fonction au clic marqueur
                
                this.clickMarqueur = () => {
                    
                    // affichage du panneau infos Station
                    
                    this.titre.className = 'titreClic';
                    this.panneau.className = 'panneau';
                    this.nomStation.innerHTML = ' ' + element.name ;
                    this.ouvertureStation.innerHTML = element.status;
                    this.adresse.innerHTML = ' ' + element.address;
                    this.nbrPlaces.innerHTML = ' ' + element.available_bike_stands;
                    this.nbrVelos.innerHTML = ' ' + element.available_bikes;
                    
                    this.nomStationSelectionnee = element.name;
                    
                    // Algorythme affichant les infos Station selon le statut station
                    
                    if(element.address.length === 0){
                        this.adresse.innerHTML = 'Adresse non communiquée';
                    }
                    if(element.status === 'CLOSED'){
                        this.ouvertureStation.className = 'ouvertureStationRouge';
                        this.infoStation.className = 'infoStationOuvert';
                        this.form.className = 'form';
                        this.nomStationUn.className ='nomStationClosed';
                        this.btnReserver.className = 'btnReserver';
                    }
                    else if(element.available_bikes > 5 && element.status === 'OPEN'){
                        this.ouvertureStation.className = 'ouvertureStation';
                        this.infoStation.className = 'infoStationOuvert';
                        this.form.className = 'form';
                        this.nomStationUn.className ='nomStation';
                        this.btnReserver.className = 'btnReserverActif';
                    }
                    else if(element.available_bikes === 0 && element.status === 'OPEN'){
                        this.ouvertureStation.className = 'ouvertureStationOrange';
                        this.infoStation.className = 'infoStationOuvert';
                        this.form.className = 'form';
                        this.nomStationUn.className ='nomStationClosed';
                        this.btnReserver.className = 'btnReserver';
                    }
                    else{
                        this.ouvertureStation.className = 'ouvertureStationOrange';
                        this.infoStation.className = 'infoStationOuvert';
                        this.form.className = 'form';
                        this.nomStationUn.className ='nomStation';
                        this.btnReserver.className = 'btnReserverActif';
                    }
            
                    // Fonction clic sur la map
            
                    this.map.on('click', ()=>{
                        this.infoStation.className = 'infoStation';
                        this.form.className = 'form';
                        this.titre.className -= 'titreClic';
                        this.btnReserver.className = 'btnReserver';
                    });
                    
                    // Fonction clic sur le bouton 'Reserver un vélo'
                    
                    this.btnReserver.addEventListener('click', () => {
                        this.infoStation.className -= 'infoStationOuvert';
                        this.form.className = 'formOuvert';
                        this.btnReserver.className = 'btnReserver';
                    });
                }
                
                // Création des différents marqueurs selon statut station

                if (element.status === 'OPEN') {
                    
                    if (element.available_bikes > 5) {
                        this.pointVert = L.marker([element.position.lat, element.position.lng], {icon: this.marqueurVert}).on('click', this.clickMarqueur);
                        this.pointVert.bindPopup(element.name + '<p class="popUp">Station ouverte </p>');
                        this.markers.addLayer(this.pointVert);
                    } 
                    else {
                        this.pointOrange = L.marker([element.position.lat, element.position.lng], {icon: this.marqueurOrange}).on('click', this.clickMarqueur);
                        this.pointOrange.bindPopup(element.name +'<p class="popUp">Station ouverte mais peu de vélos</p>');
                        this.markers.addLayer(this.pointOrange); // groupement de marqueurs
                    }
                }
                else if (element.status === 'CLOSED') {
                    this.pointRouge = L.marker([element.position.lat, element.position.lng], {icon: this.marqueurRouge}).on('click', this.clickMarqueur);
                    this.pointRouge.bindPopup(element.name + '<p class="popUp">Station fermée </p>');
                    this.markers.addLayer(this.pointRouge);
                } else {
                    console.log("statut inconu");
                }
                this.map.addLayer(this.markers); // groupement de marqueurs
            });
    }
    
}
