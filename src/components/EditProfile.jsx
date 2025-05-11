'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/api/auth';
import { updatedUser } from '@/redux/auth/authSlice';
import placeholderImage from "../Image/placeholderImage.png"


const EditProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm({
    values: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      job: user?.job,
      number: user?.number,
      profileImageUrl: user?.profileImageUrl,
      bio: user?.bio,
    }
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);



  async function submitForm(data) {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("number", data?.number);
    formData.append("address", data?.address);
    formData.append("bio", data?.bio);
    formData.append("job", data?.job);
    if (profileImage) {
      formData.append("image", profileImage)
    }
    try {
      setLoading(true)
      const response = await updateUser(formData);
      dispatch(updatedUser(response))
      toast.success("Profile update successfully.")


    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  }





  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };





  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl shadow-xl p-8 relative"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 text-indigo-300 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
        {/* Profile Image Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/20 shadow-lg"
          >
            {previewImage ? (
              <Image
                src={previewImage }
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (<Image
              src={user?.profileImageUrl ||placeholderImage}
              alt="profile"
              fill
              className="object-cover"
            />

            )}
          </motion.div>
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg shadow-purple-900/30"
          >
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </motion.label>
        </motion.div>

        {/* Basic Information */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              {...register("name")}


              className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
              required
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email")}

              className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
              required
            />
          </motion.div>
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <label className="block text-sm font-medium text-indigo-300 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            {...register("bio")}
            rows="4"
            className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
            placeholder="Tell us about yourself..."
          />
        </motion.div>

        {/* Location */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <label className="block text-sm font-medium text-indigo-300 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            {...register("address")}
            className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
            placeholder="City, Country"
          />
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-indigo-300 mb-1">
                Phone Number
              </label>
              <input
                type="number"
                name="website"
                {...register("number")}
                className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                placeholder="977+ *********"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-indigo-300 mb-1">
                job
              </label>
              <input
                type="text"
                name="twitter"
                {...register("job")}
                className="w-full px-4 py-2 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                placeholder="@username"
              />
            </motion.div>


          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-end gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg shadow-purple-900/30 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex items-center"
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </motion.span>
            ) : (
              'Save Changes'
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default EditProfile; 