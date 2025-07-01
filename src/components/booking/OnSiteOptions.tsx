
import { Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnSiteOptionsProps {
  duration: string;
  onDurationChange: (duration: string) => void;
  crewSize: string;
  onCrewSizeChange: (crewSize: string) => void;
}

const OnSiteOptions = ({ duration, onDurationChange, crewSize, onCrewSizeChange }: OnSiteOptionsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Duration
        </label>
        <Select value={duration} onValueChange={onDurationChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 hours</SelectItem>
            <SelectItem value="4">4 hours</SelectItem>
            <SelectItem value="8">Full day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Crew Size
        </label>
        <Select value={crewSize} onValueChange={onCrewSizeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2">1-2 people</SelectItem>
            <SelectItem value="3-5">3-5 people</SelectItem>
            <SelectItem value="6-10">6-10 people</SelectItem>
            <SelectItem value="10+">10+ people</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OnSiteOptions;
