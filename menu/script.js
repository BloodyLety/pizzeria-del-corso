document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/config/menu.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const menuList = document.getElementById("menu-list");
        menuList.innerHTML = "";

        data.forEach(pizza => {
            const div = document.createElement("div");
            div.classList.add("pizza-card");
            div.innerHTML = `<strong>${pizza.name}</strong>`
            menuList.appendChild(div)
        })
    })
    .catch(error => {
        console.error("Errore nel caricamento delle pizze:", error);
        document.getElementById("menu-list").innerHTML = "Errore di caricamento!";
    })
})