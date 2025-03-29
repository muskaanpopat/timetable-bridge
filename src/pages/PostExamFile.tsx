
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PostExamFile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not exam cell
  if (user?.role !== 'exam-cell') {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    type: '' as 'timetable' | 'result' | '',
    department: '',
    semester: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.title || !formData.type || !formData.department || !formData.semester || !file) {
      toast.error('Please fill all required fields and upload a file');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      toast.success(`${formData.type === 'timetable' ? 'Timetable' : 'Result'} uploaded successfully! Email notifications have been sent to students.`);
      
      // Reset form and navigate
      setFormData({
        title: '',
        type: '',
        department: '',
        semester: '',
      });
      setFile(null);
      
      navigate('/exam-cell');
    } catch (error) {
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    'Computer Science',
    'Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology',
  ];
  
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8">Upload Exam File</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>File Details</CardTitle>
          <CardDescription>
            Upload timetables or results for specific departments. Email notifications will be sent to all students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science Semester 5 Exam Timetable"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">File Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timetable">Timetable</SelectItem>
                    <SelectItem value="result">Result</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange('department', value)}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => handleSelectChange('semester', value)}
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map(sem => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">PDF File *</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              {file && (
                <div className="text-sm text-muted-foreground">
                  Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/exam-cell')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Upload File'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostExamFile;
