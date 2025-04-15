const listContainer = document.getElementById("hardware-list");
const deleteModal = new bootstrap.Modal(
  document.getElementById("confirmDeleteModal")
);
let itemToDeleteId = null;

const baseUrl =
  "https://loja-hardware-mongo-backend-production.up.railway.app/products";

async function fetchItems() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Erro ao buscar os itens");
    }
    const data = await response.json();
    renderItems(data);
  } catch (error) {
    console.error(error);
  }
}

function renderItems(items) {
  listContainer.innerHTML = "";
  items.forEach((item) => {
    listContainer.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td>R$ ${item.price.toFixed(2)}</td>
        <td>${item.stock}</td>
        <td>
          <a href="form.html?id=${
            item.id
          }" class="btn btn-sm btn-warning me-2 text-white">
            <i class="bi bi-pencil-fill text-white"></i>
          </a>
          <button class="btn btn-sm btn-danger text-white" onclick="confirmDelete('${
            item.id
          }', '${item.name}')">
            <i class="bi bi-trash-fill text-white"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function confirmDelete(id, nome) {
  itemToDeleteId = id;
  document.getElementById("itemToDeleteName").innerText = nome;
  deleteModal.show();
}

async function deleteItem(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir o item");
    }
    fetchItems();
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  deleteItem(itemToDeleteId);
  deleteModal.hide();
});

fetchItems();
