document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/config/menu.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const menuList = document.getElementById("menu-list");
        menuList.innerHTML = "";

        data.classics.forEach(pizza => {
            // let allergens = "";
            // if (pizza.allergens.length > 0 ) {
            //     allergens = pizza.allergens.join(", ");
            // } else {
            //     allergens = "nessuno";
            // }
            const div = document.createElement("div");
            div.classList.add("pizza-card");
            div.innerHTML = `
                <div class="card-header">
                    <p>${pizza.name}</p>
                    <p>${pizza.price} €</p>
                </div>
                <p class="card-ingredients">
                    <span>Ingredienti</span>: ${pizza.ingredients.join(", ")}
                </p>
                <p class="card-ingredients">
                    <span>Allergeni</span>: ${pizza.allergens.length > 0 ? pizza.allergens.join(", ") : "nessuno"}
                </p>
                `
            menuList.appendChild(div)
        })
    })
    .catch(error => {
        console.error("Errore nel caricamento delle pizze:", error);
        document.getElementById("menu-list").innerHTML = "Errore di caricamento!";
    })
})