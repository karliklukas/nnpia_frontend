This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## NNPIA semestrální práce - frontend

Napsáno v ReactJs. Dále bylo využito React-router pro navigaci, axios pro komunikaci s backendem a bootstrap pro css styly. 

Nasazena na platformě [vercel](https://nnpia-karlik.now.sh/)

#### Téma
Tématem semestrální práce bylo napsání aplikace jež by mohla složit seniorům k zjednodušení jejich nakupování.
Cílem bylo vytvoření takové aplikace jež dovolí nepřihlášenému uživateli (senior) vytvoření nákupního seznamu, který
si pak bude moct vybrat některý z přihlášených uživatelů. Komunikace je předpokládána přes email. Z tohoto důvodu
také backend zasílá emailové zprávy seniorům, aby byli dostatečně informováni. Také v aplikaci je pak možné zjistit stav seznamu.

#### Spuštění
- cd do složky tohoto projektu
- npm install 
- npm start

Projekt je nastavený pro připojení na backend, který je na platformě [heroku](https://nnpia.herokuapp.com/). Pro připojení například na localhost je třeba změnit adresu v servisních třídách.

#### Kód
Rozdělní kódu do balíčků 
- components - obsahuje všechny komponenty ze, kterých se skládá web
- service - obsahuje třídy starající se o komunikaci s API

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
