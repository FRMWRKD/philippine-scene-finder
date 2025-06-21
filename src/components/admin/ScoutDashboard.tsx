import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Edit, Trash, Star, Calendar, DollarSign, User, Link, Youtube, Film, X, MoveUp, MoveDown, Camera, Palette, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetailedPropertyImage {
  id: number;
  url: string;
  title: string;
  description: string;
  alt: string;
  category: string; // "exterior", "interior", "aerial", "detail", "panoramic"
  lighting: string; // "golden-hour", "blue-hour", "daylight", "overcast", "night"
  season: string; // "spring", "summer", "autumn", "winter"
  weather: string; // "sunny", "cloudy", "rainy", "foggy", "stormy"
  colors: string[]; // dominant colors
  size: string; // "landscape", "portrait", "square"
  quality: string; // "high", "medium", "low"
  metaTags: string[]; // searchable tags
  technicalSpecs: {
    resolution: string;
    fileSize: string;
    camera: string;
    lens: string;
    settings: string;
  };
  usage: string[]; // "hero", "gallery", "thumbnail", "background"
  isPrimary: boolean;
  order: number;
}

interface AttachedMovie {
  id: number;
  title: string;
  year: string;
  role: string;
  description: string;
  genre: string;
  director: string;
  imdbUrl?: string;
  trailerUrl?: string;
}

interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  bookings: number;
  rating: number;
  description: string;
  images: DetailedPropertyImage[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: AttachedMovie[];
}

const ImageManager = ({
  property,
  handleAddDetailedImage,
  handleDeleteImage,
  handleUpdateImage,
  handleMoveImage,
}: {
  property: Property;
  handleAddDetailedImage: (propertyId: number, imageData: Omit<DetailedPropertyImage, "id" | "order">) => void;
  handleDeleteImage: (propertyId: number, imageId: number) => void;
  handleUpdateImage: (propertyId: number, imageId: number, updates: Partial<DetailedPropertyImage>) => void;
  handleMoveImage: (propertyId: number, imageId: number, direction: "up" | "down") => void;
}) => {
  return (
    <TabsContent value="images" className="space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-medium">Smart Image Management</h5>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
              <Camera className="h-4 w-4 mr-1" />
              Add Smart Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Smart Image with Detailed Metadata</DialogTitle>
              <CardDescription>Complete image profile for perfect location matching</CardDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleAddDetailedImage(property.id, {
                  url: formData.get("url") as string,
                  title: formData.get("title") as string,
                  description: formData.get("description") as string,
                  alt: formData.get("alt") as string,
                  category: formData.get("category") as string,
                  lighting: formData.get("lighting") as string,
                  season: formData.get("season") as string,
                  weather: formData.get("weather") as string,
                  colors: (formData.get("colors") as string).split(",").map((c) => c.trim()),
                  size: formData.get("size") as string,
                  quality: formData.get("quality") as string,
                  metaTags: (formData.get("metaTags") as string).split(",").map((t) => t.trim()),
                  technicalSpecs: {
                    resolution: formData.get("resolution") as string,
                    fileSize: formData.get("fileSize") as string,
                    camera: formData.get("camera") as string,
                    lens: formData.get("lens") as string,
                    settings: formData.get("settings") as string,
                  },
                  usage: (formData.get("usage") as string).split(",").map((u) => u.trim()),
                  isPrimary: formData.get("isPrimary") === "on",
                });
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="url">Image URL</Label>
                  <Input name="url" placeholder="https://..." required />
                </div>
                <div>
                  <Label htmlFor="title">Image Title</Label>
                  <Input name="title" placeholder="Descriptive title" required />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea name="description" placeholder="Comprehensive description for location matching" required />
              </div>

              <div>
                <Label htmlFor="alt">Alt Text (Accessibility)</Label>
                <Input name="alt" placeholder="Alt text for screen readers" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Image type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exterior">Exterior</SelectItem>
                      <SelectItem value="interior">Interior</SelectItem>
                      <SelectItem value="aerial">Aerial</SelectItem>
                      <SelectItem value="detail">Detail Shot</SelectItem>
                      <SelectItem value="panoramic">Panoramic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Lighting</Label>
                  <Select name="lighting" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Light condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="golden-hour">Golden Hour</SelectItem>
                      <SelectItem value="blue-hour">Blue Hour</SelectItem>
                      <SelectItem value="daylight">Daylight</SelectItem>
                      <SelectItem value="overcast">Overcast</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Season</Label>
                  <Select name="season" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="autumn">Autumn</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Weather</Label>
                  <Select name="weather" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Weather" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunny">Sunny</SelectItem>
                      <SelectItem value="cloudy">Cloudy</SelectItem>
                      <SelectItem value="rainy">Rainy</SelectItem>
                      <SelectItem value="foggy">Foggy</SelectItem>
                      <SelectItem value="stormy">Stormy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Size Format</Label>
                  <Select name="size" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landscape">Landscape</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Quality</Label>
                  <Select name="quality" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Dominant Colors (comma-separated)
                  </Label>
                  <Input name="colors" placeholder="blue, white, golden, green" required />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Meta Tags (comma-separated)
                  </Label>
                  <Input name="metaTags" placeholder="sunset, romantic, wide-shot, tropical" required />
                </div>
              </div>

              <div>
                <Label>Usage Intent (comma-separated)</Label>
                <Input name="usage" placeholder="hero, gallery, thumbnail, background" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Resolution</Label>
                  <Input name="resolution" placeholder="4K, 1080p, etc." />
                </div>
                <div>
                  <Label>File Size</Label>
                  <Input name="fileSize" placeholder="8.2MB" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Camera</Label>
                  <Input name="camera" placeholder="Canon EOS R5" />
                </div>
                <div>
                  <Label>Lens</Label>
                  <Input name="lens" placeholder="24-70mm f/2.8" />
                </div>
              </div>

              <div>
                <Label>Camera Settings</Label>
                <Input name="settings" placeholder="f/8, 1/250s, ISO 100" />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isPrimary" id="isPrimary" />
                <Label htmlFor="isPrimary">Set as Primary Image</Label>
              </div>

              <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                Add Smart Image
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {property.images.map((image, index) => (
          <Card key={image.id} className="p-6 border-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <img src={image.url} alt={image.alt} className="w-full h-48 object-cover rounded-lg" />
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMoveImage(property.id, image.id, "up")}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMoveImage(property.id, image.id, "down")}
                      disabled={index === property.images.length - 1}
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(property.id, image.id)}>
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    defaultValue={image.title}
                    onBlur={(e) => handleUpdateImage(property.id, image.id, { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    defaultValue={image.description}
                    onBlur={(e) => handleUpdateImage(property.id, image.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    defaultValue={image.alt}
                    onBlur={(e) => handleUpdateImage(property.id, image.id, { alt: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Category</Label>
                    <Select
                      defaultValue={image.category}
                      onValueChange={(value) => handleUpdateImage(property.id, image.id, { category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exterior">Exterior</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="aerial">Aerial</SelectItem>
                        <SelectItem value="detail">Detail</SelectItem>
                        <SelectItem value="panoramic">Panoramic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Lighting</Label>
                    <Select
                      defaultValue={image.lighting}
                      onValueChange={(value) => handleUpdateImage(property.id, image.id, { lighting: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="golden-hour">Golden Hour</SelectItem>
                        <SelectItem value="blue-hour">Blue Hour</SelectItem>
                        <SelectItem value="daylight">Daylight</SelectItem>
                        <SelectItem value="overcast">Overcast</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Season</Label>
                    <Select
                      defaultValue={image.season}
                      onValueChange={(value) => handleUpdateImage(property.id, image.id, { season: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="autumn">Autumn</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Weather</Label>
                    <Select
                      defaultValue={image.weather}
                      onValueChange={(value) => handleUpdateImage(property.id, image.id, { weather: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunny">Sunny</SelectItem>
                        <SelectItem value="cloudy">Cloudy</SelectItem>
                        <SelectItem value="rainy">Rainy</SelectItem>
                        <SelectItem value="foggy">Foggy</SelectItem>
                        <SelectItem value="stormy">Stormy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Colors
                  </Label>
                  <Input
                    defaultValue={image.colors.join(", ")}
                    onBlur={(e) =>
                      handleUpdateImage(property.id, image.id, { colors: e.target.value.split(",").map((c) => c.trim()) })
                    }
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Meta Tags
                  </Label>
                  <Input
                    defaultValue={image.metaTags.join(", ")}
                    onBlur={(e) =>
                      handleUpdateImage(property.id, image.id, { metaTags: e.target.value.split(",").map((t) => t.trim()) })
                    }
                  />
                </div>

                <div>
                  <Label>Usage Intent</Label>
                  <Input
                    defaultValue={image.usage.join(", ")}
                    onBlur={(e) =>
                      handleUpdateImage(property.id, image.id, { usage: e.target.value.split(",").map((u) => u.trim()) })
                    }
                  />
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <div>
                    <strong>Resolution:</strong> {image.technicalSpecs.resolution}
                  </div>
                  <div>
                    <strong>Camera:</strong> {image.technicalSpecs.camera}
                  </div>
                  <div>
                    <strong>Settings:</strong> {image.technicalSpecs.settings}
                  </div>
                </div>

                {image.isPrimary && <Badge className="bg-coral-500">Primary Image</Badge>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};

const TagManager = ({
  property,
  handleAddTag,
  handleDeleteTag,
  handleUpdateTag,
}: {
  property: Property;
  handleAddTag: (propertyId: number, tag: string) => void;
  handleDeleteTag: (propertyId: number, tagIndex: number) => void;
  handleUpdateTag: (propertyId: number, tagIndex: number, newTag: string) => void;
}) => {
  return (
    <TabsContent value="tags" className="space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-medium">Property Tags</h5>
        <div className="flex gap-2">
          <Input
            placeholder="New tag..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTag(property.id, e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <Button
            size="sm"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              handleAddTag(property.id, input.value);
              input.value = "";
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {property.tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
            <Input
              defaultValue={tag}
              className="border-none bg-transparent p-0 h-auto text-sm min-w-0 w-auto"
              onBlur={(e) => handleUpdateTag(property.id, index, e.target.value)}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-red-100"
              onClick={() => handleDeleteTag(property.id, index)}
            >
              <X className="h-3 w-3 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </TabsContent>
  );
};

const MovieManager = ({
  property,
  handleAddMovie,
  handleDeleteMovie,
}: {
  property: Property;
  handleAddMovie: (propertyId: number, movieData: Omit<AttachedMovie, "id">) => void;
  handleDeleteMovie: (propertyId: number, movieId: number) => void;
}) => {
  return (
    <TabsContent value="movies" className="space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-medium">Attached Movies/Films</h5>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Film className="h-4 w-4 mr-1" />
              Attach Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Attach Movie/Film</DialogTitle>
              <CardDescription>Add details about movies filmed at this location</CardDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleAddMovie(property.id, {
                  title: formData.get("title") as string,
                  year: formData.get("year") as string,
                  role: formData.get("role") as string,
                  description: formData.get("description") as string,
                  genre: formData.get("genre") as string,
                  director: formData.get("director") as string,
                  imdbUrl: formData.get("imdbUrl") as string,
                  trailerUrl: formData.get("trailerUrl") as string,
                });
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-4 grid grid-cols-2 gap-4"
            >
              <div>
                <Label htmlFor="title">Movie Title</Label>
                <Input name="title" required />
              </div>
              <div>
                <Label htmlFor="year">Release Year</Label>
                <Input name="year" required />
              </div>
              <div>
                <Label htmlFor="director">Director</Label>
                <Input name="director" required />
              </div>
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input name="genre" required />
              </div>
              <div>
                <Label htmlFor="role">Location Role</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Location">Main Location</SelectItem>
                    <SelectItem value="Supporting Location">Supporting Location</SelectItem>
                    <SelectItem value="Background Location">Background Location</SelectItem>
                    <SelectItem value="Cameo Appearance">Cameo Appearance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="imdbUrl">IMDB URL (Optional)</Label>
                <Input name="imdbUrl" placeholder="https://imdb.com/..." />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" placeholder="How was this location used in the film?" required />
              </div>
              <div className="col-span-2">
                <Label htmlFor="trailerUrl">Trailer URL (Optional)</Label>
                <Input name="trailerUrl" placeholder="https://youtube.com/..." />
              </div>
              <Button type="submit" className="col-span-2">
                Attach Movie
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {(property.attachedMovies || []).map((movie) => (
          <Card key={movie.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h6 className="font-semibold text-lg">
                    {movie.title} ({movie.year})
                  </h6>
                  <Badge variant="outline">{movie.role}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Director:</strong> {movie.director}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="text-sm">{movie.description}</p>
                {movie.imdbUrl && (
                  <a
                    href={movie.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View on IMDB
                  </a>
                )}
                {movie.trailerUrl && (
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 text-sm hover:underline ml-4"
                  >
                    Watch Trailer
                  </a>
                )}
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteMovie(property.id, movie.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};

const PropertyCard = ({
  property,
  setEditingProperty,
  handleToggleStatus,
  handleDeleteProperty,
  handleAddDetailedImage,
  handleDeleteImage,
  handleUpdateImage,
  handleMoveImage,
  handleAddTag,
  handleDeleteTag,
  handleUpdateTag,
  handleAddMovie,
  handleDeleteMovie,
}: {
  property: Property;
  setEditingProperty: React.Dispatch<React.SetStateAction<Property | null>>;
  handleToggleStatus: (propertyId: number) => void;
  handleDeleteProperty: (propertyId: number) => void;
  handleAddDetailedImage: (propertyId: number, imageData: Omit<DetailedPropertyImage, "id" | "order">) => void;
  handleDeleteImage: (propertyId: number, imageId: number) => void;
  handleUpdateImage: (propertyId: number, imageId: number, updates: Partial<DetailedPropertyImage>) => void;
  handleMoveImage: (propertyId: number, imageId: number, direction: "up" | "down") => void;
  handleAddTag: (propertyId: number, tag: string) => void;
  handleDeleteTag: (propertyId: number, tagIndex: number) => void;
  handleUpdateTag: (propertyId: number, tagIndex: number, newTag: string) => void;
  handleAddMovie: (propertyId: number, movieData: Omit<AttachedMovie, "id">) => void;
  handleDeleteMovie: (propertyId: number, movieId: number) => void;
}) => {
  return (
    <Card key={property.id} className="border-2 border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={property.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
              alt={property.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">{property.name}</h4>
              <p className="text-gray-600">{property.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={property.status === "active" ? "default" : "secondary"}>{property.status}</Badge>
                <span className="text-coral-600 font-semibold">{property.price}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditingProperty(property)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Details
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleToggleStatus(property.id)}>
              Toggle Status
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images">Smart Images ({property.images.length})</TabsTrigger>
            <TabsTrigger value="tags">Tags ({property.tags.length})</TabsTrigger>
            <TabsTrigger value="movies">Movies ({(property.attachedMovies || []).length})</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <ImageManager
            property={property}
            handleAddDetailedImage={handleAddDetailedImage}
            handleDeleteImage={handleDeleteImage}
            handleUpdateImage={handleUpdateImage}
            handleMoveImage={handleMoveImage}
          />

          <TagManager property={property} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag} handleUpdateTag={handleUpdateTag} />

          <MovieManager property={property} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} />

          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Features</Label>
                <div className="space-y-2 mt-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        defaultValue={feature}
                        onBlur={(e) => {
                          const newFeatures = [...property.features];
                          newFeatures[index] = e.target.value;
                          setEditingProperty((prev) => {
                            if (!prev) return prev;
                            return { ...prev, features: newFeatures };
                          });
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const newFeatures = property.features.filter((_, i) => i !== index);
                          setEditingProperty((prev) => {
                            if (!prev) return prev;
                            return { ...prev, features: newFeatures };
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Amenities</Label>
                <div className="space-y-2 mt-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        defaultValue={amenity}
                        onBlur={(e) => {
                          const newAmenities = [...property.amenities];
                          newAmenities[index] = e.target.value;
                          setEditingProperty((prev) => {
                            if (!prev) return prev;
                            return { ...prev, amenities: newAmenities };
                          });
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const newAmenities = property.amenities.filter((_, i) => i !== index);
                          setEditingProperty((prev) => {
                            if (!prev) return prev;
                            return { ...prev, amenities: newAmenities };
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ScoutDashboard = () => {
  const { toast } = useToast();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [scoutProfile, setScoutProfile] = useState({
    name: "Maria Santos",
    bio: "Professional location scout with 10+ years experience in the Philippines film industry",
    email: "maria@example.com",
    phone: "+63 917 123 4567",
    website: "www.mariascout.com",
    instagram: "@mariascout",
    facebook: "Maria Santos Location Scout",
    linkedin: "maria-santos-scout",
    youtube: "Maria Santos Films",
    experience: "10 years",
    specialty: "Beach & Mountain Locations",
    filmography: [
      { title: "Island Paradise", year: "2023", role: "Location Scout" },
      { title: "Mountain Dreams", year: "2022", role: "Assistant Location Manager" },
      { title: "Coastal Journey", year: "2021", role: "Location Scout" },
    ],
    awards: ["Best Location Scout 2023", "Outstanding Service Award 2022"],
  });

  const [scoutProperties, setScoutProperties] = useState<Property[]>([
    {
      id: 1,
      name: "Boracay Beach Resort",
      location: "Boracay, Aklan",
      category: "Beach",
      price: "₱5,000",
      status: "active",
      bookings: 24,
      rating: 4.8,
      description: "Beautiful beachfront location perfect for photoshoots and film productions",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          title: "Main Beach View",
          description: "Stunning wide-angle view of the pristine white sand beach",
          alt: "Boracay beach main view",
          category: "exterior",
          lighting: "golden-hour",
          season: "summer",
          weather: "sunny",
          colors: ["blue", "white", "golden"],
          size: "landscape",
          quality: "high",
          metaTags: ["beach", "sunset", "tropical", "paradise", "wide-shot"],
          technicalSpecs: {
            resolution: "4K",
            fileSize: "8.2MB",
            camera: "Canon EOS R5",
            lens: "24-70mm f/2.8",
            settings: "f/8, 1/250s, ISO 100",
          },
          usage: ["hero", "gallery"],
          isPrimary: true,
          order: 1,
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
          title: "Romantic Sunset",
          description: "Perfect romantic sunset angle for wedding scenes",
          alt: "Beautiful sunset at Boracay",
          category: "exterior",
          lighting: "golden-hour",
          season: "summer",
          weather: "sunny",
          colors: ["orange", "pink", "purple"],
          size: "landscape",
          quality: "high",
          metaTags: ["sunset", "romantic", "silhouette", "dramatic"],
          technicalSpecs: {
            resolution: "4K",
            fileSize: "7.8MB",
            camera: "Canon EOS R5",
            lens: "70-200mm f/2.8",
            settings: "f/5.6, 1/500s, ISO 200",
          },
          usage: ["gallery", "hero"],
          isPrimary: false,
          order: 2,
        },
      ],
      features: ["Beachfront Access", "Sunset Views", "Private Beach", "Water Sports", "Restaurant"],
      tags: ["Beach", "Sunset", "Water", "Tropical", "Resort"],
      amenities: ["Parking", "WiFi", "Restrooms", "Catering Available", "Equipment Rental"],
      attachedMovies: [
        {
          id: 1,
          title: "Island Paradise",
          year: "2023",
          role: "Main Location",
          description: "Primary filming location for beach scenes",
          genre: "Romance",
          director: "Juan Dela Cruz",
          imdbUrl: "https://imdb.com/title/123",
          trailerUrl: "https://youtube.com/watch?v=123",
        },
        {
          id: 2,
          title: "Tropical Dreams",
          year: "2022",
          role: "Supporting Location",
          description: "Used for sunset romantic scenes",
          genre: "Drama",
          director: "Maria Garcia",
        },
      ],
    },
    {
      id: 2,
      name: "Baguio Mountain View",
      location: "Baguio City",
      category: "Mountain",
      price: "₱3,500",
      status: "active",
      bookings: 18,
      rating: 4.6,
      description: "Scenic mountain views with cool climate and pine forests",
      images: [
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1464822759844-d150165c4795",
          title: "Mountain Panorama",
          description: "Breathtaking panoramic view of the mountain range",
          alt: "Baguio mountain view",
          category: "exterior",
          lighting: "daylight",
          season: "autumn",
          weather: "cloudy",
          colors: ["green", "brown", "gray"],
          size: "landscape",
          quality: "high",
          metaTags: ["mountain", "panoramic", "nature", "scenic"],
          technicalSpecs: {
            resolution: "4K",
            fileSize: "9.1MB",
            camera: "Sony A7R IV",
            lens: "16-35mm f/2.8",
            settings: "f/11, 1/125s, ISO 100",
          },
          usage: ["hero", "background"],
          isPrimary: true,
          order: 1,
        },
      ],
      features: ["Mountain Views", "Cool Climate", "Pine Trees", "Hiking Trails"],
      tags: ["Mountain", "Nature", "Cool", "Pine", "Hiking"],
      amenities: ["Parking", "Guide Available", "Camping Allowed"],
      attachedMovies: [
        {
          id: 3,
          title: "Mountain Dreams",
          year: "2022",
          role: "Main Location",
          description: "Featured throughout the film",
          genre: "Adventure",
          director: "Pedro Santos",
        },
      ],
    },
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7,
  });

  // Enhanced Image Management Functions
  const handleAddDetailedImage = (propertyId: number, imageData: Omit<DetailedPropertyImage, "id" | "order">) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              images: [
                ...p.images,
                {
                  id: Date.now(),
                  order: p.images.length + 1,
                  ...imageData,
                },
              ],
            }
          : p
      )
    );
    toast({ title: "Image Added", description: "Detailed image has been added to the property." });
  };

  const handleDeleteImage = (propertyId: number, imageId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, images: p.images.filter((img) => img.id !== imageId) } : p
      )
    );
    toast({ title: "Image Deleted", description: "Image has been removed from the property." });
  };

  const handleUpdateImage = (propertyId: number, imageId: number, updates: Partial<DetailedPropertyImage>) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? { ...p, images: p.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)) }
          : p
      )
    );
    toast({ title: "Image Updated", description: "Image details have been updated." });
  };

  const handleMoveImage = (propertyId: number, imageId: number, direction: "up" | "down") => {
    setScoutProperties((properties) =>
      properties.map((p) => {
        if (p.id === propertyId) {
          const images = [...p.images];
          const index = images.findIndex((img) => img.id === imageId);
          if (index === -1) return p;

          const newIndex = direction === "up" ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= images.length) return p;

          [images[index], images[newIndex]] = [images[newIndex], images[index]];
          return { ...p, images };
        }
        return p;
      })
    );
    toast({ title: "Image Reordered", description: `Image moved ${direction}.` });
  };

  // Tag Management Functions
  const handleAddTag = (propertyId: number, tag: string) => {
    if (!tag.trim()) return;
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: [...p.tags, tag.trim()] } : p
      )
    );
    toast({ title: "Tag Added", description: `Tag "${tag}" has been added.` });
  };

  const handleDeleteTag = (propertyId: number, tagIndex: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: p.tags.filter((_, index) => index !== tagIndex) } : p
      )
    );
    toast({ title: "Tag Deleted", description: "Tag has been removed." });
  };

  const handleUpdateTag = (propertyId: number, tagIndex: number, newTag: string) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: p.tags.map((tag, index) => (index === tagIndex ? newTag : tag)) } : p
      )
    );
    toast({ title: "Tag Updated", description: "Tag has been updated." });
  };

  // Movie Management Functions
  const handleAddMovie = (propertyId: number, movieData: Omit<AttachedMovie, "id">) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, attachedMovies: [...(p.attachedMovies || []), { id: Date.now(), ...movieData }] } : p
      )
    );
    toast({ title: "Movie Added", description: "Movie has been attached to the property." });
  };

  const handleDeleteMovie = (propertyId: number, movieId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, attachedMovies: (p.attachedMovies || []).filter((movie) => movie.id !== movieId) } : p
      )
    );
    toast({ title: "Movie Removed", description: "Movie has been removed from the property." });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedProfile = {
      ...scoutProfile,
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      instagram: formData.get("instagram") as string,
      facebook: formData.get("facebook") as string,
      linkedin: formData.get("linkedin") as string,
      youtube: formData.get("youtube") as string,
      experience: formData.get("experience") as string,
      specialty: formData.get("specialty") as string,
    };
    setScoutProfile(updatedProfile);
    setIsProfileEditOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your scout profile has been updated successfully.",
    });
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newProperty: Property = {
      id: Date.now(),
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      description: formData.get("description") as string,
      status: "pending",
      bookings: 0,
      rating: 0,
      images: [],
      features: [],
      tags: [],
      amenities: [],
      attachedMovies: [],
    };

    setScoutProperties([...scoutProperties, newProperty]);
    setIsAddLocationOpen(false);
    toast({
      title: "Property Added",
      description: "Your new property has been added successfully.",
    });
  };

  const handleEditProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedProperty: Property = {
      ...editingProperty,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      description: formData.get("description") as string,
    };

    setScoutProperties((properties) => properties.map((p) => (p.id === editingProperty.id ? updatedProperty : p)));
    setEditingProperty(null);
    toast({
      title: "Property Updated",
      description: "Property details have been updated successfully.",
    });
  };

  const handleDeleteProperty = (propertyId: number) => {
    setScoutProperties((properties) => properties.filter((p) => p.id !== propertyId));
    toast({
      title: "Property Deleted",
      description: "Property has been removed from your listings.",
      variant: "destructive",
    });
  };

  const handleToggleStatus = (propertyId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
      )
    );
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Scout Profile Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-coral-500" />
              Scout Profile Management
            </CardTitle>
            <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Scout Profile</DialogTitle>
                  <CardDescription>Update your professional profile and social media</CardDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={scoutProfile.name} />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" name="experience" defaultValue={scoutProfile.experience} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea id="bio" name="bio" defaultValue={scoutProfile.bio} rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty/Focus</Label>
                    <Input id="specialty" name="specialty" defaultValue={scoutProfile.specialty} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={scoutProfile.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" defaultValue={scoutProfile.phone} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" defaultValue={scoutProfile.website} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" name="instagram" defaultValue={scoutProfile.instagram} />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" name="facebook" defaultValue={scoutProfile.facebook} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" name="linkedin" defaultValue={scoutProfile.linkedin} />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube Channel</Label>
                      <Input id="youtube" name="youtube" defaultValue={scoutProfile.youtube} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                    Update Profile
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{scoutProfile.name}</h4>
                <p className="text-sm text-gray-600">{scoutProfile.specialty}</p>
                <p className="text-sm text-gray-500">{scoutProfile.experience} experience</p>
              </div>
              <p className="text-sm text-gray-700">{scoutProfile.bio}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{scoutProfile.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Instagram:</span>
                <span className="text-sm text-gray-600">{scoutProfile.instagram}</span>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-500" />
                <span className="text-sm">{scoutProfile.youtube}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.totalProperties}</p>
              </div>
              <MapPin className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.activeBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.monthlyEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Properties Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Smart Property & Image Management</CardTitle>
              <CardDescription>Complete control with detailed metadata for perfect location matching</CardDescription>
            </div>
            <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Property</DialogTitle>
                  <CardDescription>Add a new location to your portfolio</CardDescription>
                </DialogHeader>
                <form onSubmit={handleAddProperty} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Property Name</Label>
                    <Input id="name" name="name" placeholder="Enter property name" required />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, Province" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Mountain">Mountain</SelectItem>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Historic">Historic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Day</Label>
                    <Input id="price" name="price" placeholder="₱0,000" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Describe your property..." required />
                  </div>
                  <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                    Add Property
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scoutProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                setEditingProperty={setEditingProperty}
                handleToggleStatus={handleToggleStatus}
                handleDeleteProperty={handleDeleteProperty}
                handleAddDetailedImage={handleAddDetailedImage}
                handleDeleteImage={handleDeleteImage}
                handleUpdateImage={handleUpdateImage}
                handleMoveImage={handleMoveImage}
                handleAddTag={handleAddTag}
                handleDeleteTag={handleDeleteTag}
                handleUpdateTag={handleUpdateTag}
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Property Dialog */}
      {editingProperty && (
        <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Property Details</DialogTitle>
              <CardDescription>Update property information</CardDescription>
            </DialogHeader>
            <form onSubmit={handleEditProperty} className="space-y-4">
              <div>
                <Label htmlFor="name">Property Name</Label>
                <Input id="name" name="name" defaultValue={editingProperty.name} required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={editingProperty.location} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingProperty.category} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Nature">Nature</SelectItem>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Historic">Historic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price per Day</Label>
                <Input id="price" name="price" defaultValue={editingProperty.price} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingProperty.description} required />
              </div>
              <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                Update Property
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ScoutDashboard;
