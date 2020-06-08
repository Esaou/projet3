class Canvas{
	constructor(){
        
        // Récupération des éléments HTML dans le DOM

        this.canvas = document.querySelector("canvas");
        this.btnCorriger = document.getElementById('btnCorriger');

        // Réglage de la taille/hauteur/contexte du canvas

		this.canvas.width = 300;
		this.canvas.height = 250;
		this.ctx = this.canvas.getContext("2d");
        
        // Initialisation des variables canvas vide et painting

        this.canvasBlank = true;
        this.painting = false;
        this.count = 0;
        
        // Gestion des evennements à travers deux methodes

        this.controlMouse();
        this.controlTouch();
        this.stopScroll();
        this.boutonCorriger();
    }

    // Les différentes méthodes permettant l'utilisation du canvas (signature)
    
	startPosition(){
		let Canvas = this;
		Canvas.painting = true;  
		Canvas.canvasBlank = false;
	}
	stopPosition(){
        let Canvas = this;
	    Canvas.painting = false;
	    Canvas.ctx.beginPath();
	}
	draw(e){
		let Canvas = this;
		if (!Canvas.painting) return;
        Canvas.ctx.lineWidth = 3;
        Canvas.ctx.lineCap = "round";
        Canvas.ctx.strokeStyle = "rgb(50,50,50)";
        Canvas.ctx.lineTo(e.offsetX, e.offsetY); 
        Canvas.ctx.stroke();
        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo(e.offsetX, e.offsetY);
        this.count++;
    }
    drawTouch(ev){
            let Canvas = this;
            let touch = ev.changedTouches[0];
            if (!Canvas.painting) return;
            Canvas.ctx.lineWidth = 3;
            Canvas.ctx.lineCap = "round";
            Canvas.ctx.strokeStyle = "rgb(50,50,50)";
            Canvas.ctx.lineTo(touch.clientX - this.canvas.getBoundingClientRect().left, touch.clientY  - (this.canvas.getBoundingClientRect().top+window.scrollX)); 
            Canvas.ctx.stroke();
            Canvas.ctx.beginPath();
            Canvas.ctx.moveTo(touch.clientX - this.canvas.getBoundingClientRect().left, touch.clientY  - (this.canvas.getBoundingClientRect().top+window.scrollX));
            this.count++;
    }
    
    // Méthodes concernant la gestion des evennements (dessin)

    controlMouse(){
        let Canvas = this;
		Canvas.canvas.addEventListener("mousedown", (e)=>{
			 Canvas.startPosition();
		});
 
		Canvas.canvas.addEventListener("mousemove", (e)=> {
		        Canvas.draw(e);
		});
 
		 Canvas.canvas.addEventListener("mouseup", ()=>{
            Canvas.stopPosition();
		});
		Canvas.canvas.addEventListener("mouseleave", () => {
			Canvas.stopPosition();
		});
    }
    controlTouch(){
        let Canvas = this;
        Canvas.canvas.addEventListener("touchstart", () => {
            this.startPosition();
        });

        Canvas.canvas.addEventListener("touchmove", (ev)=> {
            this.drawTouch(ev);
        });
        Canvas.canvas.addEventListener("touchend", () => {
            this.stopPosition();
        } );
    }    
    stopScroll(){
        this.canvas.addEventListener("touchstart", (e)=>{
            if (e.target == this.canvas){
            e.preventDefault();
            }
        });
            
        this.canvas.addEventListener("touchend", (e)=>{
            if (e.target == this.canvas){
            e.preventDefault();
            }
        });
        this.canvas.addEventListener("touchmove",(e) =>{
            if (e.target == this.canvas){
            e.preventDefault();
            }
        });
    }       
    
    // Méthodes concernant le bouton Corriger

    corriger() {
		let Canvas = this;
		Canvas.ctx.clearRect(0, 0, 500, 500);
        Canvas.canvasBlank = true;
        this.count = 0;
    }
    boutonCorriger(){
		let Canvas = this;
		Canvas.btnCorriger.onclick = () => {
			Canvas.corriger();
	    };
	}
}  

// Création d'une nouvelle instance de la class Canvas

const signature = new Canvas ();
