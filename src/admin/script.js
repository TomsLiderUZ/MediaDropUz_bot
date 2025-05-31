document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput.value }),
      });

      if (response.ok) {
        window.location.href = "/admin";
      } else {
        alert("Parol noto‘g‘ri!");
      }
    });
  }

  if (document.getElementById("userTable")) {
    fetch("/api/users")
      .then(res => res.json())
      .then(users => {
        const tbody = document.querySelector("#userTable tbody");
        users.forEach(user => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name || "-"}</td>
            <td>${user.username || "-"}</td>
            <td>
              <select data-id="${user.id}">
                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
              </select>
            </td>
            <td><button onclick="updateRole('${user.id}')">Saqlash</button></td>
          `;
          tbody.appendChild(row);
        });
      });
  }
});

function updateRole(userId) {
  const select = document.querySelector(`select[data-id="${userId}"]`);
  const newRole = select.value;
  fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: newRole }),
  }).then(res => {
    if (res.ok) alert("Roli o‘zgartirildi");
    else alert("Xatolik yuz berdi");
  });
}
