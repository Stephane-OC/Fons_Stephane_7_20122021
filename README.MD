# Groupomania - Projet 7 - Openclassroom

## Stephane Fons - Réseau Social d'Entreprise - Groupomania

## ■ Technologies utilisées :
```

    ▲ NodeJs - VueJs - SQL - SCSS - Bootstrap

```

## ■ Installation de GROUPOMANIA


### Pour pouvoir faire fonctionner votre réseau social il vous faudra :

   ▲ MySql : https://dev.mysql.com/downloads/installer/
   ▲ Node.js : https://nodejs.org/en/
   ▲ Git : https://git-scm.com/downloads


Il vous faut créer un dossier vide et cloner à l'intérieur :

https://github.com/Stephane-OC/Fons_Stephane_7_20122021.git



## ■ MySQL

Il vous faudra mettre dans le fichier Backend/.env votre nom d'user si besoin et le password d'accès à la base de données :

```

DB_USER=root
DB_PASS=

```

Ouvrir MySql Line client (ou Workbench) pour pouvoir effectuer ces lignes de commandes :

```

CREATE DATABASE groupomania;
USE groupomania;

```
Vous n'aurez ensuite plus qu'a importer le fichier groupomania.sql

## ■ FrontEnd

Ouvrez votre terminal dans votre dossier Frontend puis :
```

npm install
npm run serve

```
le navigateur devra être ouvert à l'adresse : http://localhost:8080/

## ■ BackEnd

Ouvrez votre terminal dans votre dossier Frontend puis :

```

npm install
npm node server

```
