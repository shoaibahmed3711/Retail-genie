import React, { useState, useRef, useEffect } from 'react';

const MyBrand = () => {
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
      instagram: '',
      youtube: '', // New social platform
      pinterest: '' // New social platform
    },
    businessHours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '10:00', close: '15:00', isOpen: false },
      sunday: { open: '10:00', close: '15:00', isOpen: false }
    }
  });

  // Enhanced Theme System
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const themes = {
    blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', ring: 'ring-blue-500' },
    green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', ring: 'ring-green-500' },
    purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', ring: 'ring-purple-500' },
    red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', ring: 'ring-red-500' }
  };

  // Multiple Image Support
  const [logoPreview, setLogoPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Enhanced Form Validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [saveStatus, setSaveStatus] = useState('saved');
  const [visibilitySettings, setVisibilitySettings] = useState({
    isPublic: true,
    showEmail: true,
    showPhone: true,
    showAddress: true,
    showSocial: true,
    showGallery: true // New visibility option
  });

  // Enhanced Categories with Custom Input
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const predefinedCategories = ['Retail', 'Technology', 'Food & Beverage', 'Healthcare', 'Education', 'Entertainment'];

  const [selectedLanguages, setSelectedLanguages] = useState(['en']);
  const availableLanguages = ['en', 'es', 'fr', 'de', 'zh', 'it', 'ja'];

  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  const [changeHistory, setChangeHistory] = useState([]);
  const [exportFormat, setExportFormat] = useState('json');

  // New Feature: Team Members
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMemberInput, setTeamMemberInput] = useState({ name: '', role: '' });

  // New Feature: Analytics
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'saving') setSaveStatus('saved');
    }, 1000);
    return () => clearTimeout(timer);
  }, [saveStatus]);

  // Handlers
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        addToHistory('Logo updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newImages).then(results => {
      setGalleryImages(prev => [...prev, ...results].slice(0, 6)); // Limit to 6 images
      addToHistory('Gallery images added');
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setSaveStatus('saving');
    validateField(name, value);
    addToHistory(`Updated ${name}`);
  };

  const handleSocialChange = (platform, value) => {
    setBrandInfo(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
    setSaveStatus('saving');
    addToHistory(`Updated social ${platform}`);
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

  const addKeyword = () => {
    if (keywordInput && !keywords.includes(keywordInput)) {
      setKeywords([...keywords, keywordInput]);
      setKeywordInput('');
      addToHistory('Keyword added');
    }
  };

  const addCustomCategory = () => {
    if (customCategory && !selectedCategories.includes(customCategory)) {
      setSelectedCategories([...selectedCategories, customCategory]);
      setCustomCategory('');
      addToHistory('Custom category added');
    }
  };

  const addTeamMember = () => {
    if (teamMemberInput.name && teamMemberInput.role) {
      setTeamMembers([...teamMembers, { ...teamMemberInput }]);
      setTeamMemberInput({ name: '', role: '' });
      addToHistory('Team member added');
    }
  };

  const removeItem = (setter, array, item, historyMessage) => {
    setter(array.filter(i => i !== item));
    addToHistory(historyMessage);
  };

  const addToHistory = (action) => {
    setChangeHistory(prev => [
      { action, timestamp: new Date().toISOString() },
      ...prev
    ].slice(0, 15)); // Increased history limit
  };

  const exportSettings = () => {
    const data = {
      brandInfo,
      visibilitySettings,
      selectedCategories,
      selectedLanguages,
      keywords,
      teamMembers,
      galleryImages
    };
    const blob = exportFormat === 'json'
      ? new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      : new Blob([convertToCSV(data)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-settings-${Date.now()}.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    const headers = ['Field,Value'];
    const rows = Object.entries(data.brandInfo).map(([key, value]) => 
      `${key},${typeof value === 'object' ? JSON.stringify(value) : value}`
    );
    return [...headers, ...rows].join('\n');
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid">
        {/* Enhanced Header */}
        <div className="border-b border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Brand Settings</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${saveStatus === 'saved' ? 'bg-green-100 text-green-700' : 
                saveStatus === 'saving' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {saveStatus}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`${themes[selectedTheme].bg} ${themes[selectedTheme].hover} text-white px-4 py-2 rounded-lg`}
              >
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </button>
              {Object.keys(themes).map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-6 h-6 rounded-full ${themes[theme].bg} ${selectedTheme === theme ? 'ring-2 ring-offset-2' : ''}`}
                  title={theme}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logo & Gallery */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Brand Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                  {logoPreview ? (
                    <div className="relative group">
                      <img src={logoPreview} alt="Logo" className="w-32 h-32 object-cover rounded-lg" />
                      <button
                        onClick={() => setLogoPreview(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Gallery (Max 6)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Gallery ${index}`} className="w-20 h-20 object-cover rounded" />
                        <button
                          onClick={() => removeItem(setGalleryImages, galleryImages, img, 'Gallery image removed')}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {galleryImages.length < 6 && (
                      <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                        <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} accept="image/*" multiple className="hidden" />
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Information */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Brand Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'name', label: 'Brand Name *', placeholder: 'Enter brand name' },
                  { name: 'tagline', label: 'Tagline', placeholder: 'Enter brand tagline' },
                  { name: 'email', label: 'Email', placeholder: 'Enter email', type: 'email' },
                  { name: 'phone', label: 'Phone', placeholder: 'Enter phone number' },
                  { name: 'website', label: 'Website', placeholder: 'Enter website URL' },
                  { name: 'address', label: 'Address', placeholder: 'Enter address' }
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={brandInfo[field.name]}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${themes[selectedTheme].ring} outline-none ${
                        errors[field.name] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>}
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                  <textarea
                    name="mission"
                    value={brandInfo.mission}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${themes[selectedTheme].ring} outline-none border-gray-300`}
                    placeholder="Enter mission statement"
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={teamMemberInput.name}
                  onChange={(e) => setTeamMemberInput(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Member name"
                />
                <input
                  type="text"
                  value={teamMemberInput.role}
                  onChange={(e) => setTeamMemberInput(prev => ({ ...prev, role: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Member role"
                />
                <button
                  onClick={addTeamMember}
                  className={`${themes[selectedTheme].bg} ${themes[selectedTheme].hover} text-white px-4 py-2 rounded-lg`}
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{member.name} - {member.role}</span>
                    <button
                      onClick={() => removeItem(setTeamMembers, teamMembers, member, 'Team member removed')}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories & Keywords */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Categories & Keywords</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Add custom category"
                      />
                      <button
                        onClick={addCustomCategory}
                        className={`${themes[selectedTheme].bg} ${themes[selectedTheme].hover} text-white px-4 py-2 rounded-lg`}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {predefinedCategories.concat(selectedCategories.filter(c => !predefinedCategories.includes(c))).map(category => (
                        <button
                          key={category}
                          onClick={() => removeItem(setSelectedCategories, selectedCategories, category, `Category removed: ${category}`)}
                          className={`${selectedCategories.includes(category) ? `${themes[selectedTheme].bg} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-3 py-1 rounded-full text-sm`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Add keyword"
                      />
                      <button
                        onClick={addKeyword}
                        className={`${themes[selectedTheme].bg} ${themes[selectedTheme].hover} text-white px-4 py-2 rounded-lg`}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map(keyword => (
                        <span key={keyword} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                          {keyword}
                          <button onClick={() => removeItem(setKeywords, keywords, keyword, 'Keyword removed')} className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analytics (Mock) */}
            {showAnalytics && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
                <div className="space-y-4">
                  <div>Profile Views: {Math.floor(Math.random() * 1000)}</div>
                  <div>Social Clicks: {Math.floor(Math.random() * 500)}</div>
                  <div>Changes This Week: {changeHistory.length}</div>
                </div>
              </div>
            )}

            {/* Visibility Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visibility Settings</h3>
              {Object.entries(visibilitySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace('is', 'Is')}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => {
                      setVisibilitySettings(prev => ({ ...prev, [key]: !prev[key] }));
                      addToHistory(`Visibility changed: ${key}`);
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
              ))}
            </div>

            {/* Language Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguages(prev => 
                        prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
                      );
                      addToHistory(`Language ${selectedLanguages.includes(lang) ? 'removed' : 'added'}: ${lang}`);
                    }}
                    className={`${selectedLanguages.includes(lang) ? `${themes[selectedTheme].bg} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-3 py-1 rounded-full text-sm`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export</h3>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
              <button
                onClick={exportSettings}
                className={`${themes[selectedTheme].bg} ${themes[selectedTheme].hover} w-full text-white px-4 py-2 rounded-lg`}
              >
                Export Settings
              </button>
            </div>

            {/* Change History */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Change History</h3>
              <div className="max-h-64 overflow-y-auto">
                {changeHistory.map((entry, index) => (
                  <div key={index} className="py-2 border-b border-gray-100 text-sm">
                    <div>{entry.action}</div>
                    <div className="text-gray-500 text-xs">{new Date(entry.timestamp).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBrand;