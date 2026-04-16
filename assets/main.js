//Variables Page HTML

//Déclarations HTML
const newEntry = document.getElementById('newEntry')

//Dialog & in Dialog Nouvelle Matiere:
const entryDialog = document.getElementById('entryDialog')
const titleDialog = document.getElementById('titleDialog')

const notifInputError = document.getElementById('notif_Input_Error')
const matInput = document.getElementById('matInput')
const epaisseurInput = document.getElementById('epaisseurInput')
const stockInput = document.getElementById('stockInput')
const stockMiniInput = document.getElementById('stockMiniInput')

const btnOk = document.getElementById('btnOk')
const btnCancel = document.getElementById('btnCancel')
//Dialog Ajouter / supprimer Tole
const dialogStockUpdate = document.getElementById('dialogStockUpdate')

const stockUpdateMat = document.getElementById('stockUpdateMat')
const stockUpdateEpaisseur = document.getElementById('stockUpdateEpaisseur')
const stockUpdate = document.getElementById('stockUpdate')
const stockUpdateMini = document.getElementById('stockUpdateMini')

const addReduceSpan = document.getElementById('addReduceSpan')
const stockUpdateInput = document.getElementById('stockUpdateInput')
const addFive = document.getElementById('addFive')
const addTen = document.getElementById('addTen')
const addAll = document.getElementById('addAll')

const stockUpdateSubmit = document.getElementById('stockUpdateSubmit')
const stockUpdateCancel = document.getElementById('stockUpdateCancel')


//Main :
const contenairTable = document.getElementById('contenairTable')
const totalMatView = document.getElementById('totalMatView')
//Footer :
const InfoVersion = document.getElementById ('infoVersion')
//const versionlog = document.getElementByID ('versionlog')

//Variables de fonctions - Ready to use:
let matiereSaisie = []
let itemToTarget //utiliser pour find mes items
let currentAction //utilisé pour Ajouter ou reduire dans .stock pour le statut
//pour le ciblage du submit dans le dialog Add&reduce
let numToAdd //utilisé pour Ajouter 5-10-All a l'input via les btn du dialog add.reduce


//Debut Script 

//Dialog New Entry : Open / Close
newEntry.addEventListener("click", () => { 
    titleDialog.textContent = "Nouvelle Saisie :"  
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
    if (btnOk.dataset.mode === "Edit") {
        alert('pas encore pret'); 
        // EN CONSTRUCTION !
        // => recreer l'objet et le replacer
    //on termine par remettre a 0 les valeurs du btn-ok
    btnOk.dataset.id =""
    btnOk.dataset.mode=""
    console.log(btnOk) //Pour check les proprietés apres validation
    return
    }
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
    const createThCinq = document.createElement('th')
    createThCinq.textContent = "Actions"
    const createTbody = document.createElement('tbody')
    createTbody.id = "bodyTable"

    //On vide le contenair pour eviter la duplication de recréation
    contenairTable.textContent = ""

    //Je creer le tableau (th*4 -> tr -> thead -> tbody -> table)
    createTr.appendChild(createThUn)
    createTr.appendChild(createThDeux)
    createTr.appendChild(createThTrois)
    createTr.appendChild(createThQuatre)
    createTr.appendChild(createThCinq)
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
        //Btn-Add
        const createBtnAdd = document.createElement('button')
        createBtnAdd.classList.add('add_row_btn')
        createBtnAdd.textContent = "+"
        createBtnAdd.dataset.id = dataCell.id
        createBtnAdd.dataset.action = "➕"
        //Btn-Reduce
        const createBtnReduce = document.createElement('button')
        createBtnReduce.classList.add('reduce_row_btn')
        createBtnReduce.textContent = "-"
        createBtnReduce.dataset.id = dataCell.id
        createBtnReduce.dataset.action = "➖"
        //Btn-Edit
        const createBtnEdit = document.createElement('button')
        createBtnEdit.classList.add('edit_row_btn')
        createBtnEdit.textContent = "✏️"
        createBtnEdit.dataset.id = dataCell.id
        //Btn-Delete
        const createBtnDelete = document.createElement('button')
        createBtnDelete.classList.add('delete_row_btn')
        createBtnDelete.textContent = "❌"
        createBtnDelete.dataset.id = dataCell.id

        const createTdBtn = document.createElement('td')
        //Comparaison du Stock Reel - Stock Mini
            if (dataCell.stock <= dataCell.stockmini) 
                {createTdStock.classList.add('miniActive')}
        //j'ajoute les Cells et Row (td*4 -> tr)
        createDataRow.appendChild(createTdMatiere)
        createDataRow.appendChild(createTdEpaisseur)
        createDataRow.appendChild(createTdStock)
        createDataRow.appendChild(createTdStockMini)
                
        createTdBtn.appendChild(createBtnAdd)
        createTdBtn.appendChild(createBtnReduce)
        createTdBtn.appendChild(createBtnEdit)
        createTdBtn.appendChild(createBtnDelete)
        createDataRow.appendChild(createTdBtn)
        createTbody.appendChild(createDataRow)

    //Listener Btn-Add
        createBtnAdd.addEventListener('click', (event) => {
            const idToTarget = parseInt(event.target.dataset.id)
            itemToTarget = matiereSaisie.find(element => element.id === idToTarget)
            currentAction = "add"

        dialogStockUpdate.showModal() 
        stockUpdateMat.textContent = itemToTarget.matiere
        stockUpdateEpaisseur.textContent = itemToTarget.epaisseur
        stockUpdate.textContent = itemToTarget.stock
        stockUpdateMini.textContent = itemToTarget.stockmini
        stockUpdateSubmit.textContent = "Ajouter"
        addReduceSpan.textContent = "Ajouter" 
    })
    //Listener Btn-Reduce
        createBtnReduce.addEventListener('click', (event) => {
            const idToTarget = parseInt(event.target.dataset.id)
            itemToTarget = matiereSaisie.find(element => element.id === idToTarget)
            currentAction = "reduce"

        dialogStockUpdate.showModal() 
        stockUpdateMat.textContent = itemToTarget.matiere
        stockUpdateEpaisseur.textContent = itemToTarget.epaisseur
        stockUpdate.textContent = itemToTarget.stock
        stockUpdateMini.textContent = itemToTarget.stockmini
        stockUpdateSubmit.textContent = "Reduire"
        addReduceSpan.textContent = "Reduire" 
    })
    //Listener Btn-Edit 
        createBtnEdit.addEventListener('click', () =>{
            const idToTarget = parseInt(event.target.dataset.id)
            itemToTarget = matiereSaisie.find(element => element.id === idToTarget)
  //Ici je prepare le changement d"etat de mon btn valider dans dialog Entry pour qu'il ne creer pas une nouvelle ligne
        btnOk.dataset.mode = "Edit"
        btnOk.dataset.id = idToTarget
        titleDialog.textContent = "Editer la Saisie :"  
        matInput.value = itemToTarget.matiere
        epaisseurInput.value = itemToTarget.epaisseur
        stockInput.value = itemToTarget.stock
        stockMiniInput.value = itemToTarget.stockmini
        entryDialog.showModal()
        console.log(btnOk)
    })

    //listener du bouton supprimer ligne
        createBtnDelete.addEventListener('click', (event) => {
            if (window.confirm("Etes vous sûr de pas faire une connerie ?")) 
                {
                const idToDelete = parseInt(event.target.dataset.id)
                //On filtre tout SAUF la ligne avec l'id pour recreer l'array
                matiereSaisie = matiereSaisie.filter(element => element.id !== idToDelete)
                //On relance l'affichage en rappelant la fonction
                viewTable()
            }
        })
    })
    totalMatView.textContent = matiereSaisie.length
}
//Validation de dialog entry en mod EDIT (ID btnok => btnOkEdit)
//validation dans le dialog Add.Reduce : Permet d'ajuster mes stocks
stockUpdateSubmit.addEventListener('click', ()=>{
        let newStock = parseInt(stockUpdateInput.value) || 0
    if (currentAction === "reduce" && itemToTarget.stock < newStock) {alert("Impossible !"); return}
    if (currentAction === "add") {newStock = newStock + itemToTarget.stock}
    else {newStock = itemToTarget.stock - newStock}
    
        itemToTarget.stock = newStock
        stockUpdateInput.value = ""
        dialogStockUpdate.close()
        viewTable()
    })
//Bouton Cancel du dialog d'ajust Stock
stockUpdateCancel.addEventListener('click', () =>{
    stockUpdateInput.value = ""
    dialogStockUpdate.close()
    })

//Btn Ajout +5 a la value.input
addFive.addEventListener('click', () =>{
    const stockUpdateInputParse = parseInt(stockUpdateInput.value) || 0
    numToAdd = 5
    stockUpdateInput.value = numToAdd + stockUpdateInputParse
    numToAdd = 0
})
addTen.addEventListener('click', () =>{
    const stockUpdateInputParse = parseInt(stockUpdateInput.value) || 0
    numToAdd = 10
    stockUpdateInput.value = numToAdd + stockUpdateInputParse
    numToAdd = 0
})
addAll.addEventListener('click', () =>{
    const updateAlltoInput = parseInt(stockUpdate.textContent) || 0
    stockUpdateInput.value = updateAlltoInput
})

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

function ApplyChange (){

}