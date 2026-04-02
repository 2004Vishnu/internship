let bikes = [];
let filteredBikes = [];
let visibleCount = 9;

fetch("vehicles.json")
  .then(res => res.json())
  .then(data => {

    bikes = data.filter(bike =>
      bike.vehicle_availability === "Available" &&
      bike.website_visibility === true
    );

    populateFilters();
    applyFilters(); 
  });

function populateFilters() {

  const types = [...new Set(bikes.map(b => b.vehicle_type))];
  const brands = [...new Set(bikes.map(b => b.vehicle_brand))];
  const colours = [...new Set(bikes.map(b => b.vehicle_colour))];
  const years = [...new Set(bikes.map(b => b.vehicle_model_year))]
                .sort((a,b)=>b-a);

  const typeContainer = document.getElementById("typeFilter");
  const brandContainer = document.getElementById("brandFilter");
  const colourContainer = document.getElementById("colourFilter");
  const yearSelect = document.getElementById("yearFilter");

  // VEHICLE TYPE
  types.forEach(type => {
    typeContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer text-[var(--secondary)]">
        <input type="checkbox" value="${type}" class="typeCheck accent-blue-500">
        ${type}
      </label>
    `;
  });

  // BRAND
  brands.forEach(brand => {
    brandContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" value="${brand}" class="brandCheck accent-blue-500">
        ${brand}
      </label>
    `;
  });

  // COLOUR
  colours.forEach(colour => {
    colourContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" value="${colour}" class="colourCheck accent-blue-500">
        ${colour}
      </label>
    `;
  });

  // YEAR
  years.forEach(year => {
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  });

  // PRICE 
  minPriceRange.value = minPriceRange.min;
  maxPriceRange.value = maxPriceRange.max;

  updatePriceLabels();

  minPriceRange.addEventListener("input", handleSlider);
  maxPriceRange.addEventListener("input", handleSlider);

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", applyFilters);
  });
}

function handleSlider() {
  if (+minPriceRange.value > +maxPriceRange.value) {
    minPriceRange.value = maxPriceRange.value;
  }
  updatePriceLabels();
  applyFilters();
}

function updatePriceLabels() {
  priceMinLabel.innerText =
    "₹ " + Number(minPriceRange.value).toLocaleString();

  priceMaxLabel.innerText =
    "₹ " + Number(maxPriceRange.value).toLocaleString();
}

function applyFilters() {

  visibleCount = 9; 

  const selectedTypes = Array.from(
    document.querySelectorAll(".typeCheck:checked")
  ).map(el => el.value);

  const selectedBrands = Array.from(
    document.querySelectorAll(".brandCheck:checked")
  ).map(el => el.value);

  const selectedColours = Array.from(
    document.querySelectorAll(".colourCheck:checked")
  ).map(el => el.value);

  const selectedYear = document.getElementById("yearFilter").value;
  const sortOption = document.getElementById("sortOption").value;

  const minPriceSelected = parseInt(minPriceRange.value);
  const maxPriceSelected = parseInt(maxPriceRange.value);

  filteredBikes = bikes.filter(bike =>
    (selectedTypes.length === 0 || selectedTypes.includes(bike.vehicle_type)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(bike.vehicle_brand)) &&
    (selectedColours.length === 0 || selectedColours.includes(bike.vehicle_colour)) &&
    (selectedYear === "" || bike.vehicle_model_year == selectedYear) &&
    bike.vehicle_selling_price >= minPriceSelected &&
    bike.vehicle_selling_price <= maxPriceSelected
  );

  // SORTING
  if (sortOption === "priceLow")
    filteredBikes.sort((a,b)=>a.vehicle_selling_price-b.vehicle_selling_price);

  if (sortOption === "priceHigh")
    filteredBikes.sort((a,b)=>b.vehicle_selling_price-a.vehicle_selling_price);

  if (sortOption === "yearNew")
    filteredBikes.sort((a,b)=>b.vehicle_model_year-a.vehicle_model_year);

  if (sortOption === "yearOld")
    filteredBikes.sort((a,b)=>a.vehicle_model_year-b.vehicle_model_year);

  renderBikes();
}

function renderBikes() {

  const bikeList = document.getElementById("bikeList");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  bikeList.innerHTML = "";

  const visibleBikes = filteredBikes.slice(0, visibleCount);

  if (visibleBikes.length === 0) {
    bikeList.innerHTML = "<h2>No Vehicles Found</h2>";
    loadMoreBtn.classList.add("hidden");
    return;
  }

  visibleBikes.forEach(bike => {
    bikeList.innerHTML +=`
<div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
  <div class="relative">
    <img src="${bike.vehicle_image}" 
         class="w-full h-52 object-cover">
    <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
      RERIDE CERTIFIED
    </span>
    <button class="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
      <i data-lucide="heart" class="w-4 h-4 text-gray-600"></i>
    </button>
  </div>
  <div class="p-4 space-y-3">
    <div class="flex justify-between items-start">
      <h3 class="text-lg font-semibold text-gray-800 leading-tight">
        ${bike.vehicle_brand} ${bike.vehicle_model}
      </h3>

      <div class="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-medium">
        ${bike.vehicle_rating}
        <i data-lucide="star" class="w-4 h-4 fill-green-600"></i>
      </div>
    </div>
    <div class="flex items-center gap-4 text-sm text-gray-500">
      <div class="flex items-center gap-1">
        <i data-lucide="calendar" class="w-4 h-4"></i>
        ${bike.vehicle_model_year}
      </div>
      <div class="flex items-center gap-1">
        <i data-lucide="gauge" class="w-4 h-4"></i>
        ${bike.vehicle_mileage} km
      </div>

      <div class="flex items-center gap-1">
        <i data-lucide="fuel" class="w-4 h-4"></i>
        ${bike.vehicle_fuel}
      </div>

    </div>
    <div class="flex justify-between items-center pt-2 border-t">

      <div>
        <p class="text-xs text-gray-400">Fixed Price</p>
        <p class="text-xl font-bold text-gray-900">
          ₹ ${bike.vehicle_selling_price.toLocaleString()}
        </p>
      </div>

      <button class="border border-gray-400 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
        View
      </button>

    </div>

  </div>
</div>
`;
  });

    lucide.createIcons();

  loadMoreBtn.classList.toggle(
    "hidden",
    visibleCount >= filteredBikes.length
  );
}

// LOAD MORE
document.getElementById("loadMoreBtn")
  .addEventListener("click", () => {
    visibleCount += 3;
    renderBikes();
  });