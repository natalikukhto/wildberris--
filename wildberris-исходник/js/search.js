const search = function () {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = '';

        goods.forEach(good => {
            const goodBlock = document.createElement('div');

            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');

            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                    <img src="db/${good.img}" alt="${good.name}" class="goods-image">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                        <span class="button-price">$${good.price}</span>
                    </button>
                </div>
            `;
            goodsContainer.append(goodBlock);
            // console.log(good);
        })
    }

    const getData = (value) => {
        //fetch('./db/db.json')
        fetch('/wildberris--/wildberris-исходник/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                // console.log('data: ', data);

                const array = data.filter((good) => {
                    return good.name.toLowerCase().includes(value.toLowerCase());
                });


                /*if (category) {
                    console.log('yes');
                } else {
                    console.log('no');
                }
                category ? console.log('yes') : console.log('no');*/

                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== "/wildberris--/wildberris-исходник/goods.html") {
                    window.location.href = "/wildberris--/wildberris-исходник/goods.html";

                } else (
                    renderGoods(array)
                )

                //console.log(window.location);
            });
    };

    searchBtn.addEventListener('click', () => {
        //console.log(input.value);
        getData(input.value);
    })


}
search();