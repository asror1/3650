function notify(message) {

  const notification = document.createElement("span");
  notification.classList.add("notification");
  notification.innerText = message;
  document.querySelector(".reviewInput").appendChild(notification)
  setTimeout(()=>{
    notification.remove();

  }, [3000])
}
const reviewBtn = document.querySelector("#reviewBtn");

reviewBtn.addEventListener("click", function() {
  const reviewerName = document.getElementById("reviewer_name").value || "Anon";
  const reviewerRating = parseInt(
    document.getElementById("reviewer_rating").value,
    10
  );
  const reviewerComment = document.getElementById("reviwer_comment").value;

  if (isNaN(reviewerRating) || reviewerName === "" || reviewerComment === "") {
    notify(
      "Please provide a valid rating, it can't be left blank unfortunately :("
    );
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
