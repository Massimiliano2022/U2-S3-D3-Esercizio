fetch("https://striveschool-api.herokuapp.com/books")

    .then(responseObj => responseObj.json())

    .then(books => {

        const grid = document.getElementById("grid")
        grid.innerHTML = ""

        books.forEach((book) => {

            const col = document.createElement("div")
            col.className = "col"
            col.innerHTML = `
            <div class="card mx-2 my-2">
                <div class="card-img" style="background-image: url('${book.img}')">
                    
                </div>
                <div class="card-body">
                    <h5 class="card-title text-truncate">${book.title}</h5>       
                    <p class="card-text">Price: ${book.price}</p>
                    <button type="button" class="btn btn-primary" id="btnDelete">Delete</button>
                </div>
            </div>
            `
            //<img src="${book.img}" class="object-fit-cover img-fluid" alt="Copertina">
            
            const deleteCard = col.querySelector("#btnDelete")
            deleteCard.onclick = () => {
                col.remove();
            }

            grid.appendChild(col);
        })

    })
    .catch(error => console.log("CATCH", error))
