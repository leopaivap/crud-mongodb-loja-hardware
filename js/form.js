const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const baseUrl =
  "https://loja-hardware-mongo-backend-production.up.railway.app/products";

if (itemId) {
  fetch(`${baseUrl}/${itemId}`)
    .then((res) => res.json())
    .then((item) => {
      document.getElementById("name").value = item.name;
      document.getElementById("description").value = item.description;
      document.getElementById("category").value = item.category;
      document.getElementById("price").value = item.price;
      document.getElementById("stock").value = item.stock;
    })
    .catch((err) => console.error("Erro ao buscar item:", err));
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  const itemData = {
    name,
    description,
    category,
    price,
    stock,
  };

  const url = itemId ? `${baseUrl}/${itemId}` : baseUrl;

  const method = itemId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      throw new Error("Erro ao salvar o item");
    }
  } catch (error) {
    console.error(error);
  }
});
