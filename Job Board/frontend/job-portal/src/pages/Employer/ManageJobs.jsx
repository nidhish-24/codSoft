import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 7;
  const [jobs, setJobs] = useState([]);

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "applicants") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
      else return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success("Job removed successfully!");
    } catch (error) {
      toast.error("Failed to delete job.");
      console.error(error);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <span className="text-gray-400">⇅</span>;
    return sortDirection === "asc" ? "⬆" : "⬇";
  };

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);
      if (res.status === 200 && res.data?.length) {
        const formattedJobs = res.data.map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company?.name,
          status: job.isClosed ? "Closed" : "Open",
          applicants: job.applicationCount || 0,
          datePosted: moment(job.createdAt).format("DD MMM YYYY"),
        }));
        setJobs(formattedJobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Job Dashboard
            </h1>
            <p className="text-gray-300 mt-1">
              Monitor and manage all your active job listings
            </p>
          </div>

          <button
            onClick={() => navigate("/post-job")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" /> New Listing
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search job title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl px-4 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl bg-gray-800/70 backdrop-blur-md shadow-xl border border-gray-700">
          <table className="min-w-full text-white">
            <thead className="bg-gray-700/50">
              <tr>
                <th
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Job Title {<SortIcon field="title" />}
                </th>
                <th
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("company")}
                >
                  Company {<SortIcon field="company" />}
                </th>
                <th
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status {<SortIcon field="status" />}
                </th>
                <th
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("applicants")}
                >
                  Applicants {<SortIcon field="applicants" />}
                </th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-700">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-6 bg-gray-600 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                : paginatedJobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">{job.title}</td>
                      <td className="px-6 py-4">{job.company}</td>
                      <td className="px-6 py-4">{job.status}</td>
                      <td className="px-6 py-4">{job.applicants}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => navigate("/post-job", { state: { jobId: job.id } })}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-gray-300">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;
