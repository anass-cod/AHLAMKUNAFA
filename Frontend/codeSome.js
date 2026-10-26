let panier = localStorage.panier != undefined ? JSON.parse(localStorage.panier) : []
async function getData() {
    try {
        let data = await fetch("../../backend/main.json")
        if (!data.ok) {
            throw new Error("error")
        }
        data = await data.json()
        return data
    } catch (err) {
        return "Error"
    }
}
async function addProuduit(id) {
    let data = await getData()
    if (data != "Error") {
        let troveProduit = panier.find(e => e.id === id)
        let produit = data.find(e => e.id === id)
        if (produit) {
            let index = data.indexOf(produit)
            if (!troveProduit) {
                produit.quantity = 1
                panier.push(data[index])
            } else {
                let indexPanier = panier.indexOf(troveProduit)
                panier[indexPanier].quantity += 1
            }
            localStorage.panier = JSON.stringify(panier)
            let msgAjout = document.querySelector(".msgAjout")
            msgAjout.classList.add("msgActive")
            setTimeout(() => {
                msgAjout.classList.remove("msgActive")
            }, 3000)
        } else{
            document.getElementById("error-container").classList.add("active")
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
function closeAlret() {
    document.getElementById("error-container").classList.remove("active")
}