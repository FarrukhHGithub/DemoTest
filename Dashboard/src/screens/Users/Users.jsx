import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../Layout";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { FiCalendar, FiTrash2, FiSearch } from "react-icons/fi";
import { BiChevronUp, BiChevronDown, BiSort } from "react-icons/bi";
import BASE_URL from "../../baseUrl";
import UserAppointmentModal from "./UserAppointmentModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  
  // Sort states
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Delete dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Reset to first page when search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/userauth/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setUsers(data);
    } catch {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      setDeleting(true);
      const response = await fetch(`${BASE_URL}/api/userauth/users/${userToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete user.");
      }

      toast.success(result.message || "User deleted successfully.");
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete user.");
    } finally {
      setDeleting(false);
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted users
  const sortedUsers = useMemo(() => {
    const sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "isAdmin") {
          aValue = a.isAdmin ? 1 : 0;
          bValue = b.isAdmin ? 1 : 0;
        } else if (sortConfig.key === "updatedAt") {
          aValue = new Date(a.updatedAt || 0).getTime();
          bValue = new Date(b.updatedAt || 0).getTime();
        } else {
          aValue = (aValue || "").toString().toLowerCase();
          bValue = (bValue || "").toString().toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) => {
      const name = user.name || "";
      const email = user.email || "";
      const query = searchText.toLowerCase();
      return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
    });
  }, [sortedUsers, searchText]);

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Sorting icon renderer
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <BiSort className="text-textGray text-sm hover:text-main" />;
    }
    return sortConfig.direction === "asc" ? (
      <BiChevronUp className="text-subMain text-lg" />
    ) : (
      <BiChevronDown className="text-subMain text-lg" />
    );
  };

  return (
    <Layout>
      <div className="p-4 sm:p-5 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-main">Users</h1>
            <p className="text-xs text-textGray mt-0.5">
              Manage and view all registered system users ({users.length} total)
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-9 sm:h-10 w-full text-xs text-main rounded-lg bg-white border border-border pl-9 pr-3 focus:border-subMain focus:ring-1 focus:ring-subMain transitions shadow-xs"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-textGray text-sm" />
          </div>
        </div>

        {/* Table Container Card */}
        <div id="tour-users-list" className="bg-white rounded-xl border border-border p-4 sm:p-5 shadow-xs">
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Responsive Custom Table */}
              <div className="w-full overflow-x-auto">
                <table className="table-auto w-full min-w-[750px]">
                  <thead className="bg-dry rounded-lg">
                    <tr>
                      <th className="text-start text-[11px] font-semibold py-2.5 px-3 text-main uppercase tracking-wider w-[6%]">
                        #
                      </th>
                      <th
                        className="text-start text-[11px] font-semibold py-2.5 px-3 text-main uppercase tracking-wider cursor-pointer select-none w-[40%]"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1.5 hover:text-subMain transitions">
                          User Information
                          {renderSortIcon("name")}
                        </div>
                      </th>
                      <th
                        className="text-start text-[11px] font-semibold py-2.5 px-3 text-main uppercase tracking-wider cursor-pointer select-none w-[14%]"
                        onClick={() => handleSort("isAdmin")}
                      >
                        <div className="flex items-center gap-1.5 hover:text-subMain transitions">
                          Role
                          {renderSortIcon("isAdmin")}
                        </div>
                      </th>
                      <th
                        className="text-start text-[11px] font-semibold py-2.5 px-3 text-main uppercase tracking-wider cursor-pointer select-none w-[20%]"
                        onClick={() => handleSort("updatedAt")}
                      >
                        <div className="flex items-center gap-1.5 hover:text-subMain transitions">
                          Updated At
                          {renderSortIcon("updatedAt")}
                        </div>
                      </th>
                      <th className="text-start text-[11px] font-semibold py-2.5 px-3 text-main uppercase tracking-wider w-[20%]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user, index) => (
                        <tr
                          key={user._id}
                          className="hover:bg-greyed transitions border-b border-border"
                        >
                          <td className="text-start text-xs py-2.5 px-3 text-main font-medium">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="text-start text-xs py-2.5 px-3">
                            <div className="flex gap-2.5 items-center">
                              <div className="w-8 h-8 rounded-full bg-subMain bg-opacity-10 text-subMain flex items-center justify-center font-bold text-xs border border-subMain border-opacity-20 flex-shrink-0">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                              </div>
                              <div className="truncate">
                                <h4 className="text-xs font-semibold text-main truncate max-w-[200px]" title={user.name}>
                                  {user.name}
                                </h4>
                                <p className="text-[11px] text-textGray mt-0.5 truncate max-w-[220px]" title={user.email}>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-start text-xs py-2.5 px-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                user.isAdmin
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }`}
                            >
                              {user.isAdmin ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="text-start text-xs py-2.5 px-3 text-textGray font-normal">
                            {dayjs(user.updatedAt).format("DD MMM YYYY, hh:mm A")}
                          </td>
                          <td className="text-start text-xs py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenModal(user)}
                                id={index === 0 ? "tour-user-appointment" : undefined}
                                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-subMain border border-subMain border-dashed rounded-lg bg-blue-50 bg-opacity-30 hover:bg-subMain hover:text-white hover:border-solid transitions shadow-xs"
                              >
                                <FiCalendar className="text-xs" />
                                Appointment
                              </button>
                              <button
                                onClick={() => handleDeleteClick(user)}
                                id={index === 0 ? "tour-user-delete" : undefined}
                                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transitions shadow-xs"
                              >
                                <FiTrash2 className="text-xs" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-textGray text-sm">
                          No users found matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-border gap-4">
                  <p className="text-xs text-textGray font-light">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transitions ${
                        currentPage === 1
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-border text-main hover:bg-gray-50 bg-white"
                      }`}
                    >
                      Prev
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transitions ${
                              currentPage === pageNum
                                ? "bg-subMain text-white"
                                : "text-main border border-transparent hover:border-border hover:bg-gray-50 bg-white"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transitions ${
                        currentPage === totalPages
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-border text-main hover:bg-gray-50 bg-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal components */}
        <UserAppointmentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          user={selectedUser}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="delete-dialog-title" sx={{ color: "error.main", fontWeight: 600 }}>
            Delete User Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to permanently delete the user{" "}
              <strong className="text-main">"{userToDelete?.name}"</strong> with email{" "}
              <strong className="text-main">"{userToDelete?.email}"</strong>?
              <br />
              <br />
              This action cannot be undone. It will permanently remove their access and all associated user data.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={handleDeleteCancel}
              disabled={deleting}
              variant="outlined"
              sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              disabled={deleting}
              startIcon={deleting ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, boxShadow: "none" }}
            >
              {deleting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Users;