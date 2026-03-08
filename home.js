// alert("hello 2441139")
let issues = [];

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const cardContainer = document.getElementById("cardsContainer");
const totalIssues = document.getElementById("totalIssues");
const modal = document.getElementById("my_modal_5");

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

async function loadAllIssues() {
  spinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();
  issues = data.data;
  hideSpinner();
  displayCards(issues);
}



function displayCards(list) {
  cardContainer.innerHTML = "";
  for (const item of list) {
    const card = document.createElement("div");
    card.className = "issue-card cursor-pointer";
    card.innerHTML = `
            <div
                class="card card-body min-h-[350px] space-y-5 shadow-lg border-t-4 ${
                  item.status === "open"
                    ? "border-green-500"
                    : "border-purple-500"
                } "
              >
                <div class="flex justify-between">
                  <div>
                    ${
                      item.status === "open"
                        ? "<img src='./assets/Open-Status.png' />"
                        : "<img src='./assets/Closed-Status.png' />"
                    }
                  </div>
                  <div class="badge badge-soft px-6 ${
                    item.priority.toUpperCase() == "MEDIUM"
                      ? "bg-[#FFF6D1] text-[#F59E0B]"
                      : item.priority.toUpperCase() == "LOW"
                      ? "bg-[#EEEFF2] text-[#9CA3AF]"
                      : "bg-[#FEECEC] text-[#EF4444]"
                  }">${item.priority.toUpperCase()}</div>
                </div>
                <div>
                  <h2  class=" font-bold mb-3">
                    ${item.title}
                  </h2>
                  <p class="line-clamp-2">
                    ${item.description}
                  </p>
                </div>
                <div class="flex w-fit gap-1">
                  <p class="badge badge-outline bg-[#FECACA] badge-secondary">
                    ${item.labels[0]}
                  </p>
                  ${
                    item.labels[1]
                      ? ` <p class="badge text-sm ${
                          item.labels[1] == "good first issue"
                            ? "text-[11px]"
                            : "text-base"
                        } badge-outline truncate bg-[#FDE68A] text-[#D97706]">
                   ${item.labels[1]}
                  </p>`
                      : ""
                  }
                </div>
                <hr class="text-gray-300" />
                <div>
                  <p>${item.author}</p>
                  <p>${item.createdAt.split("T")[0]}</p>
                </div>
              </div>
        `;

    // For Modal
    card.addEventListener("click", () => openModal(item));

    cardContainer.appendChild(card);
  }
  totalIssues.innerText = list.length;
}


function spinner() {
  const loading = document.getElementById("spinner");
  loading.classList.remove("hidden");
  loading.classList.add("grid");
}

function hideSpinner() {
  const loading = document.getElementById("spinner");
  loading.classList.remove("grid");
  loading.classList.add("hidden");
}



