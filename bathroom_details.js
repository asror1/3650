document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const roomName = queryParams.get("room");
    const buildingName = queryParams.get("building");
    
    // Retrieve image data from sessionStorage
    const imageData = JSON.parse(sessionStorage.getItem(`bathroomImages_${roomName}`)) || [];
  
    // Update room name
    document.getElementById("roomName").textContent = `${buildingName} Room ${roomName}`;
    
    // Update bathroom images
    const bathroomImagesContainer = document.querySelector(".images");
    imageData.forEach((imageSrc, index) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = `bathroom image ${index + 1}`;
      bathroomImagesContainer.appendChild(img);
    });
  });
  