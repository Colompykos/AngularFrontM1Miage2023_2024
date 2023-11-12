[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6epMQcoo)
# Angular : rendu n°2
Repository où déposer le projet n°2 Angular

### Nom[^1] : TAKI EDINE  

### Prénom[^2] : Marouane

## A faire[^3]
- [x] Suivre le cours jusqu'à la page 180
- [x] Intégrer toolbar et navbar du rendu n°1
- [x] Identification par **login/password**
  - ajouter un tableau de login/password/role (avec rôle qui est soit **user** soit **admin**) dans le service d'authentification
  - modifier le code pour avoir `isLogged()` **ET** `isAdmin()` au lieu de juste `isAdmin()`
- [x] Au lieu du slider `LogIn`, ajouter un bouton connecter (avec une *mat-icon* adaptée) qui amène à un composant avec un formulaire de connexion
- [x] Gestion des droits :
  - L'admin peut éditer et effacer les assignment
  - Le user peut voir le détail des assignment
  - Si on n'est pas logué on ne peut ni voir le détail, ni éditer

## NB : 
Les différents niveaux d'accès:
-User non connecté : il ne peut rien faire  - état avant connexion
-User connecté : connexion (username="user" - Password="user") - il peut voir les assignments et leurs détails
-Administrateur connecté : connexion (username="admin" - Password="admin") :
            - Il peut voir les assignments et leurs détails
            - Il peut ajouter un assignment
            - Il peut supprimer un assignment
            - Il peut modifier un assignment
            - Il peut checker un assignment
            

[^1]: à remplir
[^2]: à remplir
[^3]: vous pouvez cocher les tâches qui ont été faites en utilisant la syntaxe `[x]` dans le markdown
