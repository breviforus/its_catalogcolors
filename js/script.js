// slideCart

let cartIcon = document.querySelector('.header-personal-cart'),
    cartClose = document.querySelector('.close'),
    cart = document.querySelector('.cart'),
    back = document.querySelector('.backlayer')

function openCart() {
    cart.classList.add('show');
    cart.classList.remove('hide');
    back.classList.add('show');
    back.classList.remove('hide');
    document.body.style.overflow = 'hidden';

}

function closeCart() {

    cart.classList.remove('show');

    back.classList.remove('show');
    document.body.style.overflow = '';
}

cartIcon.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
back.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && cart.classList.contains('show')) {
        closeCart();
    }
});

// filter type

document.querySelector('.catalog-filters').addEventListener('click', e => {
    let items = document.querySelectorAll('.catalog-block-item');
    const filter = e.target.closest('.catalog-filters-btn');
    if (filter) {
        const isActive = filter.classList.contains('active');
        [...filter.parentNode.children].forEach(n => {
            if (n === filter && !isActive) {
                n.classList.add('active');

                let currentType = n.dataset.type;
                showType(currentType, items);
                console.log(items);
                console.log(currentType);
            }
            if (n === filter && isActive) {
                let currentType = n.dataset.type;
                n.classList.remove('active');
                hideType(currentType, items);
            }
        });


        function showType(type, items) {
            items.forEach(item => {
                const isItemFiltered = !item.classList.contains(type);
                if (isItemFiltered) {
                    item.classList.add('hidden');
                }
            })
        }

        function hideType(type, items) {
            items.forEach(item => {
                const isItemFiltered = !item.classList.contains(type);
                if (isItemFiltered) {
                    item.classList.remove('hidden');
                }
            })
        }

    }
});

// filters mobile

let btnFilterMobile = document.querySelector('.catalog-block-head-filter-mobile'),
    filterMobileWrapper = document.querySelector('.mobile-filters-wrapper');

function showMobileFilters() {
    filterMobileWrapper.classList.add('show');
    filterMobileWrapper.classList.remove('hide');
    back.classList.add('show');
    back.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function hideMobileFilters() {
    filterMobileWrapper.classList.add('hide');
    filterMobileWrapper.classList.remove('show');
    back.classList.add('hide');
    back.classList.remove('show');
    document.body.style.overflow = '';
}

btnFilterMobile.addEventListener('click', showMobileFilters);
back.addEventListener('click', hideMobileFilters);
filterMobileWrapper.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.dataset.type) {
        hideMobileFilters();
    }
});


document.querySelector('.catalog-filters-mobile').addEventListener('click', e => {
    let items = document.querySelectorAll('.catalog-block-item');
    const filter = e.target.closest('.catalog-filters-btn');
    if (filter) {
        const isActive = filter.classList.contains('active');
        [...filter.parentNode.children].forEach(n => {
            if (n === filter && !isActive) {
                n.classList.add('active');

                let currentType = n.dataset.type;
                showType(currentType, items);
                console.log(items);
                console.log(currentType);
            }
            if (n === filter && isActive) {
                let currentType = n.dataset.type;
                n.classList.remove('active');
                hideType(currentType, items);
            }
        });


        function showType(type, items) {
            items.forEach(item => {
                const isItemFiltered = !item.classList.contains(type);
                if (isItemFiltered) {
                    item.classList.add('hidden');
                }
            })
        }

        function hideType(type, items) {
            items.forEach(item => {
                const isItemFiltered = !item.classList.contains(type);
                if (isItemFiltered) {
                    item.classList.remove('hidden');
                }
            })
        }

    }
});





// filter sort

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');


selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');

    } else {
        selectSingle.setAttribute('data-state', 'active');
        back.classList.add('show');
        back.classList.remove('hide');
    }
});

for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
        back.classList.remove('show');
        back.classList.add('hide');
    });
}


document.querySelector('#price1').addEventListener('click', () => {
    sortListDesc('data-price');
});
document.querySelector('#price2').addEventListener('click', () => {
    sortList('data-price');
});
document.querySelector('#price3').addEventListener('click', () => {
    sortList('data-rating');
});
document.querySelector('#price4').addEventListener('click', () => {
    sortList('data-number');
});



function sortList(sortType) {
    let items = document.querySelector('.catalog-block-items');
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) > +items.children[j].getAttribute(sortType)) {
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}

function sortListDesc(sortType) {
    let items = document.querySelector('.catalog-block-items');
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) < +items.children[j].getAttribute(sortType)) {
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}


function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}


// Slider

let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.slide'),
    slider = document.querySelector('.slider'),
    prev = document.querySelector('.slider-prev'),
    next = document.querySelector('.slider-next'),
    slidesWrapper = document.querySelector('.slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.slider-inner');

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = [];
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
right: 0px;
bottom: 60px;
left: 0px;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 47%;
margin-left: 47%;
list-style: none;
background: rgba(0, 0, 0, 0.36);
border-radius: 16px;
padding: 5px;
    `;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 6px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 1;
    transition: opacity 0.6s ease 0s;
        `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

next.addEventListener('click', () => {
    if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }


    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;


        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });
});

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

// Cart

let btnAddToCard = document.querySelectorAll('.addtocart button'),
    cartProductsList = document.querySelector('.itemlist'),
    cartQuantity = document.querySelector('.cart-quantity'),
    cartInnerQuantity = document.querySelector('.items-quantity .quantity'),
    cartOpen = document.querySelector('.header-personal-cart'),
    totalPrice = document.querySelector('.total');
price = 0;


const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};


const printQuantity = () => {

    let productsListLength = document.querySelector('.itemlist').children.length;
    cartQuantity.textContent = productsListLength;
    cartInnerQuantity.textContent = productsListLength;
    if (productsListLength < 1) {
        document.querySelector('.itemend').textContent = 'ов';
    } else {
        document.querySelector('.itemend').textContent = 'а';
    }
};

const printFullPrice = () => {
    totalPrice.textContent = `${normalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id) => {
    return `
                            <div class="incart-item" data-id="${id}">
                            <div class="border"></div>
                            <div class="incart-item-inner">
                                <img src="${img}">
                                <div class="desc">
                                    <h3>${title}</h3>
                                    <span>${price}</span>
                                </div>
                                <div class="quantity-block">
                                    <button class="minus">-</button>
                                    <span>1</span>
                                    <button class="plus">+</button>
                                </div>
                                <div class="delete-item"></div>
                            </div>
                        </div>
	`;
};

const deleteProducts = (productParent) => {
    productParent.classList.add('disabled');
    productParent.querySelector('.delete-item').classList.add('repeat');
    productParent.querySelector('.repeat').classList.remove('delete-item');
    productParent.querySelector('.minus').disabled = true;
    productParent.querySelector('.plus').disabled = true;
    let quantity = parseInt(productParent.querySelector('.quantity-block span').innerHTML);
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.desc span').textContent)) * quantity;
    minusFullPrice(currentPrice);
    printFullPrice();
    printQuantity();
};

const repeatProducts = (productParent) => {
    productParent.classList.remove('disabled');
    productParent.querySelector('.repeat').classList.add('delete-item');
    productParent.querySelector('.delete-item').classList.remove('repeat');
    productParent.querySelector('.minus').disabled = false;
    productParent.querySelector('.plus').disabled = false;
    let quantity = parseInt(productParent.querySelector('.quantity-block span').innerHTML);
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.desc span').textContent)) * quantity;
    plusFullPrice(currentPrice);
    printFullPrice();
    printQuantity();
};

const clearCartBtn = document.querySelector('.items-clear');
clearCartBtn.addEventListener('click', () => {
    document.querySelectorAll('.addtocart button').disabled = false;
    let product = document.querySelectorAll('.incart-item');
    product.forEach(item => {
        let id = item.dataset.id;
        totalPrice.textContent = `0 ₽`;
        document.querySelector(`.catalog-block-item[data-id="${id}"]`).querySelector('.addtocart button').disabled = false;
        price = 0;
        item.remove();
        printQuantity();
    });
});


btnAddToCard.forEach(el => {
    el.closest('.catalog-block-item').setAttribute('data-id', randomId());

    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.catalog-block-item');
        let id = parent.dataset.id;
        let img = parent.querySelector('.catalog-block-item img').getAttribute('src');
        let title = parent.querySelector('.catalog-block-item .title').textContent;
        let priceString = priceWithoutSpaces(parent.querySelector('.price span').textContent);
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.price span').textContent));

        plusFullPrice(priceNumber);

        printFullPrice();

        document.querySelector('.itemlist').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
        printQuantity();
        self.disabled = true;
    });
});



cartProductsList.addEventListener('click', (e) => {

    if (e.target.classList.contains('minus')) {
        console.log(e.target.closest('.incart-item').dataset.id);
        minusProductQuantity(e.target.closest('.incart-item'));
    }
    if (e.target.classList.contains('plus')) {
        console.log(e.target.closest('.incart-item').dataset.id);
        plusProductQuantity(e.target.closest('.incart-item'));
    }
    if (e.target.classList.contains('delete-item')) {
        deleteProducts(e.target.closest('.incart-item'));
    }
    if (e.target.classList.contains('repeat')) {
        repeatProducts(e.target.closest('.incart-item'));
    }

});


const plusProductQuantity = (productParent) => {
    let id = productParent.dataset.id;
    let quantity = parseInt(productParent.querySelector('.quantity-block span').innerHTML);
    quantity + 1;
    productParent.querySelector('.quantity-block span').innerHTML = quantity + 1;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.desc span').textContent));
    plusFullPrice(currentPrice);
    printFullPrice();
};

const minusProductQuantity = (productParent) => {
    let id = productParent.dataset.id;
    let quantity = parseInt(productParent.querySelector('.quantity-block span').innerHTML);
    quantity - 1;
    productParent.querySelector('.quantity-block span').innerHTML = quantity - 1;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.desc span').textContent));

    if (productParent.querySelector('.quantity-block span').innerHTML == 0) {
        document.querySelector(`.catalog-block-item[data-id="${id}"]`).querySelector('.addtocart button').disabled = false;
        productParent.remove();
        printQuantity();
        minusFullPrice(currentPrice);
        printFullPrice();
    } else {
        minusFullPrice(currentPrice);
        printFullPrice();

    }
};

// hoverimg

function createHoverImage() {
    document.querySelectorAll('[data-hover]').forEach((img) => {
        const src = img.getAttribute('src');
        const srcH = img.getAttribute('data-hover');

        img.addEventListener('mouseover', () => { img.src = srcH; })
        img.addEventListener('mouseout', () => { img.src = src; })
    });
}

createHoverImage();