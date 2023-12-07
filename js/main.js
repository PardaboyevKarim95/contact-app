const elForm = document.querySelector(".form");
const elName = document.querySelector(".form-inp-name");
const elTel = document.querySelector(".form-inp-tel");
const elSelect = document.querySelector(".form-select");
const elList = document.querySelector("ul");
const elBtnWrapper = document.querySelector(".btn-wrapper");

let lacolArr = JSON.parse(localStorage.getItem("array"));
let arr = lacolArr ? lacolArr : [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let a = arr.some((item) => {
    return item.tel == elTel.value;
  });

  if (a) {
    elTel.classList.add("border-danger");
    alert("Bu raqam allaqachon mavjut");
  } else if (isNaN(elTel.value)) {
    elTel.classList.add("border-danger");
    alert("Hato: raqam kiriting ");
  } else {
    elTel.classList.remove("border-danger");
    arr.push({
      name: elName.value,
      tel: elTel.value,
      select: elSelect.value,
    });
    render(arr, elList);
    localStorage.setItem("array", JSON.stringify(arr));
  }
});

elBtnWrapper.addEventListener("click", (evt) => {
  console.log(evt.target);

  if (evt.target.matches(".btn-all")) {
    render(arr, elList);
  }
  if (evt.target.matches(".btn-family")) {
    let familyArr = arr.filter((item) => {
      return item.select == "FAMILY";
    });
    render(familyArr, elList);
  }
  if (evt.target.matches(".btn-work")) {
    let workArr = arr.filter((item) => {
      return item.select == "WORK";
    });
    render(workArr, elList);
  }
  if (evt.target.matches(".btn-frinds")) {
    let frindsArr = arr.filter((item) => {
      return item.select == "FRINDS";
    });
    render(frindsArr, elList);
  }
  if (evt.target.matches(".btn-a-z")) {
    let rezalt = arr.sort(
      (a, b) =>
        a.name.toLowerCase().charCodeAt() - b.name.toLowerCase().charCodeAt()
    );
    render(rezalt, elList);
  }
  if (evt.target.matches(".btn-z-a")) {
    let rezalt = arr.sort(
      (a, b) =>
        b.name.toLowerCase().charCodeAt() - a.name.toLowerCase().charCodeAt()
    );
    render(rezalt, elList);
  }
  localStorage.setItem("array", JSON.stringify(arr));
});

function render(array, list) {
  elList.innerHTML = "";
  array.forEach((item) => {
    let itemLi = document.createElement("li");
    itemLi.setAttribute(
      "class",
      "item-list d-flex align-items-center justify-content-between border rounded-3 p-4 pt-2 pb-2 mt-3"
    );
    // li was created
    let spanWrapper = document.createElement("div");
    let nameSpan = document.createElement("span");
    nameSpan.setAttribute(
      "class",
      "your-name d-block  border bg-body-secondary rounded-3 mb-1 p-1"
    );
    nameSpan.textContent = item.name;
    // created to span name value
    let telSpan = document.createElement("span");
    telSpan.setAttribute(
      "class",
      "your-tel d-block  border bg-body-secondary rounded-3 mb-1 p-1"
    );
    telSpan.textContent = item.tel;

    // created to span tel value

    let selectSpan = document.createElement("span");
    selectSpan.setAttribute(
      "class",
      "your-select d-block  border bg-body-secondary rounded-3 mb-1 p-1"
    );
    selectSpan.textContent = item.select;

    // created to span select value
    spanWrapper.append(nameSpan, telSpan);
    itemLi.append(spanWrapper, selectSpan);
    list.appendChild(itemLi);
  });
}
render(arr, elList);
