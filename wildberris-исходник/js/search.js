const search = function () {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    searchBtn.addEventListener('click', () => {
        input.addEventListener('input', (event) => {
            return event.target.value;
        })
        console.log(input.value);
    })
}
search();