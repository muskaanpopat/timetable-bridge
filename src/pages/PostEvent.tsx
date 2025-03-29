
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventType } from '@/models/Event';
import { toast } from 'sonner';

const PostEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not committee head
  if (user?.role !== 'committee-head') {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as EventType | '',
    date: '',
    location: '',
    committee: '',
    registrationLink: '',
  });
  
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(fileArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.title || !formData.description || !formData.type || !formData.date || !formData.location || !formData.committee) {
      toast.error('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      if (formData.type === 'hackathon') {
        toast.success('Hackathon posted successfully! Email notifications have been sent.');
      } else {
        toast.success(`${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} posted successfully!`);
      }
      
      // Reset form and navigate
      setFormData({
        title: '',
        description: '',
        type: '',
        date: '',
        location: '',
        committee: '',
        registrationLink: '',
      });
      setAttachments([]);
      
      navigate('/events');
    } catch (error) {
      toast.error('Failed to post event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8">Post a New Event</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Fill in the details for your event. Email notifications will be automatically sent for hackathons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Web Development Hackathon"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Event Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Engineering Building, Room 301"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="committee">Organizing Committee *</Label>
                <Input
                  id="committee"
                  name="committee"
                  value={formData.committee}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science Committee"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link (Google Form)</Label>
                <Input
                  id="registrationLink"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  placeholder="https://forms.google.com/..."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the event..."
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (PDFs, Images)</Label>
              <Input
                id="attachments"
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {attachments.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {attachments.length} file(s) selected
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/events')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostEvent;
