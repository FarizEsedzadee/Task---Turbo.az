const wishlistCards = document.querySelector('#wishlist-card-container');


function getWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let car = "";
    wishlist.forEach(item => {
        car += `<li class="rounded-xl overflow-hidden shadow-md bg-white">
    <a href="#" target="_blank" class="relative">
        <img src="${item.images}" alt="${item.brand} ${item.model}"
             class="w-full h-48 object-cover" loading="lazy" />
        <div class="absolute top-[5%] left-[5%] flex items-center gap-1">

            ${item.barter ? `
            <div class="relative group">
                <span class="bg-[#76c81c] rounded-full p-[6px] text-white flex items-center justify-center">
                    <i class="fa-solid fa-rotate inline-block text-[10px]"></i>
                </span>
                <div class="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-[#76c81c] text-white text-[10px] font-bold px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                    Barter mümkündür
                </div>
            </div>
            ` : ''}
            
            ${item.credit ? `
            <div class="relative group">
                <span class="bg-[#f5a623] rounded-full p-[6px] text-white flex items-center justify-center">
                    <i class="fa-solid fa-percent inline-block text-[10px]"></i>
                </span>
                <div class="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-[#f5a623] text-white text-[10px] font-bold px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                    Kreditdədir
                </div>
            </div>
            ` : ''}
            
        </div>
        <div onclick="removeFromWishlist(${item.id}, event)" class="absolute top-[5%] right-[5%] flex items-center gap-1">
            <i class="fa-solid fa-heart text-[20px] text-red-500"></i>
        </div>
    </a>

  <div class="p-4 space-y-2">
     <div class="text-xl font-semibold text-gray-800">${item.price} ${item.currency}</div>
     <div class="text-lg font-medium text-gray-700">${item.brand} ${item.model}</div>
     <div class="text-sm text-gray-500">${item.year} • ${item.engine} L • ${item.odometer} ${item.odometerUnit}</div>
     <div class="text-xs text-gray-400">${item.city} • bugün 20:25</div>
  </div>
</li>`
    })
    wishlistCards.innerHTML = car;
}


function removeFromWishlist(carId, e) {
    e.preventDefault()
    let wishlistArr = JSON.parse(localStorage.getItem("wishlist") || JSON.parse("[]"))
    const index = wishlistArr.findIndex(item => item.id == carId)

    if (index !== -1) {
        wishlistArr.splice(index, 1)
        localStorage.setItem("wishlist", JSON.stringify(wishlistArr))
    }
    checkWishlist()
    getWishlist()
}

function clearWishlist() {
    localStorage.setItem("wishlist", JSON.stringify([]))
    checkWishlist()
    getWishlist()
}

const clearBtn = document.querySelector('#clear-button')
const noSearch = document.querySelector('#noSearch')
function checkWishlist() {
    let wishlistArr = JSON.parse(localStorage.getItem("wishlist") || JSON.parse("[]"))

    if (wishlistArr.length === 0) {
        clearBtn.style.display = "none"
        noSearch.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center text-gray-600">
    <div class="bg-gray-100 p-6 rounded-full mb-6">
      <i class="fa-regular fa-heart text-5xl text-red-400"></i>
    </div>
    <h2 class="text-2xl font-semibold mb-2">Favoritlər siyahın boşdur</h2>
    <p class="text-sm text-gray-500 max-w-md mb-6">
      Bəyəndiyin maşınları favoritə əlavə edərək daha sonra rahatlıqla tapa bilərsən.
    </p>
    <a href="/" class="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-6 py-2 rounded transition duration-200">
      Elanlara bax
    </a>
  </div>
        `;

    }
    else {
        clearBtn.style.display = "block"
    }
}
checkWishlist()
getWishlist()