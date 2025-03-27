export function generateRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function createTestElement(): HTMLDivElement {
  const element = document.createElement("div");
  element.className = "test-container";
  element.innerHTML = `
    <h1 class="test-title">Test Element</h1>
    <button class="test-button">Click Me!</button>
  `;
  return element;
}

export function addTestElement(): void {
  const element = createTestElement();
  document.body.appendChild(element);

  const button = element.querySelector(".test-button");
  if (button instanceof HTMLButtonElement) {
    button.addEventListener("click", () => {
      button.style.backgroundColor = generateRandomColor();
    });
  }
}
