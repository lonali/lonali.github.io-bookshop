let bshop = document.getElementById('bshop');

let cart = JSON.parse(localStorage.getItem("data")) || [];


let generateBShop = () => {
    return (bshop.innerHTML = bshopItemsData.map((x) => {
        let { id, name, author, price, desc, img } = x;
        let search = cart.find((x) => x.id === id) || [];
        return `
        <div id=book-id-${id} class="item">
                <img width="235" src=${img} alt="">
                <div class="description">
                    <h3>${name}</h3>
                    <h5>Author: ${author}</h5>
                    <p> ${desc}</p>
                    <div class="price-orderN">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <img onclick="increment(${id})" width="25px" src="./images/plus-icon.png">
                            <div id=${id} class="orderN">
                            ${search.item === undefined ? 0 : search.item}
                            </div>
                            <img onclick="decrement(${id})" width="25px" src="./images/minus-icon.png">
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
        .join(""));
};

generateBShop();

let increment = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    updateNumber(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(cart));

};

let decrement = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    updateNumber(selectedItem.id);
    cart = cart.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(cart));

};

let updateNumber = (id) => {
    let search = cart.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();