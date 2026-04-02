let bikes = [];
let filteredBikes = [];
let visibleCount = 8;

/* ================= DOM REFERENCES ================= */
const typeContainer = document.getElementById("typeFilter");
const brandContainer = document.getElementById("brandFilter");
const colourContainer = document.getElementById("colourFilter");
const yearFilter = document.getElementById("yearFilter");
const sortOption = document.getElementById("sortOption");

const minPriceRange = document.getElementById("minPriceRange");
const maxPriceRange = document.getElementById("maxPriceRange");
const priceMinLabel = document.getElementById("priceMinLabel");
const priceMaxLabel = document.getElementById("priceMaxLabel");

const bikeList = document.getElementById("bikeList");
const loadMoreBtn = document.getElementById("loadMoreBtn");

/* ================= MANUAL FILTER VALUES ================= */

const vehicleTypes = ["Bike", "Scooty", "E-Bike"];
const brandsList = ["Honda", "Yamaha", "TVS", "Bajaj", "Hero"];
const coloursList = ["Black", "Red", "Blue", "White", "Grey"];
const yearsList = [2024, 2023, 2022, 2021, 2020, 2019];

/* ================= FETCH DATA ================= */

fetch("vehicles.json")
  .then(res => res.json())
  .then(data => {

    bikes = data.filter(bike =>
      bike.vehicle_availability === "Available" &&
      bike.website_visibility === true
    );

    filteredBikes = bikes;

    populateFilters();
    initPriceSlider();
    renderBikes();
  });

/* ================= POPULATE FILTERS ================= */

function populateFilters() {

  vehicleTypes.forEach(type => {
    typeContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" value="${type}" class="typeCheck accent-blue-500">
        ${type}
      </label>`;
  });

  brandsList.forEach(brand => {
    brandContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" value="${brand}" class="brandCheck accent-blue-500">
        ${brand}
      </label>`;
  });

  coloursList.forEach(colour => {
    colourContainer.innerHTML += `
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" value="${colour}" class="colourCheck accent-blue-500">
        ${colour}
      </label>`;
  });

  yearsList.forEach(year => {
    yearFilter.innerHTML += `<option value="${year}">${year}</option>`;
  });

  document.addEventListener("change", applyFilters);
}

/* ================= PRICE SLIDER ================= */

function initPriceSlider() {

  minPriceRange.value = minPriceRange.min;
  maxPriceRange.value = maxPriceRange.max;

  updatePriceLabels();

  minPriceRange.addEventListener("input", handleSlider);
  maxPriceRange.addEventListener("input", handleSlider);
}

function handleSlider() {
  if (+minPriceRange.value > +maxPriceRange.value) {
    minPriceRange.value = maxPriceRange.value;
  }
  updatePriceLabels();
  applyFilters();
}

function updatePriceLabels() {
  priceMinLabel.innerText = "₹ " + Number(minPriceRange.value).toLocaleString();
  priceMaxLabel.innerText = "₹ " + Number(maxPriceRange.value).toLocaleString();
}

/* ================= APPLY FILTERS ================= */

function applyFilters() {

  visibleCount = 8;

  const selectedTypes = [...document.querySelectorAll(".typeCheck:checked")].map(el => el.value);
  const selectedBrands = [...document.querySelectorAll(".brandCheck:checked")].map(el => el.value);
  const selectedColours = [...document.querySelectorAll(".colourCheck:checked")].map(el => el.value);

  const selectedYear = yearFilter.value;
  const minPrice = parseInt(minPriceRange.value);
  const maxPrice = parseInt(maxPriceRange.value);

  filteredBikes = bikes.filter(bike =>
    (selectedTypes.length === 0 || selectedTypes.includes(bike.vehicle_type)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(bike.vehicle_brand)) &&
    (selectedColours.length === 0 || selectedColours.includes(bike.vehicle_colour)) &&
    (selectedYear === "" || bike.vehicle_model_year == selectedYear) &&
    bike.vehicle_selling_price >= minPrice &&
    bike.vehicle_selling_price <= maxPrice
  );

  sortVehicles();
  renderBikes();
}

/* ================= SORT ================= */

function sortVehicles() {

  if (sortOption.value === "priceLow")
    filteredBikes.sort((a,b)=>a.vehicle_selling_price-b.vehicle_selling_price);

  if (sortOption.value === "priceHigh")
    filteredBikes.sort((a,b)=>b.vehicle_selling_price-a.vehicle_selling_price);

  if (sortOption.value === "yearNew")
    filteredBikes.sort((a,b)=>b.vehicle_model_year-a.vehicle_model_year);

  if (sortOption.value === "yearOld")
    filteredBikes.sort((a,b)=>a.vehicle_model_year-b.vehicle_model_year);
}

/* ================= RENDER ================= */

function renderBikes() {

  bikeList.innerHTML = "";

  const visibleBikes = filteredBikes.slice(0, visibleCount);

  if (visibleBikes.length === 0) {
    bikeList.innerHTML = "<h2>No Vehicles Found</h2>";
    loadMoreBtn.classList.add("hidden");
    return;
  }

  visibleBikes.forEach(bike => {
    bikeList.innerHTML += `
      <div class="bg-[#081740] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
        <img src="${bike.vehicle_image}" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-bold">${bike.vehicle_brand} ${bike.vehicle_model}</h3>
          <p>Type: ${bike.vehicle_type}</p>
          <p>Year: ${bike.vehicle_model_year}</p>
          <p class="text-xl font-semibold">
            ₹ ${bike.vehicle_selling_price.toLocaleString()}
          </p>
        </div>
      </div>`;
  });

  loadMoreBtn.classList.toggle("hidden", visibleCount >= filteredBikes.length);
}

/* ================= LOAD MORE ================= */

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 8;
  renderBikes();
});