
import { Lesson, ThemeSettings } from './types';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'The Friendly Alphabet',
    description: 'Learn how letters make magical sounds!',
    icon: '🔤',
    color: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    content: 'Every letter has a special sound. For example, the letter A makes a sound like "Ah". Can you think of a word that starts with A? Apple! Ants! Amazing!'
  },
  {
    id: '2',
    title: 'Counting Clouds',
    description: 'Help the sun count his fluffy cloud friends.',
    icon: '☁️',
    color: 'bg-blue-100 border-blue-400 text-blue-900',
    content: 'Numbers are all around us. 1, 2, 3... can you count how many fingers you have on one hand? That is 5! You are a math star!'
  },
  {
    id: '3',
    title: 'Ocean Explorers',
    description: 'Meet the fishy friends under the blue sea.',
    icon: '🐠',
    color: 'bg-teal-100 border-teal-400 text-teal-900',
    content: 'Under the waves, there is a whole new world. Whales are the biggest animals on Earth. They sing songs to talk to their friends across the ocean.'
  },
  {
    id: '4',
    title: 'Rainbow Forest',
    description: 'Discover the colors of the autumn leaves.',
    icon: '🌳',
    color: 'bg-orange-100 border-orange-400 text-orange-900',
    content: 'Trees change their clothes every season. In the fall, leaves turn red, orange, and yellow. It looks like the forest is on fire with beauty!'
  }
];

export const THEMES: Record<string, ThemeSettings> = {
  cream: {
    bg: 'bg-[#FFFBEB]',
    card: 'bg-white',
    text: 'text-slate-800'
  },
  blue: {
    bg: 'bg-[#F0F9FF]',
    card: 'bg-white',
    text: 'text-slate-800'
  },
  pink: {
    bg: 'bg-[#FDF2F8]',
    card: 'bg-white',
    text: 'text-slate-800'
  },
  green: {
    bg: 'bg-[#F0FDF4]',
    card: 'bg-white',
    text: 'text-slate-800'
  }
};
