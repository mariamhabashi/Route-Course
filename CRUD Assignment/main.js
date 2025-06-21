var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var tableBody = document.getElementById("tableBody");
var modalOverlay = document.getElementById("modalOverlay");

var bookmarksList = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  var isNameValid = validateInput(siteNameInput);
  var isUrlValid = validateInput(siteURLInput);

  if (isNameValid && isUrlValid) {
    var bookmark = {
      id: Date.now(),
      name: siteNameInput.value,
      url: siteURLInput.value,
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks();
    clearForm();
  } else {
    modalOverlay.classList.add("show");
  }
}

function displayBookmarks(list = bookmarksList) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>
          <a href="${ensureHttp(list[i].url)}" target="_blank" class="btn btn-success">
            <i class="fa-solid fa-eye"></i> Visit
          </a>
        </td>
        <td>
          <button onclick="deleteBookmark(${list[i].id})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tableBody.innerHTML = box;
}

function deleteBookmark(id) {
  for (var i = 0; i < bookmarksList.length; i++) {
    if (bookmarksList[i].id == id) {
      bookmarksList.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  displayBookmarks();
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteURLInput.classList.remove("is-valid", "is-invalid");
}

function validateInput(input) {
  var regex = {
    siteName: /.{3,}/,
    siteURL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  };

  if (regex[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function closeModal() {
  modalOverlay.classList.remove("show");
}

function ensureHttp(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});


function displayBookmarks(list = bookmarksList) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>
          <a href="${ensureHttp(list[i].url)}" target="_blank" class="btn btn-visit">
            <i class="fa-solid fa-eye"></i> Visit
          </a>
        </td>
        <td>
          <button onclick="deleteBookmark(${list[i].id})" class="btn btn-delete">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tableBody.innerHTML = box;
}