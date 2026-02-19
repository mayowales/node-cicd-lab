/**
 * Filter users by role and status using early returns
 * to reduce cognitive complexity.
 */
function filterUsers(userList, role, status) {
  if (!role) {
    return userList;
  }

  const filtered = userList.filter((u) => u.role === role);

  if (!status) {
    return filtered;
  }

  const isActive = status === "active";
  return filtered.filter((u) => u.active === isActive);
}

module.exports = { filterUsers };
