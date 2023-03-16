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
                    <button class="btn btn-primary" id="btnAddShopping" type="button" data-bs-toggle="offcanvas" data-bs-target="#cart" aria-controls="cart">
                        Add to shopping-cart
                    </button>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="cart" aria-labelledby="cartLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="cartLabel">Cart</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            
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
                const cart = document.querySelector("#cart .offcanvas-body");
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("card");
                cartItemDiv.innerHTML = `
                    
                        <div class="card-body">
                            <h5 class="card-title text-truncate">${cartItem.title}</h5>
                            <p class="card-text">${cartItem.price}</p>
                            <button type="button" class="btn btn-primary" id="removeItemsFromCart">Remove from cart</button>
                        </div>
                    `;

                cart.appendChild(cartItemDiv);

                // Aggiungi evento "click" a tutti i pulsanti "Remove from cart"
                const removeBtns = document.querySelectorAll("#cart .offcanvas-body .card #removeItemsFromCart");
                removeBtns.forEach((btn) => {
                    btn.onclick = () => {
                        let bookTitle = btn.closest(".card").querySelector(".card-title").innerText;
                        let cartItemIndex = shoppingCart.findIndex(item => item.title === bookTitle);
                        if (cartItemIndex > -1) {
                            shoppingCart.splice(cartItemIndex, 1);
                            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                            btn.closest(".card").remove();
                        }
                    };
                });

            }

            grid.appendChild(col);
        })
    })
    .catch(error => console.log("CATCH", error))
