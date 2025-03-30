import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Mail,
  Phone,
  Briefcase,
  Save,
  AlertCircle,
  Upload,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  X,
  Check,
  Edit,
  Info
} from 'lucide-react';

const BuyerBrand = () => {
  const [currentUser, setCurrentUser] = useState({ id: 'user123' }); // Simulated auth
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [brandInfo, setBrandInfo] = useState({
    name: '',
    tagline: '',
    mission: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  // Store original data for cancel functionality
  const [originalBrandInfo, setOriginalBrandInfo] = useState({});

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState('saved');
  const [activeTab, setActiveTab] = useState('info');

  // Function to handle logo upload to server
  const uploadLogoToServer = async (file) => {
    try {
      if (!file) {
        throw new Error('No file provided for upload');
      }

      // Create a FormData object for the logo upload
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('userId', currentUser?.id || 'unknown');
      formData.append('brandId', currentBrand?._id || 'unknown');

      // In a real implementation, you would have an API endpoint
      // For this demo, we'll simulate a successful upload after a delay
      console.log('Uploading file:', file.name);

      // Simulate API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For a real implementation:
      // const response = await fetch('https://your-api-endpoint.com/upload', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     // Don't set Content-Type here, it will be set automatically with boundary for FormData
      //     'Authorization': 'Bearer your-auth-token'
      //   }
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Upload failed');
      // }
      // 
      // const data = await response.json();
      // return data.logoUrl;

      // For now, return a unique placeholder URL to simulate successful upload
      const timestamp = new Date().getTime();
      return `https://via.placeholder.com/150?text=Brand+Logo&time=${timestamp}`;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  };

  // Simulate data fetching
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);

        // Simulate API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Sample data
        const sampleBrand = {
          _id: 'brand123',
          name: 'Acme Corporation',
          tagline: 'Innovation for everyone',
          mission: 'To provide innovative solutions that help businesses and individuals thrive in a digital world.',
          email: 'contact@acme.com',
          phone: '+1 (555) 123-4567',
          website: 'www.acme.com',
          address: '123 Main Street, San Francisco, CA 94103',
          logo: '',
          socialLinks: {
            facebook: 'https://facebook.com/acme',
            twitter: 'https://twitter.com/acme',
            linkedin: 'https://linkedin.com/company/acme',
            instagram: 'https://instagram.com/acme'
          }
        };

        setCurrentBrand(sampleBrand);

        const brandData = {
          name: sampleBrand.name || '',
          tagline: sampleBrand.tagline || '',
          mission: sampleBrand.mission || '',
          email: sampleBrand.email || '',
          phone: sampleBrand.phone || '',
          website: sampleBrand.website || '',
          address: sampleBrand.address || '',
          socialLinks: sampleBrand.socialLinks || {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
          }
        };

        setBrandInfo(brandData);
        setOriginalBrandInfo(brandData);
        setLogoPreview(sampleBrand.logo || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching brand data:", err);
        setError("Failed to load brand data");
        setLoading(false);
      }
    };

    fetchBrandData();
  }, []);

  // Update saveStatus based on loading state
  useEffect(() => {
    if (loading) {
      setSaveStatus('saving');
    } else if (error) {
      setSaveStatus('error');
    } else if (currentBrand) {
      setSaveStatus('saved');
    }
  }, [loading, error, currentBrand]);

  // Auto-dismiss status messages
  useEffect(() => {
    if (saveStatus === 'saved' && !editMode) {
      const timer = setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus, editMode]);

  // Auto-dismiss error messages
  useEffect(() => {
    if (errors.general) {
      const timer = setTimeout(() => {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.general;
          return newErrors;
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors.general]);

  // Auto-dismiss success messages
  useEffect(() => {
    if (errors.success) {
      const timer = setTimeout(() => {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.success;
          return newErrors;
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors.success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandInfo(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        console.error('File is not an image');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log("Image loaded successfully", event.target.result.substring(0, 50)); // Log preview
        setLogoPreview(event.target.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (platform, value) => {
    setBrandInfo(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'name':
        if (!value) newErrors.name = 'Brand name is required';
        else delete newErrors.name;
        break;
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Invalid email format';
        else delete newErrors.email;
        break;
      case 'phone':
        if (value && !/^\+?[\d\s-]{8,}$/.test(value)) newErrors.phone = 'Invalid phone format';
        else delete newErrors.phone;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const saveBrandData = async () => {
    try {
      setSaveStatus('saving');
      setLoading(true);
      setErrors({});

      if (!currentUser) {
        setErrors(prev => ({ ...prev, general: 'You must be logged in to save brand data.' }));
        setSaveStatus('error');
        setLoading(false);
        return;
      }

      if (!brandInfo.name) {
        setErrors(prev => ({ ...prev, name: 'Brand name is required' }));
        setSaveStatus('error');
        setLoading(false);
        return;
      }

      // Upload logo if a new one was selected
      let logoUrl = logoPreview;
      if (logoFile) {
        try {
          // Show uploading state
          setSaveStatus('uploading');
          logoUrl = await uploadLogoToServer(logoFile);
          // Clear the file after successful upload
          setLogoFile(null);
        } catch (error) {
          setErrors(prev => ({ ...prev, general: 'Failed to upload logo. Please try again.' }));
          setSaveStatus('error');
          setLoading(false);
          return;
        }
      }

      // Saving other brand data
      setSaveStatus('saving');

      // Simulate API call for saving the brand data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update currentBrand with new data
      setCurrentBrand({
        ...currentBrand,
        ...brandInfo,
        logo: logoUrl
      });

      // Store the updated data as original for future cancellations
      setOriginalBrandInfo({ ...brandInfo });
      setLogoPreview(logoUrl);

      setSaveStatus('saved');
      setLoading(false);
      setEditMode(false);

      // Show success message
      setErrors(prev => ({ ...prev, success: 'Brand profile updated successfully!' }));

      // Clear success message after 3 seconds
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.success;
          return newErrors;
        });
      }, 3000);
    } catch (err) {
      console.error("Error saving brand data:", err);
      setErrors(prev => ({ ...prev, general: err.message || 'Failed to save brand data.' }));
      setSaveStatus('error');
      setLoading(false);
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    // Revert to original data
    setBrandInfo({ ...originalBrandInfo });
    setEditMode(false);
    setErrors({});
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <Facebook size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'instagram': return <Instagram size={18} />;
      default: return null;
    }
  };

  const renderField = (label, name, value, icon = null, type = "text") => {
    return (
      <div className="flex items-center">
        {icon && <div className="text-gray-400 mr-2">{icon}</div>}
        <div className="flex-1">
          <label className="block text-md  font-medium text-gray-700 mb-1">
            {label}
          </label>
          {editMode ? (
            <>
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {errors[name] && (
                <p className="mt-1 text-md  text-red-500">{errors[name]}</p>
              )}
            </>
          ) : (
            <p className="text-gray-800">{value || 'Not specified'}</p>
          )}
        </div>
      </div>
    );
  };

  const renderSocialField = (platform, label, value, placeholder) => {
    return (
      <div className="flex items-center">
        <div className="mr-2 text-gray-400">
          {getSocialIcon(platform)}
        </div>
        <div className="flex-1">
          <label className="block text-md  font-medium text-gray-700 mb-1">
            {label}
          </label>
          {editMode ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleSocialChange(platform, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
              placeholder={placeholder}
            />
          ) : (
            <p className="text-gray-800">
              {value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {value}
                </a>
              ) : (
                'Not specified'
              )}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Profile</h1>
              <p className="text-gray-500">Manage your brand identity and information</p>
            </div>

            <div className="flex items-center gap-3">
              {!editMode ? (
                <button
                  onClick={enterEditMode}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBrandData}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    <Save size={18} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Status indicator */}
          {saveStatus === 'saved' && !editMode && (
            <div className="fixed top-[90%] right-[2%] p-4 rounded-lg bg-white shadow-md flex items-center text-green-700 transition-opacity duration-300 ease-in-out">
              <Check size={16} className="mr-1" />
              <span className="text-md mr-28">All changes saved</span>
            </div>
          )}

          {/* Success message */}
          {errors.success && (
            <div className="fixed top-[90%] right-[2%] p-4 rounded-lg bg-white shadow-md flex items-center text-green-700 transition-opacity duration-300 ease-in-out">
              <Check size={18} className="mr-2 text-green-600" />
              <span>{errors.success}</span>
            </div>
          )}

          {/* Error display */}
          {errors.general && (
            <div className="fixed top-[90%] right-[2%] p-4 rounded-lg bg-white shadow-md flex items-center text-red-700 transition-opacity duration-300 ease-in-out">
              <div className="flex items-center">
                <AlertCircle size={18} className="mr-2 text-red-600" />
                <span>{errors.general}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-3 flex items-center border-b-2 font-medium text-md  ${activeTab === 'info'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Info size={18} className="mr-2" />
                Brand Information
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`px-4 py-3 flex items-center border-b-2 font-medium text-md  ${activeTab === 'social'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Globe size={18} className="mr-2" />
                Social Media
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with logo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Logo</h3>
              <div className="flex flex-col items-center justify-center">
                {logoPreview ? (
                  <div className="relative group mb-4">
                     <img 
      src={logoPreview} 
      alt="Brand Logo" 
      className="w-32 h-32 object-contain bg-gray-100 rounded-lg border border-gray-200" 
      onError={(e) => {
        console.error("Image failed to load");
        e.target.src = "https://via.placeholder.com/150"; // Fallback image
      }}
    />
                    {editMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center pointer-events-none">
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-2 right-2 bg-white text-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setLogoPreview(null);
                            setLogoFile(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg ${editMode ? 'cursor-pointer hover:border-gray-400' : ''} mb-4`}
                    onClick={editMode ? () => fileInputRef.current.click() : undefined}
                  >
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-md  text-gray-500">
                      {editMode ? 'Upload Logo' : 'No Logo'}
                    </span>
                  </label>
                )}
                {editMode && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="text-md  text-blue-600 hover:text-blue-800"
                    >
                      {logoPreview ? 'Replace Logo' : 'Browse Files'}
                    </button>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Recommended: Square image, at least 250x250 pixels
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Brand Information Tab */}
              {activeTab === 'info' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Brand Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-md  font-medium text-gray-700 mb-1">
                        Brand Name *
                      </label>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            name="name"
                            value={brandInfo.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            placeholder="Enter brand name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-md  text-red-500">{errors.name}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-800 font-medium">{brandInfo.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-md  font-medium text-gray-700 mb-1">
                        Tagline
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="tagline"
                          value={brandInfo.tagline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                          placeholder="Enter brand tagline"
                        />
                      ) : (
                        <p className="text-gray-800">{brandInfo.tagline || 'Not specified'}</p>
                      )}
                    </div>

                    {renderField('Email', 'email', brandInfo.email, <Mail size={18} />, 'email')}
                    {renderField('Phone', 'phone', brandInfo.phone, <Phone size={18} />)}
                    {renderField('Website', 'website', brandInfo.website, <Globe size={18} />)}
                    {renderField('Address', 'address', brandInfo.address, <Briefcase size={18} />)}

                    <div className="md:col-span-2">
                      <label className="block text-md  font-medium text-gray-700 mb-1">
                        Mission Statement
                      </label>
                      {editMode ? (
                        <textarea
                          name="mission"
                          value={brandInfo.mission}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                          placeholder="Enter your brand's mission statement"
                        />
                      ) : (
                        <p className="text-gray-800">{brandInfo.mission || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === 'social' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { platform: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourbrand' },
                      { platform: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/yourbrand' },
                      { platform: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourbrand' },
                      { platform: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourbrand' }
                    ].map(social => (
                      <React.Fragment key={social.platform}>
                        {renderSocialField(
                          social.platform,
                          social.label,
                          brandInfo.socialLinks[social.platform],
                          social.placeholder
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerBrand;