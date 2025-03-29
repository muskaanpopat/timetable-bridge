
export type EventType = 'hackathon' | 'workshop' | 'internship';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  location: string;
  committee: string;
  registrationLink?: string;
  attachments?: string[];
  createdAt: string;
  createdBy: string;
}

// Mock Events
export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Web Development Hackathon',
    description: 'A 24-hour hackathon focused on web development technologies.',
    type: 'hackathon',
    date: '2023-12-15',
    location: 'Engineering Building, Room 301',
    committee: 'Computer Science Committee',
    registrationLink: 'https://forms.google.com/register-hackathon',
    attachments: ['hackathon-details.pdf'],
    createdAt: '2023-11-20T10:30:00Z',
    createdBy: 'committee@somaiya.edu',
  },
  {
    id: '2',
    title: 'React Workshop',
    description: 'Learn the fundamentals of React and build your first app.',
    type: 'workshop',
    date: '2023-12-05',
    location: 'Virtual (Zoom)',
    committee: 'Developer Club',
    registrationLink: 'https://forms.google.com/register-workshop',
    attachments: ['react-workshop.pdf'],
    createdAt: '2023-11-22T09:15:00Z',
    createdBy: 'committee@somaiya.edu',
  },
  {
    id: '3',
    title: 'Summer Internship - Software Development',
    description: 'Summer internship opportunity for students interested in software development.',
    type: 'internship',
    date: '2024-05-01',
    location: 'Mumbai',
    committee: 'Training and Placement Cell',
    registrationLink: 'https://forms.google.com/apply-internship',
    attachments: ['internship-details.pdf'],
    createdAt: '2023-11-23T14:45:00Z',
    createdBy: 'committee@somaiya.edu',
  },
];
