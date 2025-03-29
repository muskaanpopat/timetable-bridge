
import React, { useState } from 'react';
import { MOCK_EXAM_FILES, ExamFile } from '@/models/Exam';
import ExamFileCard from '@/components/ExamFileCard';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Upload } from 'lucide-react';

const ExamCell = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [fileType, setFileType] = useState<'all' | 'timetable' | 'result'>('all');
  const [department, setDepartment] = useState<string>('all');
  
  const filteredFiles = MOCK_EXAM_FILES.filter(file => {
    // Apply type filter
    if (fileType !== 'all' && file.type !== fileType) {
      return false;
    }
    
    // Apply department filter
    if (department !== 'all' && file.department !== department) {
      return false;
    }
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        file.title.toLowerCase().includes(searchLower) ||
        file.department.toLowerCase().includes(searchLower) ||
        file.semester.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Get unique departments for filter
  const departments = [...new Set(MOCK_EXAM_FILES.map(file => file.department))];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Exam Cell</h1>
        
        {user?.role === 'exam-cell' && (
          <Link to="/post-exam-file" className="mt-4 md:mt-0">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload New File
            </Button>
          </Link>
        )}
      </div>
      
      <Tabs defaultValue="files" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="files">Exam Files</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search files..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={fileType}
                onValueChange={(value) => setFileType(value as 'all' | 'timetable' | 'result')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="File type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="timetable">Timetables</SelectItem>
                  <SelectItem value="result">Results</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-64">
              <Select 
                value={department}
                onValueChange={(value) => setDepartment(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Files Grid */}
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map(file => (
                <ExamFileCard key={file.id} examFile={file} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No files found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="info">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About the Exam Cell</h2>
            <p className="mb-4">
              The Exam Cell at KJ Somaiya College of Engineering is responsible for managing all examination-related activities, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Publishing exam timetables for all departments</li>
              <li>Releasing examination results</li>
              <li>Managing the examination process and evaluation</li>
              <li>Addressing student queries related to examinations</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p>For any queries related to examinations, please contact:</p>
            <p className="font-medium mt-2">Email: examcell@somaiya.edu</p>
            <p className="font-medium">Phone: +91 22 1234 5678</p>
            <p className="font-medium">Location: Administrative Building, 2nd Floor</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamCell;
