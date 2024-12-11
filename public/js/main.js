const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value.trim()
    const description = document.getElementById("description").value.trim()
    const price = document.getElementById("price").value.trim()

    if(!title || !description || isNaN(price)) {
        console.error("Invalid input data")
        alert("homo")
        return
    }

    const itemData = await fetch("http://localhost:3000/upload", {
        method: "post",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            price,
        })
    })
    const offersJson = await itemData.json()
    console.log(offersJson)

})