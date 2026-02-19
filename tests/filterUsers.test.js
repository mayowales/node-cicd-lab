const { filterUsers } = require("../src/utils");

const mockUsers = [
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "user", active: true },
  { id: 3, name: "Charlie", role: "admin", active: false },
  { id: 4, name: "Diana", role: "user", active: false },
];

describe("filterUsers", () => {
  it("should return all users when no filters are provided", () => {
    const result = filterUsers(mockUsers, undefined, undefined);
    expect(result).toHaveLength(4);
  });

  it("should filter by role only", () => {
    const result = filterUsers(mockUsers, "admin", undefined);
    expect(result).toHaveLength(2);
    result.forEach((u) => expect(u.role).toBe("admin"));
  });

  it("should filter by role and active status", () => {
    const result = filterUsers(mockUsers, "admin", "active");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Alice");
  });

  it("should filter by role and inactive status", () => {
    const result = filterUsers(mockUsers, "admin", "inactive");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Charlie");
  });

  it("should return empty array for non-existent role", () => {
    const result = filterUsers(mockUsers, "manager", undefined);
    expect(result).toHaveLength(0);
  });

  it("should return empty array when list is empty", () => {
    const result = filterUsers([], "admin", "active");
    expect(result).toHaveLength(0);
  });

  it("should handle null role the same as undefined", () => {
    const result = filterUsers(mockUsers, null, null);
    expect(result).toHaveLength(4);
  });

  it("should handle empty string role the same as undefined", () => {
    const result = filterUsers(mockUsers, "", undefined);
    expect(result).toHaveLength(4);
  });
});
