// alert("hello 2441139")
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");


// Tab switching function
function switchTab(id) {
  allBtn.classList.remove("bg-primary", "text-white");
  openBtn.classList.remove("bg-primary", "text-white");
  closedBtn.classList.remove("bg-primary", "text-white");

  const selected = document.getElementById(id);
  if (selected) {
    allBtn.classList.remove("bg-primary", "text-white");
    selected.classList.add("bg-primary", "text-white");
  }
}