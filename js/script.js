let shoppingCart = [];

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
                    <h5 class="card-title text-truncate" id="book-title">${book.title}</h5>       
                    <p class="card-text" id="book-price">Price: ${book.price}</p>
                    <button type="button" class="btn btn-primary" id="btnDelete">Delete</button>
                    <button class="btn btn-primary" id="btnAddShopping" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Add to shopping-cart
                    </button>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div>
                                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                            </div>
                            <div class="dropdown mt-3">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Dropdown button
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            
            const deleteCard = col.querySelector("#btnDelete")
            deleteCard.onclick = () => {
                col.remove();
            }
            const addShopping = col.querySelector("#btnAddShopping")
            addShopping.onclick = () => {
                let bookTitle = addShopping.closest(".card-body").querySelector("#book-title").innerText;
                let bookPrice = addShopping.closest(".card-body").querySelector("#book-price").innerText;
                let cartItem = { title: bookTitle, price: bookPrice };
                shoppingCart.push(cartItem);
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            }

            grid.appendChild(col);
        })

    })
    .catch(error => console.log("CATCH", error))
