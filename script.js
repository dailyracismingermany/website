let currentStory = 1;
let stories = [];
let totalStories = 0;

// Fetch stories when page loads
async function loadStories() {
  try {
    console.log("Fetching stories...");
    const response = await fetch("/stories.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Stories loaded:", data);
    stories = data.stories;
    totalStories = stories.length;
    updateStoryContent();
  } catch (error) {
    console.error("Error loading stories:", error);
    document.querySelector(".story-content").textContent =
      "Error loading stories. Please try again later.";
  }
}

// Call this when page loads
loadStories();

function updateStoryCounter() {
  document.querySelector(
    ".story-counter"
  ).textContent = `${currentStory}/${totalStories}`;
}

function updateStoryContent() {
  const story = stories[currentStory - 1];
  document.querySelector(".profession").textContent = story.profession;
  document.querySelector(".gender").textContent = story.gender;
  document.querySelector(".age").textContent = story.age;
  document.querySelector(".story-content").textContent = story.content;
  updateStoryCounter();
}

document.querySelector(".prev-btn").addEventListener("click", () => {
  if (currentStory > 1) {
    currentStory--;
    updateStoryContent();
  }
});

document.querySelector(".next-btn").addEventListener("click", () => {
  if (currentStory < totalStories) {
    currentStory++;
    updateStoryContent();
  }
});
