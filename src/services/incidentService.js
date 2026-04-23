/**
 * Mock Incident Service
 * In a real application, this would use apiClient to communicate with the backend.
 */

const mockIncidents = [
  {
    id: 'INC-4829',
    title: 'Broken Projector - LH 204',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedTo: 'K. Perera',
    technicianAvatar: 'KP',
    createdAt: '2026-04-23T10:45:00Z',
    description: 'The projector light is blinking red. I\'ve tried restarting but no luck. We need this for the 2 PM lecture.',
    attachments: [
      { id: 1, url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=300&auto=format&fit=crop', name: 'lens_damage.jpg' },
      { id: 2, url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=300&auto=format&fit=crop', name: 'ceiling_leak.jpg' }
    ],
    discussion: [
      {
        id: 1,
        author: 'Janaka de Silva',
        time: '10:45 AM',
        message: 'The projector light is blinking red. I\'ve tried restarting but no luck. We need this for the 2 PM lecture.',
        isStaff: false
      },
      {
        id: 2,
        author: 'K. Perera',
        time: '11:15 AM',
        message: 'Heading over now. It sounds like a bulb failure. I\'ll bring a spare unit just in case.',
        isStaff: true
      }
    ]
  },
  {
    id: 'INC-4830',
    title: 'AC Leakage in IT Lab 01',
    priority: 'MEDIUM',
    status: 'OPEN',
    assignedTo: null,
    createdAt: '2026-04-23T09:30:00Z',
    description: 'Water is dripping from the AC unit above workstation 15.',
    attachments: [],
    discussion: []
  },
  {
    id: 'INC-4831',
    title: 'Library Door Jammed',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    assignedTo: 'S. Silva',
    createdAt: '2026-04-23T08:15:00Z',
    description: 'The main entrance door of the library is hard to open.',
    attachments: [],
    discussion: []
  },
  {
    id: 'INC-4832',
    title: 'Lab 05 Network Failure',
    priority: 'HIGH',
    status: 'OPEN',
    assignedTo: 'Admin',
    createdAt: '2026-04-23T07:45:00Z',
    description: 'All computers in Lab 05 have lost internet connectivity.',
    attachments: [],
    discussion: []
  }
];

const mockStats = {
  critical: 3,
  inProgress: 8,
  resolvedToday: 14,
  avgResolution: '4.2h'
};

export const getIncidents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockIncidents });
    }, 500);
  });
};

export const getIncidentById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const incident = mockIncidents.find(inc => inc.id === id);
      if (incident) {
        resolve({ data: incident });
      } else {
        reject({ response: { data: { message: 'Incident not found' } } });
      }
    }, 300);
  });
};

export const getIncidentStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockStats });
    }, 400);
  });
};

export const updateIncident = (id, payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock update for ${id}:`, payload);
      resolve({ data: { success: true, id, ...payload } });
    }, 600);
  });
};

export const addComment = (id, comment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        author: 'Admin User',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: comment,
        isStaff: true
      };
      resolve({ data: newComment });
    }, 400);
  });
};
