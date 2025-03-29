
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '@/models/Event';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, MapPin, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const event = MOCK_EVENTS.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const handleDownload = (fileName: string) => {
    // In a real app, this would be a proper file download
    toast.success(`Downloading ${fileName}`);
  };
  
  const EventTypeColors = {
    hackathon: 'bg-purple-100 text-purple-800',
    workshop: 'bg-blue-100 text-blue-800',
    internship: 'bg-green-100 text-green-800',
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-8">
      <Link to="/events" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Link>
      
      <div className="flex flex-wrap items-start justify-between mb-6">
        <div>
          <Badge 
            variant="outline" 
            className={`mb-2 ${EventTypeColors[event.type]}`}
          >
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground mt-2">Organized by {event.committee}</p>
        </div>
        
        {event.registrationLink && (
          <div className="mt-4 md:mt-0">
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Register Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-base text-card-foreground whitespace-pre-line">
              {event.description}
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {event.attachments && event.attachments.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Attachments</h2>
                <div className="space-y-2">
                  {event.attachments.map((attachment, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-2 rounded-md hover:bg-secondary cursor-pointer"
                      onClick={() => handleDownload(attachment)}
                    >
                      <FileText className="h-5 w-5 mr-3 text-primary" />
                      <span>{attachment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
