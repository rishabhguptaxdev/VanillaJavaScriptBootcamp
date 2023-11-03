console.log("testing javascript linking to html page.");

const ACCESS_KEY = `lnINZvd78oWaLABqru4KzoRO000sf7N59pewmBNW4eM`;
const totalNumberOfImages = 50;
const per_page = 5;

let searchImages = async () => {
  handleImages();
  handlePagination();
};

async function handleImages(page = 1) {
  try {
    let photoNodes = document.getElementById("photos");
    photoNodes.innerHTML = "";
    const keyword = document.getElementById("keyword");
    if (!keyword.value) return;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=${keyword.value}&client_id=${ACCESS_KEY}`
    );
    let images = await response.json();
    images = images.results;

    function addimages(image) {
      let img = document.createElement("img");
      img.src = `${image.urls.thumb}`;
      photoNodes.appendChild(img);
    }
    images.forEach(addimages);
  } catch {
    console.log("Something went wrong");
    return;
  }
}

function handlePagination() {
  const keyword = document.getElementById("keyword");
  if (!keyword.value) return;
  let pager = document.getElementById("pager");
  pager.innerHTML = "";
  let numOfPages = totalNumberOfImages / per_page;
  for (let i = 0; i < numOfPages; i++) {
    let li = document.createElement("li");
    li.className = "page-item";
    let a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.onclick = () => {
      handleImages(i + 1, per_page);
    };
    pager.appendChild(li);
    a.innerHTML = i + 1;
    li.appendChild(a);
  }
}
