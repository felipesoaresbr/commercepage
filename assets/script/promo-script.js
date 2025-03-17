document.addEventListener('contentLoaded', () => {
    const currentlyCartAmount = document.querySelector('.cartAmount');

    let cartAmount = parseInt(localStorage.getItem('amount')) || 0;
    
    // Atualiza o valor inicial do cartAmount
    currentlyCartAmount.textContent = cartAmount;

    
    function main() {
        const favoriteButtons = document.querySelectorAll('.favorite-button');
        const containerContent = document.querySelector('.products-container-content');
        let prices = document.querySelectorAll('.current-price');
        let storagePrices = [];
    
        favoriteButtons.forEach(favoriteButton => {
            let currentSrc = favoriteButton.src.split('/').pop();
    
            favoriteButton.addEventListener('click', () => {
                if (currentSrc === 'heart.svg') {
                    favoriteButton.src = './assets/icons/heart-fill.svg';
                    currentSrc = 'heart-fill.svg';
                } else {
                    favoriteButton.src = './assets/icons/heart.svg';
                    currentSrc = 'heart.svg';
                }
            });
        });
    
        const addToCartButtons = document.querySelectorAll('.add-cart-button');
        const articles = document.querySelectorAll('.product-item');
    
        addToCartButtons.forEach((addToCart, index) => {
            let currentSrc = addToCart.src.split('/').pop();
    
            addToCart.addEventListener('click', () => {
                if (currentSrc === 'cart-plus.svg') {
                    addToCart.src = './assets/icons/cart-check-fill.svg';
                    currentSrc = 'cart-check-fill.svg';
                    cartAmount++;
    
                    if (cartAmount <= 6) {
                        const price = prices[index].textContent;
                        storagePrices.push(price);
    
                        localStorage.setItem('prices', JSON.stringify(storagePrices));
                    }
                } else if (cartAmount <= 0) {
                    return;
                } else {
                    addToCart.src = './assets/icons/cart-plus.svg';
                    currentSrc = 'cart-plus.svg';
                    cartAmount--;
    
                    storagePrices.splice(index, 1);
                    localStorage.setItem('prices', JSON.stringify(storagePrices));
                }
    
                localStorage.setItem('amount', cartAmount);
    
                currentlyCartAmount.textContent = cartAmount;
            });
        });
    
    
        function setTimer() {
            let hours = 23;
            let minutes = 59;
            let seconds = 59;

            const timerDisplay = document.getElementById('timer')

            function formatTimer(unit) {
                return unit < 10 ? '0' + unit : unit;
            }

            function updateTimer() {
                timerDisplay.textContent = `${formatTimer(hours)}:${formatTimer(minutes)}:${formatTimer(seconds)}`

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            clearInterval(timerInterval)
                        }
                    }
                }
            }
            const timerInterval = setInterval(updateTimer, 1000);

            updateTimer();
        }
        setTimer();

        function articleLength() {
            containerContent.style.gridTemplateColumns = `repeat(${articles.length}, 300px)`;
        }

        function containerScroller() {
            const scrollLeftArrow = document.getElementById('left-arrow');
            const scrollRightArrow = document.getElementById('right-arrow');

            function updateArrowState() {
                if (containerContent.scrollLeft === 0) {
                    scrollLeftArrow.style.opacity = 0;
                    scrollLeftArrow.style.pointerEvents = 'none';
                } else {
                    scrollLeftArrow.style.opacity = 1;
                    scrollLeftArrow.style.pointerEvents = 'auto';
                }

                if (containerContent.scrollLeft + containerContent.offsetWidth >= containerContent.scrollWidth) {
                    scrollRightArrow.style.opacity = 0;
                    scrollRightArrow.style.pointerEvents = 'none';
                } else {
                    scrollRightArrow.style.opacity = 1;
                    scrollRightArrow.style.pointerEvents = 'auto';
                }
            }

            containerContent.addEventListener('scroll', updateArrowState);

            updateArrowState();


            scrollRightArrow.addEventListener('click', function () {
                const itemWidth = 300;
                const scrollAmount = itemWidth + 20;

                containerContent.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });

                updateArrowState();
            })

            scrollLeftArrow.addEventListener('click', function () {
                const itemWidth = 300;
                const scrollAmount = itemWidth + 20;

                containerContent.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
                updateArrowState();
            })

            updateArrowState();
        }

        containerScroller();


        function updatePrices() {
            function randomizePrice() {
                const min = 9.99;
                const max = 1199.99;
                return Math.floor((Math.random() * (max - min) + min) * 100) / 100;
            }

            function randomizeDiscont() {
                const min = 40;
                const max = 90;
                return Math.floor(Math.random() * (max - min) + min);
            }

            function formatPriceToBRL(value) {
                return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            }

            const currentPrices = document.querySelectorAll('.current-price');
            const discounts = document.querySelectorAll('.product-discont');
            const originalPriceValues = document.querySelectorAll('.original-price-value');

            currentPrices.forEach((currentPriceElement, index) => {
                const originalPrice = randomizePrice();

                const discountPercentage = randomizeDiscont();

                const discountedPrice = originalPrice * (1 - discountPercentage / 100);

                currentPriceElement.textContent = formatPriceToBRL(discountedPrice);
                originalPriceValues[index].textContent = formatPriceToBRL(originalPrice);
                discounts[index].textContent = `-${discountPercentage}%`;
            });
        }

        updatePrices();

        function updateStock() {

            function randomizeAmount() {
                const min = 0;
                const max = 79;

                return Math.floor(Math.random() * (max - min) + min)
            }

            const stocks = document.querySelectorAll('.product-stock');
            const unformatedAmounts = document.querySelectorAll('.product-amount');

            unformatedAmounts.forEach((unformatedAmount, index) => {
                const newAmount = randomizeAmount();
                unformatedAmount.textContent = `${newAmount} UNIDADES`

                let formatedAmount = Number(unformatedAmount.textContent.split(' ').shift());

                if (formatedAmount <= 0) {
                    stocks[index].textContent = 'ESGOTADO';
                    favoriteButtons[index].style.opacity = '0';
                    favoriteButtons[index].style.pointerEvents = 'none';
                    addToCartButtons[index].style.opacity = '0';
                    addToCartButtons[index].style.pointerEvents = 'none';
                }
            });
        }

        updateStock();

        function updateRating() {
            function randomizeRating() {
                const min = 1;
                const max = 5;
                let randomFloat = (Math.random() * (max - min) + min);
                return Math.round(randomFloat * 10) / 10;
            }

            const ratingContainers = document.querySelectorAll('.product-rating');

            ratingContainers.forEach(container => {
                const ratingStats = container.querySelector('.rating-stats')
                const emptyStars = container.querySelectorAll('.rating-star');

                const randomRating = randomizeRating();

                const fullStars = Math.floor(randomRating);
                const hasHalfStar = randomRating % 1 >= 0.5; // 

                ratingStats.textContent = randomRating


                emptyStars.forEach((star, index) => {
                    if (index < fullStars) {
                        star.src = './assets/icons/star-fill.svg';
                    } else if (index === fullStars && hasHalfStar) {
                        star.src = './assets/icons/star-half.svg';
                    } else {
                        star.src = './assets/icons/star.svg';
                    }
                });
            })

        }

        updateRating();

        function getRatingValues() {
            const ratingValues = document.querySelectorAll('.rating-value')

            function randomizeValues() {
                const min = 30;
                const max = 150;

                return Math.floor(Math.random() * (min - max) + max)
            }

            ratingValues.forEach(ratingValues => {
                ratingValues.textContent = "(" + `${randomizeValues()}` + ")";
            })
        }

        getRatingValues();


        if (window.innerWidth > 500) {
            articleLength();
        }

    }
    main();
})
