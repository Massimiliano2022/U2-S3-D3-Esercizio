fetch("https://striveschool-api.herokuapp.com/books")

    .then(responseObj => responseObj.json())

    .then(books => {
        const grid = document.getElementById("books-container")
        grid.innerHTML = ""

        for (let i = 0; i < books.length; i++) {
            // crea una nuova riga ogni quattro libri
            // se i / 4 è uguale a 0 creo una nuova riga
            if (i % 4 === 0) {
                const row = document.createElement("div")
                row.className = "row"
                grid.appendChild(row)
            }

            // crea una nuova colonna per il libro corrente
            const col = document.createElement("div")
            col.className = "col-6 col-md-3"
            col.innerHTML = `
            <div class="card mx-2 my-2">
                <img src="${books[i].img}" class="card-img-top img-fluid" alt="Copertina">
                <div class="card-body">
                    <h5 class="card-title">${books[i].title}</h5>
                    <p class="card-text">Price: ${books[i].price}</p>
                    <button type="button" class="btn btn-primary" id="btnDelete">Delete</button>
                </div>
            </div>
            `
            const deleteCard = col.querySelector("#btnDelete")
            deleteCard.onclick = () => {
                col.remove();
            }

            // aggiungi la colonna alla riga corrente
            const currentRow = grid.lastChild
            currentRow.appendChild(col)
        }

    })
    .catch(error => console.log("CATCH", error))
