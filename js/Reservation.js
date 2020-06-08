class Reservation {
    constructor(map, sign, timer) {
        this.timer = timer; // recupération timer
        this.sign = sign; // récupération canvas
        this.carte = map; // récupération map
        
        // Récupération élément HTML dans le DOM
        
        this.submit = document.getElementById('submit');
        this.name = document.getElementById('nom');
        this.prenom = document.getElementById('prenom');
        this.error = document.getElementById('error');
        this.nomPrenom = document.getElementById('nomPrenom');
        this.maReservation = document.getElementById('maReservation');
        this.boutonReserver = document.getElementById('btnReserver');
        this.boutonAnnuler = document.getElementById('annulerReservation');
        this.station = document.getElementById('stationSelectionnee');
        this.messageReservation = document.getElementById('messageReservation');
        this.pasDeReservation = document.getElementById('pasDeReservation');

        // Expression régulière gérant la validité des champs nom/prénom de la réservation
        
        this.nameCheck = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s^-]{1,50}$/;
        this.prenomCheck = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s^-]{1,50}$/;
       
        // Gestion des evennements bouton 'Confirmer ma réservation' + 'Annuler ma réservation'
       
        this.submit.addEventListener('click',() => {
            this.valider(event);
        });
        this.boutonAnnuler.addEventListener('click', () => {
            this.annulationReservation();
        });
       
        // Récupération du nom et prénom pour préremplir les champs LocalStorage
       
        this.prenom.value = localStorage.getItem('Prenom');
        this.name.value = localStorage.getItem('Nom'); 
        
        this.raffraichir();
    }
   
    // Méthode concernant la validation du formulaire de réservation
    
    valider(event){
        // gestion des erreurs
        if(this.name.value ==""){
            event.preventDefault();
            this.error.innerHTML = 'Renseignez votre nom !';      
        }
        else if(this.prenom.value ==""){
            event.preventDefault();
            this.error.innerHTML = 'Renseignez votre prénom !';      
        }
        else{
            // si les données sont valides, on valide la réservation et lance le decompte
            if( this.nameCheck.test(this.name.value) && this.prenomCheck.test(this.prenom.value) && this.sign.count >= 25){
                    this.error.innerHTML = '';
                    localStorage.setItem('Nom', this.name.value);
                    localStorage.setItem('Prenom', this.prenom.value);
                    sessionStorage.setItem('NomStation', this.carte.nomStationSelectionnee);
                    this.carte.form.className = 'form';
                    this.carte.titre.className -= 'titreClic';
                    this.nomPrenom.innerHTML = '<p>Nom : ' + localStorage.getItem('Nom') + '</p><p>Prénom : ' + localStorage.getItem('Prenom') + '</p>';
                    if(sessionStorage.dateExpiration){
                        this.timer.stop();
                    }
                   // this.timer = new Timer(1200000);
                    this.timer.init(1200000);
                    this.expiration = Date.now() + (this.timer.time*1000);
                    sessionStorage.setItem('timerTime', this.timer.time*1000);
                    sessionStorage.setItem("dateExpiration", this.expiration);
                    this.nomPrenom.className = 'nomPrenomActif';
                    this.boutonAnnuler.className = 'boutonAnnuler';
                    this.sign.corriger();
                }
            else{
                event.preventDefault();
                this.error.innerHTML = 'Nom, prénom ou signature invalide !';
            }   
        }
    }

    // Methode raffraichissement décompte une fois réservation validée
    raffraichir(){
        if(sessionStorage.dateExpiration){
           this.dateExpiration = Number(sessionStorage.getItem("dateExpiration"));
           let time = this.dateExpiration - Date.now();
           this.timer.init(time);
         //  this.timer = new Timer(time);
           this.nomPrenom.className = 'nomPrenomActif'; 
           this.boutonAnnuler.className = 'boutonAnnuler';  
           this.nomPrenom.innerHTML = '<p>Nom : ' + localStorage.getItem('Nom') + '</p><p>Prénom : ' + localStorage.getItem('Prenom') + '</p>';
       }
    }
    
    // Méthode concernant le bouton 'Annuler ma réservation'
    
    annulationReservation(){
        this.timer.stop(); 
        sessionStorage.clear();
        this.messageReservation.innerHTML = 'Aucune réservation en cours.';
        this.nomPrenom.className -= 'nomPrenomActif';
        this.boutonAnnuler.className -= 'boutonAnnuler';      
    }
}

