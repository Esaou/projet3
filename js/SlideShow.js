class SlideShow {
    constructor(tableauImage, tableauText, repertoireImage, tempsImage) {
        
        this.tableauImage = tableauImage; //images du diap
        this.tableauText = tableauText; // textes du diap
        this.repertoireImage = repertoireImage; // repertoire des images du diap
        this.temps = tempsImage * 1000; // temps écoulé entre chaque image du diapo
        this.index = -1; 

        // Récupération des éléments HTML dans le DOM

        this.image = document.getElementById('slide'); 
        this.text = document.getElementById('commentaireImg'); 
        this.btnPrev = document.getElementById('prevButton'); 
        this.btnNext  = document.getElementById('nextButton');
        this.btnPause  = document.getElementById('pauseButton'); 

        // Gestion des evennements

        this.btnNext.addEventListener('click',()=>{ 
            this.suivant();                             
            } ); 
        this.btnPrev.addEventListener('click',()=>{
            this.precedent();                      
        } ); 
        this.playing = true; 
        this.btnPause.addEventListener('click',()=>{
                this.pausePlay();                           
            }); 
        document.addEventListener("keydown",(e)=> {
                this.flechesClavier(e);                     
            }); 
    }

    // Les différentes méthodes pour le fonctionnement du diaporama

    changementImageText() {
        this.image.src = this.repertoireImage + this.tableauImage[this.index];  
        this.text.innerHTML = this.tableauText[this.index];
    }
    diapAuto() {
        if (this.index === this.tableauImage.length -1 ) {
            this.index = -1;
        }
        this.index++;
        this.changementImageText();
        this.timer = setTimeout(() => {this.diapAuto()}, this.temps);     
    }    
    suivant() {      
        if (this.index >= (this.tableauImage.length - 1)) {
                this.index = -1;
            }
        this.changementImageText();
        clearTimeout(this.timer);
        if(this.playing){
            this.diapAuto();
        }else{
            this.diapAuto();
            this.pause();
        }
        }
    precedent() { 
        if(this.index <= 0){
            this.index = (this.tableauImage.length);
        }
        this.index--; 
        this.changementImageText();
        clearTimeout(this.timer);
        if(this.playing){
            this.timer = setTimeout(() => {this.diapAuto()}, this.temps);
        }else{
            this.pause();
        }
    }
    pause() {
        this.btnPause.className = "fas fa-play";
        this.playing = false;
        clearTimeout(this.timer);
    }
    play() {
        this.playing = true;
        clearTimeout(this.timer);
        this.btnPause.className = "fas fa-pause";
        this.timer = setTimeout(() => {this.diapAuto()}, this.temps);
    }
    pausePlay(){
        if(this.playing){
            this.pause();                           
        }
        else{
        this.play();
        } 
    }
    flechesClavier(e){
        if(e.keyCode === 37){
            this.precedent();               
        }                                           
        else if(e.keyCode === 39){
            this.suivant();
        }
    }
}

// Variable contenant les tableaux d'images et texte + variable répertoire des images

const tbdiapo1 = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
const tbtext1 = ['VéloClic : le vélo en un clic !',
                 'Trouvez la station qui vous convient sur notre carte',
                 'Un nom, un prénom et une signature !',
                 'Rendez-vous à la station choisie, vous avez 20 minutes !',
                 'Bonne route et surtout : restez prudent !'];
const repertoireImage = 'images/';

 // Nouvelle instance de la class SlideShow (nouveau diaporama)

const diaporama = new SlideShow(tbdiapo1, tbtext1, repertoireImage, 5);

// Lancement du diaporama automatique

diaporama.diapAuto();
