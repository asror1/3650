let notificationTimeout;

function notify(message, container) {

  const existingNotification = document.querySelector(".notification");

  // If a notification already exists, do nothing
  if (existingNotification) {
    
  } else {
    // Otherwise, create a new notification
    const notification = document.createElement("span");
    notification.classList.add("notification");
    notification.innerText = message;
    document.querySelector(container).appendChild(notification);

    // Remove the notification after 3 seconds
    notificationTimeout = setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

const reviewBtn = document.querySelector("#reviewBtn");
const ratingInput = document.getElementById("reviewer_rating");
const reviewerNameInput = document.getElementById("reviewer_name");
const reviewerCommentInput = document.getElementById("reviwer_comment");

ratingInput.addEventListener("input", function () {
  const rating = parseInt(ratingInput.value, 10);
  if (isNaN(rating) || rating > 5 || rating < 0) {
    notify("Please provide a valid rating between 0 and 5", ".reviewInput");
    ratingInput.value = "";
  }
});

reviewBtn.addEventListener("click", function () {
  const reviewerName = reviewerNameInput.value.trim() || "Anon"; // Trim whitespace
  const reviewerRating = parseInt(ratingInput.value, 10);
  const reviewerComment = reviewerCommentInput.value.trim();


  if (isNaN(reviewerRating) && reviewerComment === "") {
    notify("Please provide both your rating and comment", ".reviewInput");
    return;
  } else if (isNaN(reviewerRating)) {
    notify("Please provide your rating", ".reviewInput");
    return;
  } else if (reviewerComment === "") {
    notify("Please provide a comment for the review", ".reviewInput");
    return;
  }

  

  

  const newReviewDiv = document.createElement("div");
  newReviewDiv.classList.add("review");

  newReviewDiv.innerHTML = `
    <h2>${reviewerName}</h2>
    <h4>${reviewerRating}/5</h4>
    <p>${reviewerComment}</p>
    `;

  const lastHrElement = document.querySelector(".reviews hr:last-of-type");
  lastHrElement.insertAdjacentElement("afterend", newReviewDiv);

  updateOverallRating();
  console.log(reviewerRating);

  document.getElementById("reviewer_name").value = "";
  document.getElementById("reviewer_rating").value = "";
  document.getElementById("reviwer_comment").value = "";
});

function updateOverallRating() {
  const reviewElements = document.querySelectorAll(".review");

  let totalRating = 0;
  let numberOfReviews = reviewElements.length;

  reviewElements.forEach(function (reviewElement) {
    const rating = parseInt(reviewElement.querySelector("h4").textContent, 10);
    totalRating += rating;
  });

  const averageRating =
    numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

  const overallRatingElement = document.querySelector(".info h1");
  overallRatingElement.textContent = `${averageRating.toFixed(1)}/5 Stars`;
}


function showPopup(addBathroomDiv, buildingName) {
  console.log(buildingName);
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
  <span class="popup-close" onclick="closePopup()">X</span>
  <h2>Add Bathroom for ${buildingName}</h2>
  <form id="bathroomForm">
    <label for="roomNumber">Room Number:</label>
    <input type="text" id="roomNumber" name="roomNumber" required>
    
    <label for="bathroomImages">Bathroom Images:</label>
    <input type="file" id="bathroomImages" name="bathroomImages" accept="image/*" multiple required>
    
    <button type="button" onclick="submitForm('${buildingName}')">Submit</button>
  </form>
`;

  document.body.appendChild(popup);
}

function closePopup() {
  const popup = document.querySelector(".popup");
  if (popup) {
    popup.remove();
  }
}

function submitForm(buildingName) {
  const roomNumber = document.getElementById("roomNumber").value;
  const bathroomImagesInput = document.getElementById("bathroomImages");
  const bathroomImages = bathroomImagesInput.files;

  if (!/^\d+$/.test(roomNumber)) {
    notify("Please enter a valid integer for the room number", ".popup");
    return;
  }

  if(bathroomImages.length == 0){
    notify("Please add at least one image", ".popup");
  }

  // Store image data in localStorage
  const imageData = [];
  Array.from(bathroomImages).forEach((img) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageData.push(e.target.result);
      if (imageData.length === bathroomImages.length) {
        // All images loaded, proceed to create bathroom div
        createBathroomDiv(buildingName, roomNumber, imageData);
      }
    };
    reader.readAsDataURL(img);
  });
}

function createBathroomDiv(buildingName, roomNumber, imageData) {
  // Create a new bathroom div
  const newBathroomDiv = document.createElement("div");
  newBathroomDiv.classList.add("bathroom");

  // Set the content of the new bathroom div
  newBathroomDiv.innerHTML = `
    <span class="name">Room ${roomNumber}</span>
    <span>0/5 Stars</span>
    <a href="bathroom_details.html?building=${encodeURIComponent(buildingName)}&room=${encodeURIComponent(roomNumber)}">View Reviews</a>
  `;

  // Store image data in sessionStorage
  sessionStorage.setItem(`bathroomImages_${roomNumber}`, JSON.stringify(imageData));

  // Find the closest bathrooms container based on buildingName
  const bathroomsContainer = document.querySelector(`.${buildingName.toLowerCase()}-bathrooms`);
  if (!bathroomsContainer) {
    console.error(`Bathrooms container for ${buildingName} not found`);
    return;
  }

  // Insert the new bathroom div before the "add-bathroom" div in the correct container
  const addBathroomDiv = bathroomsContainer.querySelector(".add-bathroom");
  bathroomsContainer.insertBefore(newBathroomDiv, addBathroomDiv);

  const notification = document.createElement("div");
  notification.classList.add("popup-notification");
  notification.textContent = "Bathroom successfully created!";
  document.body.appendChild(notification);

 // Toggle the show class to trigger the CSS transition
setTimeout(() => {
  notification.classList.add("show");
}, 10);

// Remove the notification after 3 seconds
setTimeout(() => {
  notification.remove();
}, 3000);

  // Close the popup after submitting
  closePopup();
}





