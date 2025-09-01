import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from "react";
import {
    MapPin,
    Briefcase,
    Users,
    DollarSign,
    Eye,
    Send,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/SelectField";
import TextareaField from "../../components/input/TextareaField";
import JobPostingPreview from "../../components/cards/JobPostingPreview";

const JobPostingFormWizard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const jobId = location.state?.jobId || null;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        jobTitle: "",
        location: "",
        category: "",
        jobType: "",
        description: "",
        requirements: "",
        salaryMin: "",
        salaryMax: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const validateStep = () => {
        const errs = {};
        if (step === 1) {
            if (!formData.jobTitle.trim()) errs.jobTitle = "Job title is required";
            if (!formData.location.trim()) errs.location = "Location is required";
            if (!formData.category) errs.category = "Select a category";
            if (!formData.jobType) errs.jobType = "Select job type";
        } else if (step === 2) {
            if (!formData.description.trim()) errs.description = "Job description is required";
            if (!formData.requirements.trim()) errs.requirements = "Job requirements required";
        } else if (step === 3) {
            if (!formData.salaryMin || !formData.salaryMax) errs.salary = "Provide salary range";
            else if (Number(formData.salaryMin) >= Number(formData.salaryMax)) errs.salary = "Max salary must exceed Min salary";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep(prev => prev + 1);
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);
        const payload = {
            title: formData.jobTitle,
            location: formData.location,
            category: formData.category,
            type: formData.jobType,
            description: formData.description,
            requirements: formData.requirements,
            salaryMin: formData.salaryMin,
            salaryMax: formData.salaryMax,
        };

        try {
            const res = jobId
                ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), payload)
                : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, payload);

            if (res.status === 200 || res.status === 201) {
                toast.success(jobId ? "Job Updated!" : "Job Posted!");
                navigate("/employer-dashboard");
            } else toast.error("Failed to post job");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DashboardLayout activeMenu="post-job">
            <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-12 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50">
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8">
                    {/* Step Header */}
                    <div className="flex justify-between items-center mb-8">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`flex-1 h-2 mx-1 rounded-full ${step >= s ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                        ))}
                    </div>

                    {/* Step Content */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Details</h2>
                            <InputField
                                label="Job Title"
                                placeholder="e.g., Senior React Developer"
                                value={formData.jobTitle}
                                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                error={errors.jobTitle}
                                required
                                icon={Briefcase}
                            />
                            <InputField
                                label="Location"
                                placeholder="e.g., Chennai, TN"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                error={errors.location}
                                icon={MapPin}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <SelectField
                                    label="Category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    options={CATEGORIES}
                                    placeholder="Select a category"
                                    error={errors.category}
                                    icon={Users}
                                />
                                <SelectField
                                    label="Job Type"
                                    value={formData.jobType}
                                    onChange={(e) => handleInputChange("jobType", e.target.value)}
                                    options={JOB_TYPES}
                                    placeholder="Select job type"
                                    error={errors.jobType}
                                    icon={Briefcase}
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description & Requirements</h2>
                            <TextareaField
                                label="Job Description"
                                placeholder="Describe the role and responsibilities"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                error={errors.description}
                                helperText="Add responsibilities and day-to-day tasks"
                                required
                            />
                            <TextareaField
                                label="Requirements"
                                placeholder="List key skills and qualifications"
                                value={formData.requirements}
                                onChange={(e) => handleInputChange("requirements", e.target.value)}
                                error={errors.requirements}
                                helperText="Include experience, skills, education"
                                required
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Salary Range</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <DollarSign className="absolute top-2 left-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={formData.salaryMin}
                                        onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                                <div className="relative">
                                    <DollarSign className="absolute top-2 left-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={formData.salaryMax}
                                        onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                            </div>
                            {errors.salary && <p className="text-red-600 text-sm mt-1">{errors.salary}</p>}
                        </div>
                    )}

                    {step === 4 && (
                        <JobPostingPreview formData={formData} />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-all"
                            >
                                Back
                            </button>
                        ) : <div></div>}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-all"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 disabled:bg-gray-400 transition-all"
                            >
                                {isSubmitting ? "Publishing..." : <><Send className="inline w-5 h-5 mr-2" /> Publish Job</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JobPostingFormWizard;
