
import React, { useState } from 'react';
import { Event, MOCK_EVENTS, EventType } from '@/models/Event';
import EventCard from '@/components/EventCard';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');
  
  const filteredEvents = MOCK_EVENTS.filter(event => {
    // Apply type filter
    if (filterType !== 'all' && event.type !== filterType) {
      return false;
    }
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.committee.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8">Events & Opportunities</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={filterType}
            onValueChange={(value) => setFilterType(value as EventType | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hackathon">Hackathons</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="internship">Internships</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
