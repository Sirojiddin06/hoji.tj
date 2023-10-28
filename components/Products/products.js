class Products {

    constructor(){
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }


    handleSetLocationStorage(element, id){
        const {pushProduct, products} = localStorageUtil.putProducts(id);

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
            
        }else{
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }


        headerPage.render(products.length);
        // console.log(element, id);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        CATALOG.forEach(({ id, name, price, img, imgg, imggg}) => {
            let activeClass = '';
            let activeText = '';
            
            if (productsStore.indexOf(id) === -1){
                activeText = this.labelAdd
            }else{
                activeClass = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }



            htmlCatalog += `
            <li class="products-element">
            <span class="products-element__name">${name}</span>
            <div class="container">
            <div class="wrapper">
            <div class="wrapper-holder">
            <img src="${img}" class="products-element__img">
            <img src="${imgg}" class="products-element__img">
            <img src="${imggg}" class="products-element__img">
            </div>
            </div>
            </div>
            <span class="products-element__price">⚡${price.toLocaleString()} TJS</span>
            <button class="products-element__btn${activeClass}" onclick ="productsPage.handleSetLocationStorage(this, '${id}')">
            ${activeText}
            </button>
            </li>

            `;
        });
        const html = `
        <ul class="products-container">${htmlCatalog}</ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;


    }
}


const productsPage = new Products();

productsPage.render();

// 9 urok.