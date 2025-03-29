
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Download } from 'lucide-react';
import { ExamFile } from '@/models/Exam';
import { format } from 'date-fns';

interface ExamFileCardProps {
  examFile: ExamFile;
}

const FileTypeColors = {
  timetable: 'bg-blue-100 text-blue-800',
  result: 'bg-green-100 text-green-800',
};

const ExamFileCard: React.FC<ExamFileCardProps> = ({ examFile }) => {
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
            className={FileTypeColors[examFile.type]}
          >
            {examFile.type.charAt(0).toUpperCase() + examFile.type.slice(1)}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{examFile.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {examFile.department} • Semester {examFile.semester}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Uploaded: {formatDate(examFile.uploadedAt)}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <FileText className="h-4 w-4 mr-2" />
            <span>PDF Document</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end pt-4">
        <a href={examFile.fileUrl} target="_blank" rel="noopener noreferrer">
          <Button>
            Download
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ExamFileCard;
