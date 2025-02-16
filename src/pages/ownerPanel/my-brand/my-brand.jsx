import React, { useState, useRef } from 'react';

const MyBrand = () => {
  // Form States
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

  // Feature 1: Multiple Theme Colors
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const themes = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    red: 'bg-red-600 hover:bg-red-700'
  };

  // Feature 2: Image Preview
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Feature 3: Form Validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feature 4: Auto-Save Status
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'

  // Feature 5: Visibility Settings
  const [visibilitySettings, setVisibilitySettings] = useState({
    isPublic: true,
    showEmail: true,
    showPhone: true,
    showAddress: true,
    showSocial: true
  });

  // Feature 6: Brand Categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Retail', 'Technology', 'Food & Beverage', 'Healthcare', 'Education', 'Entertainment'];

  // Feature 7: Language Settings
  const [selectedLanguages, setSelectedLanguages] = useState(['en']);
  const availableLanguages = ['en', 'es', 'fr', 'de', 'zh'];

  // Feature 8: Brand Keywords
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  // Feature 9: Change History
  const [changeHistory, setChangeHistory] = useState([]);

  // Feature 10: Export Settings
  const [exportFormat, setExportFormat] = useState('json');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
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
  };

  const addKeyword = () => {
    if (keywordInput && !keywords.includes(keywordInput)) {
      setKeywords([...keywords, keywordInput]);
      setKeywordInput('');
      addToHistory('Keyword added');
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
    addToHistory('Keyword removed');
  };

  const addToHistory = (action) => {
    setChangeHistory(prev => [
      { action, timestamp: new Date().toISOString() },
      ...prev
    ].slice(0, 10));
  };

  const exportSettings = () => {
    const data = {
      ...brandInfo,
      visibilitySettings,
      selectedCategories,
      selectedLanguages,
      keywords
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-settings.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className=' container-fluid'>
        {/* Header with Theme Selection */}
        <div className="border-b border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Brand Settings</h1>
            <div className="flex items-center space-x-2">
              {Object.keys(themes).map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-6 h-6 rounded-full ${themes[theme]} ${selectedTheme === theme ? 'ring-2 ring-offset-2' : ''
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Brand Logo</h3>
              <div className="flex items-center space-x-6">
                {logoPreview ? (
                  <div className="relative group">
                    <img
                      src={logoPreview}
                      alt="Brand Logo"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setLogoPreview(null);
                        addToHistory('Logo removed');
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Brand Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Brand Information</h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={brandInfo.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-${selectedTheme}-500 focus:border-${selectedTheme}-500 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter brand name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={brandInfo.tagline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter brand tagline"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                  <textarea
                    name="mission"
                    value={brandInfo.mission}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Enter mission statement"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                      } else {
                        setSelectedCategories([...selectedCategories, category]);
                      }
                      addToHistory(`Category ${selectedCategories.includes(category) ? 'removed' : 'added'}: ${category}`);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategories.includes(category)
                        ? `${themes[selectedTheme]} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Keywords</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Add keyword"
                />
                <button
                  onClick={addKeyword}
                  className={`px-4 py-2 ${themes[selectedTheme]} text-white rounded-lg transition-colors`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map(keyword => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Save Status */}
            <div className={`p-4 rounded-lg ${saveStatus === 'saved' ? 'bg-green-50 text-green-700' :
                saveStatus === 'saving' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
              }`}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {saveStatus === 'saved' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  )}
                  {saveStatus === 'saving' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  )}
                </svg>
                <span className="font-medium">
                  {saveStatus === 'saved' ? 'All changes saved' :
                    saveStatus === 'saving' ? 'Saving changes...' :
                      'Error saving changes'}
                </span>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Visibility Settings</h3>
              {Object.entries(visibilitySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray                -700 capitalize">{key.replace('show', 'Show ').replace('is', 'Is ')}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => {
                      setVisibilitySettings(prev => ({
                        ...prev,
                        [key]: !prev[key]
                      }));
                      addToHistory(`Visibility setting changed: ${key}`);
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
              ))}
            </div>

            {/* Language Selection */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Language Settings</h3>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguages(prev =>
                        prev.includes(lang)
                          ? prev.filter(l => l !== lang)
                          : [...prev, lang]
                      );
                      addToHistory(`Language ${selectedLanguages.includes(lang) ? 'removed' : 'added'}: ${lang}`);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedLanguages.includes(lang)
                        ? `${themes[selectedTheme]} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Settings</h3>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
              <button
                onClick={exportSettings}
                className={`w-full px-4 py-2 ${themes[selectedTheme]} text-white rounded-lg transition-colors`}
              >
                Export
              </button>
            </div>

            {/* Change History */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Change History</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {changeHistory.length === 0 ? (
                  <li className="text-gray-400">No recent changes</li>
                ) : (
                  changeHistory.map((entry, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{entry.action}</span>
                      <span className="text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBrand;
