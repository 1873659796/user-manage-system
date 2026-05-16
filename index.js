// 缓存数据（初始化后赋值）
let userList = [];
// 获取DOM元素
const userListEl = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");
const addUserBtn = document.getElementById("addUserBtn");
// 初始化
init();

// 事件监听
userListEl.addEventListener("click", (e) => {
  const targetElClassList = e.target.classList;
  if (
    !targetElClassList.contains("btn-del") &&
    !targetElClassList.contains("btn-edit")
  )
    return;
  // 事件委托
  const userCardID = e.target.closest(".user-card").dataset.id;
  if (targetElClassList.contains("btn-del")) {
    deleteUser(userCardID);
  }
  if (targetElClassList.contains("btn-edit")) {
    editUser(userCardID);
  }
});

addUserBtn.addEventListener("click", addUser);
// --------------核心功能函数----------------
// 初始化：获取数据并渲染
async function init() {
  userList = await getData("http://localhost:3000/users", "get");
  renderUsers(userList);
}
// 获取接口数据
async function getData(url, method) {
  const res = await axios({
    url: url,
    method: method,
  });
  return res.data;
}
// 渲染用户列表
function renderUsers(list) {
  if (list.length === 0) {
    userListEl.innerHTML = `<div class="empty">暂无用户数据</div>`;
    return;
  }

  userListEl.innerHTML = list
    .map(
      (user) => `
          <div class="user-card" data-id="${user.id}">
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <div class="user-name">${user.name}</div>
            <div class="user-info">电话：${user.phone}</div>
            <div class="user-info">年龄：${user.age}</div>
            <div class="user-info">性别：${user.gender}</div>
            <div class="user-info">民族：${user.nation}</div>
            <div class="card-actions">
              <button class="btn btn-edit" >编辑</button>
              <button class="btn btn-del" >删除</button>
            </div>
          </div>
        `,
    )
    .join("");
}
// 删除用户
async function deleteUser(id) {
  await axios.delete(`http://localhost:3000/users/${id}`);
  userList = await getData("http://localhost:3000/users", "get");
  renderUsers(userList);
}
// 编辑用户
async function editUser(id) {
  window.location.href = `./modify.html?id=${id}`;
}

// 添加用户
async function addUser() {
  window.location.href = "./register.html";
}
