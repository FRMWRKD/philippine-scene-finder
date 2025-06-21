
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Edit, Trash, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyImage {
  id: number;
  url: string;
  title: string;
  description: string;
  alt: string;
  category: string;
  lighting: string;
  season: string;
  weather: string;
  colors: string[];
  metaTags: string[];
  isPrimary: boolean;
}

interface ImageGalleryProps {
  propertyId: number;
  images: PropertyImage[];
  onAddImage: (propertyId: number, imageData: Omit<PropertyImage, "id">) => void;
  onUpdateImage: (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => void;
  onDeleteImage: (propertyId: number, imageId: number) => void;
}

const ImageGallery = ({ propertyId, images, onAddImage, onUpdateImage, onDeleteImage }: ImageGalleryProps) => {
  const { toast } = useToast();
  const [editingImage, setEditingImage] = useState<PropertyImage | null>(null);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onAddImage(propertyId, {
      url: formData.get("url") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      alt: formData.get("alt") as string,
      category: formData.get("category") as string,
      lighting: formData.get("lighting") as string,
      season: formData.get("season") as string,
      weather: formData.get("weather") as string,
      colors: (formData.get("colors") as string).split(",").map((c) => c.trim()).filter(Boolean),
      metaTags: (formData.get("metaTags") as string).split(",").map((t) => t.trim()).filter(Boolean),
      isPrimary: formData.get("isPrimary") === "on",
    });
    setIsAddImageOpen(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;
    
    const formData = new FormData(e.target as HTMLFormElement);
    onUpdateImage(propertyId, editingImage.id, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      alt: formData.get("alt") as string,
      category: formData.get("category") as string,
      lighting: formData.get("lighting") as string,
      season: formData.get("season") as string,
      weather: formData.get("weather") as string,
      colors: (formData.get("colors") as string).split(",").map((c) => c.trim()).filter(Boolean),
      metaTags: (formData.get("metaTags") as string).split(",").map((t) => t.trim()).filter(Boolean),
      isPrimary: formData.get("isPrimary") === "on",
    });
    setEditingImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Image Gallery ({images.length})</h3>
        <Dialog open={isAddImageOpen} onOpenChange={setIsAddImageOpen}>
          <DialogTrigger asChild>
            <Button className="bg-coral-500 hover:bg-coral-600">
              <Camera className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="url">Image URL</Label>
                  <Input name="url" placeholder="https://..." required />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input name="title" placeholder="Image title" required />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" placeholder="Detailed description" required />
              </div>

              <div>
                <Label htmlFor="alt">Alt Text</Label>
                <Input name="alt" placeholder="Alt text for accessibility" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Select name="lighting" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Lighting" />
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weather">Weather</Label>
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
                  <Label htmlFor="colors">Colors (comma-separated)</Label>
                  <Input name="colors" placeholder="blue, white, green" />
                </div>
              </div>

              <div>
                <Label htmlFor="metaTags">Meta Tags (comma-separated)</Label>
                <Input name="metaTags" placeholder="romantic, sunset, beach, tropical" />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isPrimary" id="isPrimary" />
                <Label htmlFor="isPrimary">Set as Primary Image</Label>
              </div>

              <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                Add Image
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              {image.isPrimary && (
                <Badge className="absolute top-2 left-2 bg-coral-500">
                  <Star className="h-3 w-3 mr-1" />
                  Primary
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="secondary" onClick={() => setEditingImage(image)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Image</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateImage} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input name="title" defaultValue={image.title} required />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select name="category" defaultValue={image.category} required>
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
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" defaultValue={image.description} required />
                      </div>

                      <div>
                        <Label htmlFor="alt">Alt Text</Label>
                        <Input name="alt" defaultValue={image.alt} required />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Lighting</Label>
                          <Select name="lighting" defaultValue={image.lighting} required>
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

                        <div>
                          <Label>Season</Label>
                          <Select name="season" defaultValue={image.season} required>
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
                          <Select name="weather" defaultValue={image.weather} required>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="colors">Colors (comma-separated)</Label>
                          <Input name="colors" defaultValue={image.colors.join(", ")} />
                        </div>
                        <div>
                          <Label htmlFor="metaTags">Meta Tags (comma-separated)</Label>
                          <Input name="metaTags" defaultValue={image.metaTags.join(", ")} />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" name="isPrimary" id="isPrimary" defaultChecked={image.isPrimary} />
                        <Label htmlFor="isPrimary">Set as Primary Image</Label>
                      </div>

                      <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                        Update Image
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => onDeleteImage(propertyId, image.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm truncate">{image.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{image.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="outline" className="text-xs">{image.category}</Badge>
                <Badge variant="outline" className="text-xs">{image.lighting}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
