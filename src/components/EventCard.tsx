
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, FileText, ExternalLink } from 'lucide-react';
import { Event } from '@/models/Event';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

const EventTypeColors = {
  hackathon: 'bg-purple-100 text-purple-800',
  workshop: 'bg-blue-100 text-blue-800',
  internship: 'bg-green-100 text-green-800',
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className={EventTypeColors[event.type]}
          >
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{event.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {event.committee}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          {event.attachments && event.attachments.length > 0 && (
            <div className="flex items-center text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              <span>{event.attachments.length} attachment(s)</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <Link to={`/events/${event.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        
        {event.registrationLink && (
          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
            <Button>
              Register
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
