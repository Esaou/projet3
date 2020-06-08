class Timer{
    constructor(){

        this.messageReservation = document.getElementById('messageReservation');
        this.nomPrenom = document.getElementById('nomPrenom');
        this.annulerBoutton = document.getElementById('annulerReservation');   
        
    } 
    init(ms=1200000){
    
        this.time = ms/1000;
        this.calcMinutes();       
        this.calcSecondes();
        this.lancerTimer();
    }
    lancerTimer(){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        this.time--; 
        if(this.time > 0){        
            this.calcMinutes();     
            this.calcSecondes();
            this.messageReservation.innerHTML = '<p>Votre vélo vous attend à la station ' + sessionStorage.getItem('NomStation') +'.</p><p>Cette réservation expire dans <span id="min">' + this.minute + '</span> : <span id="sec">' + this.second + '</span> min.</p>';
            this.nomPrenom.innerHTML = '<p>Nom : ' + localStorage.getItem('Nom') + '</p><p>Prénom : ' + localStorage.getItem('Prenom') + '</p>';
            if(!(this.minute <10 && this.second < 10) && this.minute < 10){
                this.messageReservation.innerHTML = '<p>Votre vélo vous attend à la station ' + sessionStorage.getItem('NomStation') +'.</p><p>Cette réservation expire dans <span id="min">0' + this.minute + '</span> : <span id="sec">' + this.second + '</span> min.</p>';
            }
            if(this.minute <10 && this.second < 10) {
                this.messageReservation.innerHTML = '<p>Votre vélo vous attend à la station ' + sessionStorage.getItem('NomStation') +'.</p><p>Cette réservation expire dans <span id="min">0' + this.minute + '</span> : <span id="sec">0' + this.second + '</span> min.</p>';
            }
            if(!(this.minute <10 && this.second < 10) && this.second < 10 ){
                this.messageReservation.innerHTML = '<p>Votre vélo vous attend à la station ' + sessionStorage.getItem('NomStation') +'.</p><p>Cette réservation expire dans <span id="min">' + this.minute + '</span> : <span id="sec">0' + this.second + '</span> min.</p>';
            }
        }else if(this.second == 1 && this.minute == 0){
            this.stop();
            sessionStorage.clear();
            this.messageReservation.innerHTML = 'Aucune réservation en cours.';
            this.nomPrenom.className -= 'nomPrenomActif';
            this.annulerBoutton.className -= 'boutonAnnuler';
            }
         else if(this.second == 0 && this.minute == 0){
                this.stop();
                sessionStorage.clear();
                this.messageReservation.innerHTML = 'Aucune réservation en cours.';
                this.nomPrenom.className -= 'nomPrenomActif';
                this.annulerBoutton.className -= 'boutonAnnuler';
                }
        }, 1000);
    }
    stop(){
        clearInterval(this.interval);     
    }
    calcMinutes(){
        this.minute =Math.floor(this.time/60);
    }  
    calcSecondes(){
        this.second = Math.floor(this.time-(this.minute*60));
    }
}

