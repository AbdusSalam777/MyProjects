function ThemeToggle() {
  const toggleTheme = () => {
    const body = document.body;
    const inputs = document.querySelectorAll("input");

    if (body.style.backgroundColor === "black") {
      body.style.backgroundColor = "white";
      body.style.color = "black";
      inputs.forEach((input) => {
        input.style.borderColor = "black";
        input.style.color = "black";
      });
    } else {
      body.style.backgroundColor = "black";
      body.style.color = "white";
      inputs.forEach((input) => {
        input.style.borderColor = "white";
        input.style.color = "white";
      });
    }
  };

  return (
    <button
      style={{ fontSize: "35px", padding: "8px", borderRadius: "8px" }}
      onClick={toggleTheme}
    >
      🌗
    </button>
  );
}

export default ThemeToggle;
//luna bala
