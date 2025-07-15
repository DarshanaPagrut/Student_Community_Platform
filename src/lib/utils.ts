import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const predefinedGroups = [
  {
    id: '1',
    name: 'DSA Masters - Java',
    description: 'Data Structures and Algorithms using Java',
    language: 'Java',
    memberCount: 245
  },
  {
    id: '2',
    name: 'C++ Competitive Programming',
    description: 'Advanced C++ for competitive programming',
    language: 'C++',
    memberCount: 189
  },
  {
    id: '3',
    name: 'Python DSA Beginners',
    description: 'Learn DSA concepts with Python',
    language: 'Python',
    memberCount: 312
  },
  {
    id: '4',
    name: 'JavaScript Problem Solving',
    description: 'DSA and problem solving in JavaScript',
    language: 'JavaScript',
    memberCount: 156
  }
];