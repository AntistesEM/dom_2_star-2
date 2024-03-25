export default class LoadSort {
  constructor(jsonString) {
    this.memoryData = JSON.parse(jsonString);
    this.sortIndex = 0; // указывает по какому столбцу идет сортировка
    this.ascending = true; // флаг, указывающий на направление сортировки
  }

  init() {
    setInterval(() => {
      if (this.sortIndex >= 4) {
        this.sortIndex = 0;
      }
      this.sortElement(this.sortIndex);
      this.buildDOM();
      this.ascending = !this.ascending;
      if (this.ascending) {
        this.sortIndex++;
      }
    }, 2000);
  }

  buildDOM() {
    const tagdiv = document.querySelector("div");
    if (tagdiv) {
      tagdiv.remove();
    }
    const tagBody = document.querySelector("body");
    const container = document.createElement("div");
    const table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    const headerRow = document.createElement("tr");
    table.appendChild(tableBody);

    for (const key in this.memoryData[0]) {
      const headerCell = document.createElement("th");
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
    }

    table.appendChild(headerRow);

    this.memoryData.forEach((el) => {
      const filmRow = document.createElement("tr");
      for (const key in el) {
        const cell = document.createElement("td");
        if (key === "year") {
          cell.textContent = `(${el[key]})`;
        } else if (key === "imdb") {
          cell.textContent = el[key].toFixed(2);
        } else {
          cell.textContent = el[key];
        }
        filmRow.appendChild(cell);
      }
      table.appendChild(filmRow);
    });

    container.appendChild(table);
    tagBody.appendChild(container);

    this.arroww();
  }
  sortElement(index) {
    this.memoryData.sort((a, b) => {
      if (index === 0) {
        const idA = parseInt(a["id"]);
        const idB = parseInt(b["id"]);
        if (this.ascending) {
          return idA - idB;
        } else {
          return idB - idA;
        }
      } else if (index === 1) {
        const titleA = a["title"].toLowerCase();
        const titleB = b["title"].toLowerCase();
        if (this.ascending) {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      } else if (index === 2) {
        const imdbA = parseFloat(a["imdb"]);
        const imdbB = parseFloat(b["imdb"]);
        if (this.ascending) {
          return imdbA - imdbB;
        } else {
          return imdbB - imdbA;
        }
      } else if (index === 3) {
        const yearA = parseInt(a["year"]);
        const yearB = parseInt(b["year"]);
        if (this.ascending) {
          return yearA - yearB;
        } else {
          return yearB - yearA;
        }
      } else {
        return 0;
      }
    });
  }

  arroww() {
    const tableBody = document.querySelector("table");
    if (tableBody) {
      const headers = tableBody.querySelectorAll("th");
      headers.forEach((header) => {
        const existingArrow = header.querySelector(".arrow");
        if (existingArrow) {
          header.removeChild(existingArrow);
        }
      });

      const header = headers[this.sortIndex];
      const arrow = document.createElement("span");
      arrow.classList.add("arrow");
      header.appendChild(arrow);
      if (this.ascending) {
        arrow.classList.remove("down");
        arrow.classList.add("up");
      } else {
        arrow.classList.remove("up");
        arrow.classList.add("down");
      }
    }
  }
}
