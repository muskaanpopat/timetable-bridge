
export interface ExamFile {
  id: string;
  title: string;
  type: 'timetable' | 'result';
  department: string;
  semester: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

// Mock exam data
export const MOCK_EXAM_FILES: ExamFile[] = [
  {
    id: '1',
    title: 'Computer Science Semester 5 Exam Timetable',
    type: 'timetable',
    department: 'Computer Science',
    semester: '5',
    fileUrl: '/timetables/cs-sem5.pdf',
    uploadedAt: '2023-11-20T10:00:00Z',
    uploadedBy: 'examcell@somaiya.edu',
  },
  {
    id: '2',
    title: 'Electronics Engineering Semester 3 Exam Results',
    type: 'result',
    department: 'Electronics Engineering',
    semester: '3',
    fileUrl: '/results/ee-sem3.pdf',
    uploadedAt: '2023-11-22T14:30:00Z',
    uploadedBy: 'examcell@somaiya.edu',
  },
  {
    id: '3',
    title: 'Mechanical Engineering Semester 7 Exam Timetable',
    type: 'timetable',
    department: 'Mechanical Engineering',
    semester: '7',
    fileUrl: '/timetables/mech-sem7.pdf',
    uploadedAt: '2023-11-24T09:45:00Z',
    uploadedBy: 'examcell@somaiya.edu',
  },
];
