function notify(message) {

  const notification = document.createElement("span");
  notification.classList.add("notification");
  notification.innerText = message;
  document.querySelector(".reviewInput").appendChild(notification)
  setTimeout(()=>{
    notification.remove();

  }, [3000])
}
// ------------------------------------------------
const reviewBtn = document.querySelector("#reviewBtn");
const ratingInput = document.getElementById("reviewer_rating");
const reviewerNameInput = document.getElementById("reviewer_name");
const reviewerCommentInput = document.getElementById("reviwer_comment");

ratingInput.addEventListener("input", function() {
  const rating = parseInt(ratingInput.value, 10);
  if(isNaN(rating) || rating > 5 || rating < 0){ 
    notify("Please provide a valid rating between 0 and 5");
    ratingInput.value = "";
  }
});
reviewBtn.addEventListener("click", function() {

  const reviewerName = reviewerNameInput.value || "Anon";

  const reviewerRating = parseInt(ratingInput.value, 10);

  const reviewerComment = reviewerCommentInput.value;

  if(reviewerComment === ""){ 
    notify("Please provide some comment, please! Otherwise our review website is going to be empty!");
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

  document.getElementById("reviewer_name").value = "";
  document.getElementById("reviewer_rating").value = "";
  document.getElementById("reviwer_comment").value = "";
});

function updateOverallRating() {
  const reviewElements = document.querySelectorAll(".review");

  let totalRating = 0;
  let numberOfReviews = reviewElements.length;

  reviewElements.forEach(function(reviewElement) {
    const rating = parseInt(reviewElement.querySelector("h4").textContent, 10);
    totalRating += rating;
  });

  const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

  const overallRatingElement = document.querySelector(".info h1");
  overallRatingElement.textContent = `${averageRating.toFixed(1)}/5 Stars`;
}
