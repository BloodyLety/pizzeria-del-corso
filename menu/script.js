document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/config/menu.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const menuList = document.getElementById("menu-list");
            menuList.innerHTML = "";

            renderList(menuList, data.classics, "Classiche");
            renderList(menuList, data.specials, "Speciali");
            renderList(menuList, data.seasonal, "Stagionali");

            // data.classics.forEach(pizza => {
            //     // let allergens = "";
            //     // if (pizza.allergens.length > 0 ) {
            //     //     allergens = pizza.allergens.join(", ");
            //     // } else {
            //     //     allergens = "nessuno";
            //     // }
            //     const div = document.createElement("div");
            //     div.classList.add("pizza-card");
            //     div.innerHTML = `
            //         <div class="card-header">
            //             <p>${pizza.name}</p>
            //             <p>${pizza.price} €</p>
            //         </div>
            //         <p class="card-ingredients">
            //             <span>Ingredienti</span>: ${pizza.ingredients.join(", ")}
            //         </p>
            //         <p class="card-ingredients">
            //             <span>Allergeni</span>: ${pizza.allergens.length > 0 ? pizza.allergens.join(", ") : "nessuno"}
            //         </p>
            //         `
            //     menuList.appendChild(div)
            // })
        })
        .catch(error => {
            console.error("Errore nel caricamento delle pizze:", error);
            document.getElementById("menu-list").innerHTML = "Errore di caricamento!";
        })
})

document.querySelectorAll(".filter").forEach(checkbox => {
    checkbox.addEventListener("change", applyFilters);
});

document.getElementById("reset").addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(checkbox => checkbox.checked = false);
    applyFilters();
});

function applyFilters() {
    let selezionati = Array.from(document.querySelectorAll(".filter:checked"))
        .map(checkbox => checkbox.value);

    console.log("Allergeni selezionati:", selezionati);

    document.querySelectorAll(".pizza-card").forEach(pizza => {
        let allergeniPizza = pizza.dataset.allergens.split(",");

        // Controlla se la pizza ha uno degli allergeni selezionati
        let haAllergeni = selezionati.some(allergene => allergeniPizza.includes(allergene));

        // Mostra/nasconde la pizza in base ai filtri
        pizza.style.display = haAllergeni ? "none" : "block";
    });
}

function renderList(menuList, list, title) {

    console.log(menuList, list, title);
    const h = document.createElement("h1");
    h.classList.add("category-title");
    h.innerHTML = `${title}`;
    menuList.appendChild(h);

    list.forEach(pizza => {
        // let allergens = "";
        // if (pizza.allergens.length > 0 ) {
        //     allergens = pizza.allergens.join(", ");
        // } else {
        //     allergens = "nessuno";
        // }
        const div = document.createElement("div");
        div.classList.add("pizza-card");
        div.setAttribute("data-allergens", pizza.allergens.join(","));
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
}