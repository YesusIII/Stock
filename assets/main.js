//Variables Page HTML


//Déclarations HTML
const newEntry = document.getElementById('newEntry')

//Dialog & in Dialog :
const entryDialog = document.getElementById('entryDialog')

const notifInputError = document.getElementById('notif_Input_Error')
const matInput = document.getElementById('matInput')
const epaisseurInput = document.getElementById('epaisseurInput')
const stockInput = document.getElementById('stockInput')
const stockMiniInput = document.getElementById('stockMiniInput')

const btnOk = document.getElementById('btnOk')
const btnCancel = document.getElementById('btnCancel')

//Main :
const contenairTable = document.getElementById('contenairTable')
const totalMatView = document.getElementById('totalMatView')
//Footer :
const InfoVersion = document.getElementById ('infoVersion')
//const versionlog = document.getElementByID ('versionlog')

//Variables de fonctions - Ready to use:
let matiereSaisie = []

//Debut Script 

//Dialog New Entry : Open / Close
newEntry.addEventListener("click", () => {   
    entryDialog.showModal()  
})
btnCancel.addEventListener("click", () =>{
    entryDialog.close();
})

//Validation du Dialogue de Saisie
btnOk.addEventListener('click', () =>{
    //Condition de verification des inputs vides
        if (!matInput.value || !epaisseurInput.value || !stockInput.value || !stockMiniInput.value) 
        {showError("Tous les champs sont obligatoires")
        return}
        notifInputError.textContent = ""
        notifInputError.classList.remove('active')
    //Conversion des valeurs
    const matInputVal = matInput.value 
    const epaisseurInputVal = parseFloat(epaisseurInput.value) || 0
    const stockInputVal = parseFloat(stockInput.value) || 0
    const stockMiniInputVal = parseFloat(stockMiniInput.value) || 0
    
    //Declaration de mes objets
    const nouvellematiere = {
            id : Date.now(),
            matiere: matInputVal,
            epaisseur: epaisseurInputVal,
            stock: stockInputVal,
            stockmini: stockMiniInputVal
            }
    //push de mes objets dans mon array (let declaré en top)    
    matiereSaisie.push(nouvellematiere)
    //Envoi de la longueur de l'array dans le span total des Matieres
    totalMatView.textContent = matiereSaisie.length
    //Console.log pour check le comportement des objets dans mon array
    console.log(matiereSaisie)

    //Execution des scripts
    viewTable()
    resetForm()
    entryDialog.close()   
})

//Affichage du tableau et des données saisies
function viewTable (){
    //Variables de creation et texte
    const createTable = document.createElement('table')
    const createThead = document.createElement('thead')
    const createTr = document.createElement('tr')
    const createThUn = document.createElement('th')
    createThUn.textContent = "Matière"
    const createThDeux = document.createElement('th')
    createThDeux.textContent = "Epaisseur"
    const createThTrois = document.createElement('th')
    createThTrois.textContent = "Stock"
    const createThQuatre = document.createElement('th')
    createThQuatre.textContent = "Seuil d'alerte"
    const createTbody = document.createElement('tbody')
    createTbody.id = "bodyTable"

    //On vide le contenair pour eviter la duplication de recréation
    contenairTable.textContent = ""

    //Je creer le tableau (th*4 -> tr -> thead -> tbody -> table)
    createTr.appendChild(createThUn)
    createTr.appendChild(createThDeux)
    createTr.appendChild(createThTrois)
    createTr.appendChild(createThQuatre)
    createThead.appendChild(createTr)
    createTable.appendChild(createThead)
    createTable.appendChild(createTbody)
    contenairTable.appendChild(createTable)

    matiereSaisie.forEach(dataCell => {
        //Création des Cells et ajout du texte
        const createDataRow = document.createElement('tr')
        const createTdMatiere = document.createElement('td')
        createTdMatiere.textContent = dataCell.matiere
        const createTdEpaisseur = document.createElement('td')
        createTdEpaisseur.textContent = dataCell.epaisseur
        const createTdStock = document.createElement('td')
        createTdStock.textContent = dataCell.stock
        const createTdStockMini = document.createElement('td')
        createTdStockMini.textContent = dataCell.stockmini
        //Comparaison du Stock Reel - Stock Mini
            if (dataCell.stock <= dataCell.stockmini) 
                {createTdStock.classList.add('miniActive')}
        //j'ajoute les Cells et Row (td*4 -> tr)
        createDataRow.appendChild(createTdMatiere)
        createDataRow.appendChild(createTdEpaisseur)
        createDataRow.appendChild(createTdStock)
        createDataRow.appendChild(createTdStockMini)
        createTbody.appendChild(createDataRow)
    });
}

//Erreur de Saisie dans les champs inputs
function showError(message) {
    notifInputError.textContent = message
    notifInputError.classList.add('active')
    setTimeout(() => {
        notifInputError.classList.remove('active')
    }, 5000)
}

 //Fonction pour clear les champs des inputs à la fermeture du dialog
function resetForm(){
    const champs = [matInput, epaisseurInput, stockInput, stockMiniInput]
    champs.forEach((champ) => {
        champ.value = ""
    })
}