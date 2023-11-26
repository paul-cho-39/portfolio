import { GithubIcon, LinkedInIcon, InstagramIcon } from '@/components/fab/contacts';

export type ColorTheme = 'light' | 'dark';

export type ThemeContextParams = {
   theme: ColorTheme;
   setTheme: (value: ColorTheme) => void;
};

export const navigation = [
   { name: 'home', href: '#home', num: '01.', current: false },
   { name: 'about', href: '#about', num: '02.', current: false },
   { name: 'projects', href: '#projects', num: '03.', current: false },
   { name: 'contact', href: '#contact', num: '04.', current: false },
];

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
