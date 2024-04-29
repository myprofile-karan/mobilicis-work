const sidebarIcon = document.getElementById("sidebarIcon");
const closeIcon = document.getElementById("closeIcon");
const sidebar = document.getElementById("sidebar");

let jobListings = []; // Array to store all job listings
let initailCards = 4;

document.addEventListener("DOMContentLoaded", function () {
  const jobListingsContainer = document.getElementById(
    "job-listings-container"
  );
  const searchInput = document.getElementById("searchInput");
  const addMoreJobs = document.getElementById("addMoreJobs");
  const locationInput = document.getElementById("locationInput");
  const selectLang = document.getElementById("selectLang");

  const fetchEngData = "/mockData/mockData.json";
  const fetchJapData = "/mockData/japMockData.json";

  function fetchingData(lang) {
    fetch(lang)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        jobListings = data;
        displayJobListings(jobListings);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  fetchingData(fetchEngData);

  selectLang.addEventListener("change", function () {
    const selectedValue = this.value;

    if (selectedValue === "EN") {
      fetchingData(fetchEngData);
    } else {
      fetchingData(fetchJapData);
    }
  });

  // Display job listings on the page
  function displayJobListings(listings) {
    jobListingsContainer.innerHTML = "";

    listings.slice(0, initailCards).forEach((job) => {
      const listingCard = createListingCard(job);
      jobListingsContainer.appendChild(listingCard);
    });
  }

  // add more job cards
  addMoreJobs.addEventListener("click", function () {
    initailCards = initailCards + 4;
    displayJobListings(jobListings.slice(0, initailCards));
    if (initailCards == 20) {
      addMoreJobs.style.display = "none";
    }
  });

  // Create HTML elements for job listing card
  function createListingCard(job) {
    const card = document.createElement("div");
    card.classList.add("job-card");
    card.innerHTML = `
            <h3>${job.title} at ${job.company}</h3>
            <div><p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Posted Date:</strong> ${job.posted_date}</p></div>
            <p>${job.description}</p>
            <p><strong>Requirements:</strong> ${job.requirements}</p>
        `;
    return card;
  }

  // Function to filter job listings based on search input
  function filterJobListings(searchTerm) {
    const filteredListings = jobListings.filter((job) => {
      const title = job.title.toLowerCase();
      const company = job.company.toLowerCase();
      const location = job.location.toLowerCase();
      return (
        title.includes(searchTerm) ||
        company.includes(searchTerm) ||
        location.includes(searchTerm)
      );
    });
    displayJobListings(filteredListings);
  }

  // Attach event listener to search input field
  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    filterJobListings(searchTerm);
  });

  // location search input
  locationInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    filterJobListings(searchTerm);
  });
});


gsap.to(".animation", {
  scrollTrigger: {
    trigger: "#home",
    start:"top top",
    end: "bottom top",
    scrub: 0.1,
    pin:true,
  },
  "--clip": "0%",
  ease: Power2,
  duration: 2
})

function closeSidebar() {
  sidebar.style.display = "none";
}
function openSIdebar() {
  sidebar.style.display = "block";
}
