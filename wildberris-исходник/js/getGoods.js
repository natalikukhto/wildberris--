const getGoods = () => {

    const links = document.querySelectorAll('.navigation-link');
    const more = document.querySelector('.more');


    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = '';

        goods.forEach((good) => {
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
            //console.log(good);
        })
    }

    const getData = (value, category) => {
        //fetch('./db/db.json')
        fetch('/wildberris--/wildberris-исходник/db/db.json')

            //fetch("https://berry-bf3fb-default-rtdb.asia-southeast1.firebasedatabase.app/db.json")

            .then((res) => res.json())
            .then((data) => {
                // console.log('data: ', data);

                const array = category ? data.filter((item) => item[category] === value) : data;

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

                console.log(window.location);
            });
    };
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkValue = link.textContent;
            const category = link.dataset.field;
            console.log(category);
            getData(linkValue, category);
        });
    });
    if (localStorage.getItem('goods') &&
        //window.location.pathname === "/wildberris--/wildberris-исходник/goods.html") {
        window.location.pathname === "/wildberris--/wildberris-%D0%B8%D1%81%D1%85%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA/goods.html") {
        renderGoods(JSON.parse(localStorage.getItem('goods')));

    }

    if (more) {
        more.addEventListener('click', (event) => {
            event.preventDefault();
            getData();
        });
    }

};

getGoods();