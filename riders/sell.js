let BRANDS      = [];
let COLOURS     = [];
let BRANCHES    = [];
let allModels   = [];
let brandModels = {};

const BRAND_ABBR = {
  "TVS":           "TVS",
  "Bajaj":         "BAJAJ",
  "Royal Enfield": "RE",
  "Hero":          "HERO",
  "Honda":         "HONDA",
  "Yamaha":        "YAMAHA",
  "Suzuki":        "SUZUKI",
  "KTM":           "KTM",
  "Kawasaki":      "KAWA",
  "Ola":           "OLA",
  "Ather":         "ATH",
  "Ultraviolette": "UV",
  "Revolt":        "RVT",
  "Tork":          "TRK",
  "Oben":          "OBN",
  "Jawa":          "JAWA",
  "Vespa":         "VESPA",
};


const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR   = 2006;
const totalSteps   = 10;

let currentStep  = 1;
let isProcessing = false; 

document.addEventListener("DOMContentLoaded", () => {

  const banner     = document.getElementById("sellBanner");
  const wizard     = document.getElementById("sellWizard");
  const startBtn   = document.getElementById("startSellBtn");
  const backBtn    = document.getElementById("backBtn");
  const stepNumber = document.getElementById("stepNumber");
  const stepBtns   = document.querySelectorAll(".step-btn");

  fetch("vehicles.json")
    .then(res => res.json())
    .then(data => {
      BRANDS   = [...new Set(data.map(v => v.vehicle_brand).filter(Boolean))].sort();
      COLOURS  = [...new Set(data.map(v => v.vehicle_colour).filter(Boolean))].sort();
      BRANCHES = [...new Set(data.map(v => v.vehicle_inspection_branch).filter(Boolean))].sort();
      allModels = [...new Set(data.map(v => v.vehicle_model).filter(Boolean))].sort();

      data.forEach(v => {
        if (!v.vehicle_brand || !v.vehicle_model) return;
        if (!brandModels[v.vehicle_brand]) brandModels[v.vehicle_brand] = new Set();
        brandModels[v.vehicle_brand].add(v.vehicle_model);
      });
      Object.keys(brandModels).forEach(b => {
        brandModels[b] = [...brandModels[b]].sort();
      });

      buildBrandGrid();
      buildYearGrid();
      buildColourList();
      buildInspectionBranches();
      setupTypeOptions();
      setupOwnerOptions();
      lucide.createIcons();
    })
    .catch(() => {
      BRANDS   = ["Ather","Bajaj","Honda","KTM","Ola","Oben","Revolt","Royal Enfield","Suzuki","Tork","TVS","Ultraviolette","Yamaha"];
      COLOURS  = ["Black","Blue","Grey","Red","White"];
      BRANCHES = ["Bengaluru Central","Bengaluru East","Bengaluru North","Bengaluru West"];
      allModels = ["Apache RR 310","Apache RTR 160","Classic 350","Dominar 400","Duke 200","FZ-S","Meteor 350","NTorq 125","Pulsar 150","RV400"];
      brandModels = { "TVS": ["Apache RR 310","Apache RTR 160"], "Bajaj": ["Dominar 400","Pulsar 150"], "KTM": ["Duke 200"] };

      buildBrandGrid();
      buildYearGrid();
      buildColourList();
      buildInspectionBranches();
      setupTypeOptions();
      setupOwnerOptions();
      lucide.createIcons();
    });

  // ── BRAND GRID (Step 1) ──
  function buildBrandGrid() {
    const grid = document.getElementById("brandGrid");
    if (!grid) return;
    grid.innerHTML = "";

    BRANDS.forEach(brand => {
      const abbr = BRAND_ABBR[brand] || brand.substring(0, 4).toUpperCase();
      const card = document.createElement("div");
      card.className = "option flex flex-col items-center justify-center border-2 border-gray-200 rounded-2xl py-6 px-4 cursor-pointer hover:border-[var(--secondary)] transition-all";
      card.dataset.value = brand;
      card.innerHTML = `
        <span class="text-[var(--secondary)] bg-blue-50 font-bold text-sm px-3 py-1 rounded-lg mb-3">${abbr}</span>
        <p class="text-base font-semibold text-gray-700">${brand}</p>
      `;
      card.addEventListener("click", () => {
        handleOptionClick(card, "brand", brand, () => {
          loadModelsForBrand(brand);
          nextStep();
        });
      });
      grid.appendChild(card);
    });

    restoreOptionSelection("brandGrid", "brand");
  }

  // ── VEHICLE TYPE (Step 2) ──
  function setupTypeOptions() {
    const container = document.getElementById("typeContainer");
    if (!container) return;

    container.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => {
        
        if (isProcessing) return;
        isProcessing = true;

        container.querySelectorAll(".option").forEach(o => {
          o.classList.remove("bg-[var(--secondary)]", "border-[var(--secondary)]");
          o.classList.add("border-gray-200");
          const iconBox = o.querySelector(".iconbox");
          const label   = o.querySelector("p");
          const icon    = o.querySelector("i");
          if (iconBox) iconBox.className = "iconbox bg-gray-100 rounded-xl p-4 mb-4";
          if (label)   label.className   = "text-xl font-semibold text-gray-700";
          if (icon)    icon.className     = "h-10 w-10 text-gray-500";
        });

        option.classList.remove("border-gray-200");
        option.classList.add("bg-[var(--secondary)]", "border-[var(--secondary)]");
        const activeIconBox = option.querySelector(".iconbox");
        const activeLabel   = option.querySelector("p");
        const activeIcon    = option.querySelector("i");
        if (activeIconBox) activeIconBox.className = "iconbox bg-white bg-opacity-20 rounded-xl p-4 mb-4";
        if (activeLabel)   activeLabel.className   = "text-xl font-semibold text-white";
        if (activeIcon)    activeIcon.className     = "h-10 w-10 text-white";

        localStorage.setItem("vehicle_type", option.dataset.value);

        setTimeout(() => {
          nextStep();
          isProcessing = false;
        }, 300);
      });
    });
  }

  // ── MODEL DROPDOWN (Step 3) ──
  function loadModelsForBrand(brand) {
    const models = brandModels[brand] || allModels;
    const label  = document.getElementById("selectedBrandLabel");
    if (label) label.textContent = `Showing models for: ${brand}`;
    populateModelDropdown(models);
  }

  function populateModelDropdown(models) {
    const dropdown = document.getElementById("modelDropdown");
    if (!dropdown) return;
    dropdown.innerHTML = `<option value="">-- Select a Model --</option>`;
    models.forEach(model => {
      const opt = document.createElement("option");
      opt.value       = model;
      opt.textContent = model;
      dropdown.appendChild(opt);
    });
    const saved = localStorage.getItem("vehicle_model");
    if (saved) dropdown.value = saved;
  }

  const modelDropdown = document.getElementById("modelDropdown");
  if (modelDropdown) {
    modelDropdown.addEventListener("change", () => {
      if (isProcessing) return;
      const selected = modelDropdown.value;
      if (!selected) return;
      isProcessing = true;
      localStorage.setItem("vehicle_model", selected);
      setTimeout(() => {
        nextStep();
        isProcessing = false;
      }, 300);
    });
  }

  // ── YEAR GRID (Step 4) ──
  function buildYearGrid() {
    const container = document.getElementById("yearContainer");
    if (!container) return;
    container.innerHTML = "";

    for (let y = CURRENT_YEAR; y >= START_YEAR; y--) {
      const card = document.createElement("div");
      card.className = "option border-2 border-gray-200 rounded-xl text-center py-3 px-2 cursor-pointer hover:border-[var(--secondary)] transition-all font-semibold text-gray-700";
      card.dataset.value = String(y);
      card.textContent   = y;
      card.addEventListener("click", () => handleOptionClick(card, "model_year", String(y), () => nextStep()));
      container.appendChild(card);
    }
    restoreOptionSelection("yearContainer", "model_year");
  }

  // ── COLOUR LIST (Step 5) ──
  function buildColourList() {
    const container = document.getElementById("colourContainer");
    if (!container) return;
    container.innerHTML = "";

    COLOURS.forEach(colour => {
      const item = document.createElement("div");
      item.className = "option border-2 border-gray-200 rounded-xl text-center py-3 cursor-pointer hover:border-[var(--secondary)] hover:bg-blue-50 transition-all font-semibold text-gray-700 text-lg";
      item.dataset.value = colour;
      item.textContent   = colour;
      item.addEventListener("click", () => handleOptionClick(item, "colour", colour, () => nextStep()));
      container.appendChild(item);
    });
    restoreOptionSelection("colourContainer", "colour");
  }

  // ── INSPECTION BRANCHES (Step 9) ──
  function buildInspectionBranches() {
    const select = document.getElementById("inspectionBranch");
    if (!select) return;
    select.innerHTML = `<option value="">- select Location -</option>`;
    BRANCHES.forEach(branch => {
      const opt = document.createElement("option");
      opt.value       = branch;
      opt.textContent = branch;
      select.appendChild(opt);
    });
  }

  // ── OWNER OPTIONS (Step 7) ──
  function setupOwnerOptions() {
    const container = document.getElementById("ownerContainer");
    if (!container) return;
    container.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => {
        handleOptionClick(option, "owner_type", option.dataset.value, () => nextStep());
      });
    });
  }

  // ── GENERIC OPTION CLICK HANDLER ──
  function handleOptionClick(clickedEl, storageKey, value, callback) {
    if (isProcessing) return; 
    isProcessing = true;

    clickedEl.parentElement.querySelectorAll(".option").forEach(o => o.classList.remove("option-selected"));
    clickedEl.classList.add("option-selected");
    localStorage.setItem(storageKey, value);

    setTimeout(() => {
      if (callback) callback();
      isProcessing = false;
    }, 300);
  }

  // ── RESTORE SELECTION ─
  function restoreOptionSelection(containerId, storageKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    container.querySelectorAll(".option").forEach(o => {
      if (o.dataset.value === saved || o.textContent.trim() === saved) {
        o.classList.add("option-selected");
      } else {
        o.classList.remove("option-selected");
      }
    });
  }

  // ── SHOW STEP ──
  function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
      const el = document.getElementById("step-" + i);
      if (el) el.classList.add("hidden");
    }
    const active = document.getElementById("step-" + step);
    if (active) active.classList.remove("hidden");

    stepNumber.textContent = step;
    backBtn.classList.toggle("hidden", step === 1);

    stepBtns.forEach((btn, index) => {
      if (index + 1 <= step) {
        btn.style.backgroundColor = "var(--secondary)";
        btn.style.color           = "white";
        btn.style.border          = "none";
      } else {
        btn.style.backgroundColor = "white";
        btn.style.color           = "#555";
        btn.style.border          = "1.5px solid #d1d5db";
      }
    });

    const restorations = {
      1: () => restoreOptionSelection("brandGrid",  "brand"),
      3: () => { const b = localStorage.getItem("brand"); if (b) loadModelsForBrand(b); },
      4: () => restoreOptionSelection("yearContainer",   "model_year"),
      5: () => restoreOptionSelection("colourContainer", "colour"),
      7: () => restoreOptionSelection("ownerContainer",  "owner_type"),
    };
    if (restorations[step]) restorations[step]();

    lucide.createIcons();
    localStorage.setItem("sellStep", step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── NEXT / BACK ──
  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  }

  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // ── START SELL BUTTON ──
  startBtn.addEventListener("click", () => {
    banner.classList.add("hidden");
    wizard.classList.remove("hidden");
    localStorage.setItem("sellStarted", "true");
    const saved = localStorage.getItem("sellStep");
    if (saved) currentStep = parseInt(saved);
    showStep(currentStep);
  });

  // ── WIZARD EVENTS ──
  document.addEventListener("wizardNext", () => nextStep());

  document.addEventListener("wizardReset", () => {
    currentStep  = 1;
    isProcessing = false;

    document.querySelectorAll("#sellWizard input").forEach(el => {
      if (el.type === "file") {
        el.value = "";
      } else {
        el.value = "";
      }
    });
    document.querySelectorAll("#sellWizard select").forEach(el => el.selectedIndex = 0);

    // Clear photo slots
    for (let i = 1; i <= 5; i++) {
      const img       = document.getElementById("slot-img-"    + i);
      const empty     = document.getElementById("slot-empty-"  + i);
      const removeBtn = document.getElementById("slot-remove-" + i);
      if (img)       { img.src = ""; img.classList.add("hidden"); }
      if (empty)     empty.classList.remove("hidden");
      if (removeBtn) removeBtn.classList.add("hidden");
    }

    checkStep8Fields();
    checkPurchaseFields();

    
    document.querySelectorAll(".option").forEach(o => o.classList.remove("option-selected"));

    const typeContainer = document.getElementById("typeContainer");
    if (typeContainer) {
      typeContainer.querySelectorAll(".option").forEach(o => {
        o.classList.remove("bg-[var(--secondary)]", "border-[var(--secondary)]");
        o.classList.add("border-gray-200");
        const iconBox = o.querySelector(".iconbox");
        const label   = o.querySelector("p");
        const icon    = o.querySelector("i");
        if (iconBox) iconBox.className = "iconbox bg-gray-100 rounded-xl p-4 mb-4";
        if (label)   label.className   = "text-xl font-semibold text-gray-700";
        if (icon)    icon.className     = "h-10 w-10 text-gray-500";
      });
    }

    showStep(1);
    wizard.classList.add("hidden");
    banner.classList.remove("hidden");
  });

  // ── DATE LIMITS ──
  const today  = new Date().toISOString().split("T")[0];
  const inspEl = document.getElementById("inspectionDate");
  if (inspEl) inspEl.min = today;
  const purEl = document.getElementById("purchaseDate");
  if (purEl) purEl.max = today;

  banner.classList.remove("hidden");
  wizard.classList.add("hidden");
  const savedStep = localStorage.getItem("sellStep");
  if (savedStep) currentStep = parseInt(savedStep);

// ── PURCHASE DETAILS: enable/disable Continue button ──
  const purchaseDateEl   = document.getElementById("purchaseDate");
  const purchaseAmountEl = document.getElementById("purchaseAmount");
  const purchaseBtn      = document.getElementById("purchaseBtn");

  function checkPurchaseFields() {
    if (!purchaseDateEl || !purchaseAmountEl || !purchaseBtn) return;
    const filled = purchaseDateEl.value && purchaseAmountEl.value;
    purchaseBtn.disabled = !filled;
    purchaseBtn.classList.toggle("opacity-40",         !filled);
    purchaseBtn.classList.toggle("cursor-not-allowed", !filled);
  }

  if (purchaseDateEl) purchaseDateEl.addEventListener("input", checkPurchaseFields);
  if (purchaseAmountEl) purchaseAmountEl.addEventListener("input", checkPurchaseFields);
  checkPurchaseFields();

  const regNumberEl = document.getElementById("regNumber");
  const regBtn      = document.getElementById("regBtn");

  window.checkStep8Fields = function() {
  const regNumberEl = document.getElementById("regNumber");
  const regBtn      = document.getElementById("regBtn");
  if (!regNumberEl || !regBtn) return;

  const regFilled = regNumberEl.value.trim().length > 0;
  let photoCount = 0;
  for (let i = 1; i <= 5; i++) {
    const img = document.getElementById("slot-img-" + i);
    if (img && !img.classList.contains("hidden") && img.src) photoCount++;
  }

  const allGood = regFilled && photoCount >= 5;
  regBtn.disabled = !allGood;
  regBtn.classList.toggle("opacity-40",         !allGood);
  regBtn.classList.toggle("cursor-not-allowed", !allGood);
}

if (regNumberEl) regNumberEl.addEventListener("input", checkStep8Fields);
checkStep8Fields();
}); 

// ── PHOTO UPLOAD HANDLERS ──
function handleSlotUpload(event, slotNumber) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img       = document.getElementById("slot-img-"    + slotNumber);
    const empty     = document.getElementById("slot-empty-"  + slotNumber);
    const removeBtn = document.getElementById("slot-remove-" + slotNumber);
    img.src = e.target.result;
    img.classList.remove("hidden");
    if (empty)     empty.classList.add("hidden");
    if (removeBtn) removeBtn.classList.remove("hidden");
    checkStep8Fields();
  };
  reader.readAsDataURL(file);
}

function clearSlot(event, slotNumber) {
  event.stopPropagation();
  const img       = document.getElementById("slot-img-"    + slotNumber);
  const empty     = document.getElementById("slot-empty-"  + slotNumber);
  const input     = document.getElementById("photo-"       + slotNumber);
  const removeBtn = document.getElementById("slot-remove-" + slotNumber);
  img.src = "";
  img.classList.add("hidden");
  if (input)     input.value = "";
  if (empty)     empty.classList.remove("hidden");
  if (removeBtn) removeBtn.classList.add("hidden");
  checkStep8Fields();
}

function savePurchaseDetails() {
  if (window._btnProcessing) return;
  window._btnProcessing = true;
  const date   = document.getElementById("purchaseDate").value;
  const amount = document.getElementById("purchaseAmount").value;
  localStorage.setItem("purchase_date",   date);
  localStorage.setItem("purchase_amount", amount);
  document.dispatchEvent(new CustomEvent("wizardNext"));
  setTimeout(() => { window._btnProcessing = false; }, 500);
}

function saveRegistrationDetails() {
  if (window._btnProcessing) return;
  window._btnProcessing = true;
  const reg = document.getElementById("regNumber").value.trim();
  localStorage.setItem("reg_number", reg);
  document.dispatchEvent(new CustomEvent("wizardNext"));
  setTimeout(() => { window._btnProcessing = false; }, 500);
}

function saveInspectionDetails() {
  if (window._btnProcessing) return;
  const date   = document.getElementById("inspectionDate").value;
  const branch = document.getElementById("inspectionBranch").value;
  if (!date || !branch) { alert("Please fill in both fields."); return; }
  window._btnProcessing = true;
  localStorage.setItem("inspection_date",   date);
  localStorage.setItem("inspection_branch", branch);
  document.dispatchEvent(new CustomEvent("wizardNext"));
  setTimeout(() => { window._btnProcessing = false; }, 500);
}

// ── SUBMIT (Step 10) ──
function submitForm() {
  if (window._btnProcessing) return;
  const name  = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
 if (!name) { alert("Please enter your full name."); return; }
if (!/^\d{10}$/.test(phone)) { alert("Please enter a valid 10-digit mobile number."); return; }
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  { alert("Please enter a valid email address."); return;} 

  window._btnProcessing = true;

  const submission = {
    brand:             localStorage.getItem("brand"),
    vehicle_type:      localStorage.getItem("vehicle_type"),
    vehicle_model:     localStorage.getItem("vehicle_model"),
    model_year:        localStorage.getItem("model_year"),
    colour:            localStorage.getItem("colour"),
    purchase_date:     localStorage.getItem("purchase_date"),
    purchase_amount:   localStorage.getItem("purchase_amount"),
    owner_type:        localStorage.getItem("owner_type"),
    reg_number:        localStorage.getItem("reg_number"),
    inspection_date:   localStorage.getItem("inspection_date"),
    inspection_branch: localStorage.getItem("inspection_branch"),
    contact_name:      name,
    contact_phone:     phone,
    contact_email:     email,
  };

  console.log("Vehicle Submission:", submission);
  alert("Vehicle details submitted successfully! We'll contact you shortly.");

  localStorage.clear();

  document.dispatchEvent(new CustomEvent("wizardReset"));

  setTimeout(() => { window._btnProcessing = false; }, 500);
}