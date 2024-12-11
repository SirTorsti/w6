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

    const itemData = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            price,
        })
    });

    const offersJson = await itemData.json();
    console.log(offersJson);
});