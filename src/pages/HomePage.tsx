
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Event, MOCK_EVENTS } from '@/models/Event';
import { MOCK_EXAM_FILES } from '@/models/Exam';
import EventCard from '@/components/EventCard';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Calendar, BriefcaseBusiness } from 'lucide-react';

const featuredTypes = ['hackathon', 'workshop', 'internship'] as const;

const HomePage = () => {
  const { user } = useAuth();
  
  // Get the most recent event of each type
  const featuredEvents = featuredTypes.map(type => {
    return MOCK_EVENTS
      .filter(event => event.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }).filter(Boolean) as Event[];

  // Get the most recent exam files
  const recentExamFiles = [...MOCK_EXAM_FILES]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to KJ CONNECT</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            The central hub for events, opportunities, and academic information at KJ Somaiya College of Engineering.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/events">
              <Button variant="secondary" size="lg">
                Browse Events
              </Button>
            </Link>
            <Link to="/exam-cell">
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20">
                Exam Cell
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events & Workshops</h3>
              <p className="text-muted-foreground">
                Stay updated with the latest hackathons, workshops, and events happening on campus.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BriefcaseBusiness className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Internship Opportunities</h3>
              <p className="text-muted-foreground">
                Find internship opportunities posted by committees and the placement cell.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exam Resources</h3>
              <p className="text-muted-foreground">
                Access exam timetables and results posted by the Exam Cell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Link to="/events">
              <Button variant="link">View All Events</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-muted-foreground">
            {user ? 'Explore events, internships, and exam details all in one place!' : 'Log in to your account to get full access to all features.'}
          </p>
          
          {user ? (
            <div className="flex flex-wrap justify-center gap-4">
              {user.role === 'committee-head' && (
                <Link to="/post-event">
                  <Button>Post a New Event</Button>
                </Link>
              )}
              {user.role === 'exam-cell' && (
                <Link to="/post-exam-file">
                  <Button>Upload Exam Files</Button>
                </Link>
              )}
              {user.role === 'student' && (
                <Link to="/events">
                  <Button>Browse Events</Button>
                </Link>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button size="lg">Log In Now</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
