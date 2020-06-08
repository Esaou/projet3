// Initialisation de la carte

const carte = L.map('carte').setView([45.747695, 4.850029], 12);

// Nouvelle instance de la class Map + Appel des méthodes pour fonctionnement de la carte

const veloClic = new Map(carte);
veloClic.mapInit();
veloClic.callAPI();

// Nouvelle instance de la class Canvas

const sign = new Canvas();

// Nouvelle instance de la class Timer

const timer = new Timer();

// Nouvelle instance class Reservation permettant la récupération des données de la class Map

const veloClicReservation = new Reservation(veloClic, sign, timer);




