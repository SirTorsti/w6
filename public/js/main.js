submitButton.addEventListener("click", async function(event) {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const image = document.getElementById("image").files[0];

    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Price: ", price);
    
    if (!title || !description || isNaN(price)) {
        console.error("Invalid input data");
        alert("Massiivinen virhe tapahtunut");
        return;
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    if (image) {
        formData.append("image", image)
    }

    const itemData = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    })

    const offersJson = await itemData.json();
    console.log(offersJson);
});

async function fetchOffer() {
    const response = await fetch("http://localhost:3000/offers")
    const offers = await response.json()
    const offerContainer = document.getElementById("offersContainer")
    offerContainer.innerHTML=""

    offers.forEach((offer) => {
        const offerDiv = document.createElement("div")
        offerDiv.classList.add("offerDiv")
    })
    
}