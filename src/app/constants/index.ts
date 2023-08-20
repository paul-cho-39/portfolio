import { GithubIcon, LinkedInIcon, InstagramIcon } from '@/components/fab/contacts';

export type ColorTheme = 'light' | 'dark';

export type ThemeContextParams = {
   theme: ColorTheme;
   setTheme: (value: ColorTheme) => void;
};

export const Navigation = [
   { name: 'home', href: '#', num: '01.', current: true },
   { name: 'about', href: '#', num: '02.', current: false },
   { name: 'projects', href: '#', num: '03.', current: false },
   { name: 'contact', href: '#', num: '04.', current: false },
] as const;

const IconComponents = {
   Github: GithubIcon,
   LinkedIn: LinkedInIcon,
   Instagram: InstagramIcon,
};

export const ContactItems = [
   {
      name: 'Github',
      href: '#',
      Icon: IconComponents['Github'],
   },
   {
      name: 'LinkedIn',
      href: '#',
      Icon: IconComponents['LinkedIn'],
   },
   {
      name: 'Instagram',
      href: '#',
      Icon: IconComponents['Instagram'],
   },
] as const;
export type ContactItemsParams = (typeof ContactItems)[keyof typeof ContactItems];

export const FrontPageGenerator = [
   {
      words: ['Welcome, my name is'],
      duration: 150,
      tags: 'span',
      className: '',
   },
   {
      words: ['Paul Cho'],
      duration: 200,
      tags: 'h1',
      className: '',
   },
   {
      words: ['I build apps and websites'],
      duration: 200,
      tags: 'h2',
      className: '',
   },
];
export type FrontPageGeneratorItem = (typeof FrontPageGenerator)[number];
