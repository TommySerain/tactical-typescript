# tactical-typescript

L'objectif du projet sera de créer un petit jeu de stratégie au tour par tour en utilisant Typescript sans framework

## Fonctionnalités

- Avoir une grille de jeu pouvant contenir les unités/pion/objets à différentes coordonnées
- Pouvoir sélectionner un pion/unité et obtenir ses possibilités d'actions
- Réaliser une action change l'état de la grille de jeu et/ou l'état des autres unités
- Avoir un système de tour de jeu (seulement certaines unités sont sélectionnable selon le tour)

Exemple de jeu intéressant (parce qu'il peut faire utiliser classes, héritage et patterns) :
Un tactical "rpg" avec différents types d'unités (warrior, healer, rogue, etc.), chaque unité a des possibilités de déplacement différentes (en terme de distance et/ou de pattern) ainsi que des statistiques (point de vie, point d'action, point de mana) et des actions (attaquer à distance, soigner une autre unité, action spéciale). Possibilité d'avoir des objets ramassables et des surface différentes sur la zone de jeu.

Ou sinon un jeu d'échec ou de dame, mais les contraintes sont pas les mêmes et je les trouve un peu moins intéressante en terme de POO, et c'est pas forcément plus simple car ça se focalisera beaucoup plus sur des règles de déplacement et de "prises"

## Réalisation

- L'application doit marcher intégralement sans interface graphique
- Utiliser des classes et des interfaces pour créer le fonctionnement internet de l'application
- Réaliser une interface graphique en HTML via le DOM qui utilisera les classes "modèles" pour fonctionner
