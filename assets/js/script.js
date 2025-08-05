// Dom Elements
const customSelects = document.querySelectorAll('.custom-select');
const cardContainer = document.querySelector('#card-container');

function getCustomSelect() {
  // Custom select
  customSelects.forEach(select => {
    const button = select.querySelector('.select-btn');
    const dropdown = select.querySelector('.dropdown');
    const selectedText = select.querySelector('.selected-text');
    const options = dropdown.querySelectorAll('li');

    button.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });


    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.dataset.value;
        const label = option.textContent;

        selectedText.textContent = label;
        dropdown.classList.add('hidden');

        console.log("Seçilen dəyər:", value);
      });
    });

    document.addEventListener('click', (e) => {
      const clickedOutside = !select.contains(e.target);
      if (clickedOutside) {
        dropdown.classList.add('hidden');
      }
    });
  });

  const labels = document.querySelectorAll('div.flex label');

  labels.forEach(label => {
    label.addEventListener('click', () => {
      labels.forEach(item => item.classList.remove('active'));

      label.classList.add('active');
    });
  });
}



// Functions
function getCars() {
  let card = "";
  data.forEach((item) => {
    card +=
      `<li class="rounded-xl overflow-hidden shadow-md bg-white">
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
        <div id="wishlist-icon-${item.id}" onclick="addToWishlist(${item.id}, event)" class="absolute top-[5%] right-[5%] flex items-center gap-1">
           <i class="fa-regular fa-heart text-white text-[20px]"></i>
        </div>
    </a>

  <div class="p-4 space-y-2">
     <div class="text-xl font-semibold text-gray-800">${item.price} ${item.currency}</div>
     <div class="text-lg font-medium text-gray-700">${item.brand} ${item.model}</div>
     <div class="text-sm text-gray-500">${item.year} • ${item.engine} L • ${item.odometer} ${item.odometerUnit}</div>
     <div class="text-xs text-gray-400">${item.city} • bugün 20:25</div>
  </div>
</li>`;
  })
  cardContainer.innerHTML = card;
}

window.addEventListener("DOMContentLoaded", () => {
  data.forEach(car => {
    renderWishlistIcon(car.id);
  });
});


function addToWishlist(carId, e) {
  e.preventDefault();
const wishlistArr = JSON.parse(localStorage.getItem("wishlist") || "[]")

  const listedCar = data.find(item => item.id == carId)
  if (!listedCar) return;
  
  const exits = wishlistArr.some(item => item.id == listedCar.id)
  if (!exits) {
    wishlistArr.push(listedCar)
    localStorage.setItem("wishlist", JSON.stringify(wishlistArr))
  }
    renderWishlistIcon(carId);
}


function renderWishlistIcon(carId) {
const wishlistArr = JSON.parse(localStorage.getItem("wishlist") || "[]")

  const exists = wishlistArr.some(item => item.id == carId);

  const iconContainer = document.querySelector(`#wishlist-icon-${carId}`)
  if (!iconContainer) return;

  iconContainer.innerHTML = exists
    ? `<i class="fa-solid fa-heart text-[20px] text-red-500"></i>`
    : `<i class="fa-regular fa-heart text-white text-[20px]"></i>`;
}
// CALL FUNCTION
getCars()
getCustomSelect()
