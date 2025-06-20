
import { useState, useCallback } from "react";
import { Upload, Camera, MapPin, DollarSign, Users, Zap, Car, Check, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ImageAnalysis {
  tags: string[];
  style: string;
  lighting: string;
  mood: string;
  technicalFeatures: string[];
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  isHero: boolean;
  analysis?: ImageAnalysis;
  analyzing: boolean;
}

const UploadLocation = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    sizeM2: "",
    powerAmps: "",
    maxCrew: "",
    amenities: [] as string[],
    availability: "flexible"
  });

  // Mock AI image analysis function
  const analyzeImage = async (file: File): Promise<ImageAnalysis> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on file name and random generation for demo
    const styles = ["Modern Studio", "Spanish Colonial", "Tropical Villa", "Urban Loft", "Industrial", "Minimalist", "Vintage", "Beachfront"];
    const lighting = ["Natural light", "Golden hour", "Dramatic shadows", "Soft diffused", "High contrast"];
    const moods = ["Serene", "Dramatic", "Romantic", "Professional", "Rustic", "Luxurious"];
    const features = ["Power outlets", "High ceilings", "Large windows", "Open space", "Water access", "Sunset views"];
    
    return {
      tags: [styles[Math.floor(Math.random() * styles.length)], "Professional"],
      style: styles[Math.floor(Math.random() * styles.length)],
      lighting: lighting[Math.floor(Math.random() * lighting.length)],
      mood: moods[Math.floor(Math.random() * moods.length)],
      technicalFeatures: features.slice(0, Math.floor(Math.random() * 3) + 1)
    };
  };

  const handleImageUpload = useCallback(async (files: FileList) => {
    const newImages: UploadedImage[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
      isHero: images.length === 0 && index === 0,
      analyzing: true
    }));

    setImages(prev => [...prev, ...newImages]);

    // Analyze each image
    for (const image of newImages) {
      try {
        const analysis = await analyzeImage(image.file);
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, analysis, analyzing: false }
            : img
        ));
      } catch (error) {
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, analyzing: false }
            : img
        ));
      }
    }
  }, [images.length]);

  const setAsHero = (imageId: string) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isHero: img.id === imageId
    })));
  };

  const removeImage = (imageId: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);
      if (filtered.length > 0 && !filtered.some(img => img.isHero)) {
        filtered[0].isHero = true;
      }
      return filtered;
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting location:", { formData, images });
    // Here you would upload to your backend
    navigate("/");
  };

  const amenityOptions = [
    "Power outlets", "Parking", "WiFi", "AC", "Natural light", 
    "Bathroom", "Kitchen", "Security", "Equipment rental", "Catering"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Share Your Perfect Location
            </h1>
            <p className="text-lg text-gray-600">
              Help photographers and videographers discover your amazing space
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-coral-500" />
                Location Images
              </h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-coral-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    Drop images here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload high-quality images. First image will be your hero image.
                  </p>
                </label>
              </div>

              {/* Uploaded Images Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={image.url}
                          alt="Location"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Hero Badge */}
                        {image.isHero && (
                          <div className="absolute top-2 left-2 bg-coral-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                            Hero
                          </div>
                        )}

                        {/* Analysis Status */}
                        {image.analyzing && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white text-center">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                              <p className="text-sm">Analyzing...</p>
                            </div>
                          </div>
                        )}

                        {/* Controls */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!image.isHero && (
                            <button
                              type="button"
                              onClick={() => setAsHero(image.id)}
                              className="bg-white/90 p-1 rounded-lg hover:bg-white transition-colors"
                              title="Set as hero image"
                            >
                              <Camera className="h-4 w-4 text-gray-700" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="bg-red-500/90 p-1 rounded-lg hover:bg-red-500 transition-colors"
                            title="Remove image"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* AI Analysis Results */}
                      {image.analysis && !image.analyzing && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-700 mb-1">AI Analysis:</p>
                          <div className="flex flex-wrap gap-1">
                            {image.analysis.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-coral-100 text-coral-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {image.analysis.style} • {image.analysis.lighting}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-coral-500" />
                Location Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="e.g., Stunning Modern Villa with Pool"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Address
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="e.g., Makati, Metro Manila"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="Describe your location, its unique features, and what makes it perfect for shoots..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-coral-500" />
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day (₱)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="12000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.sizeM2}
                    onChange={(e) => setFormData(prev => ({ ...prev, sizeM2: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (Amps)
                  </label>
                  <input
                    type="number"
                    value={formData.powerAmps}
                    onChange={(e) => setFormData(prev => ({ ...prev, powerAmps: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Crew Size
                  </label>
                  <input
                    type="number"
                    value={formData.maxCrew}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxCrew: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    placeholder="15"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {amenityOptions.map(amenity => (
                    <label 
                      key={amenity} 
                      className={`flex items-center p-3 rounded-xl cursor-pointer transition-all border ${
                        formData.amenities.includes(amenity)
                          ? 'bg-coral-50 border-coral-200 text-coral-700'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                        formData.amenities.includes(amenity)
                          ? 'bg-coral-500 border-coral-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.amenities.includes(amenity) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={images.length === 0 || images.some(img => img.analyzing)}
                className="flex-1 bg-coral-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {images.some(img => img.analyzing) ? "Processing Images..." : "Publish Location"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadLocation;
