import { GithubIcon, LinkedInIcon, InstagramIcon } from '@/app/component/contact/icons';

export const NAVIGATION: NavigationParams[] = [
   { name: 'home', href: '#home', current: false, hovered: false },
   { name: 'about', href: '#about', current: false, hovered: false },
   { name: 'projects', href: '#projects', current: false, hovered: false },
   { name: 'contact', href: '#contact', current: false, hovered: false },
];

const IconComponents = {
   Github: GithubIcon,
   LinkedIn: LinkedInIcon,
   Instagram: InstagramIcon,
};

export const ContactItems = [
   {
      name: 'Github',
      href: 'https://github.com/paul-cho-39?tab=repositories',
      Icon: IconComponents['Github'],
   },
   {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sung-hyun-cho-0244a61ab/',
      Icon: IconComponents['LinkedIn'],
   },
   // {
   //    name: 'Instagram',
   //    href: 'https://www.instagram.com/paullchooo/',
   //    Icon: IconComponents['Instagram'],
   // },
] as const;

// words for generating the front page
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

type ColorTheme = 'light' | 'dark';

type ThemeContextParams = {
   theme: ColorTheme | null;
   setTheme: (value: ColorTheme) => void;
};

type ContactItemsParams = (typeof ContactItems)[keyof typeof ContactItems];

type FrontPageGeneratorItem = (typeof FrontPageGenerator)[number];

type NavigationNames = 'home' | 'about' | 'projects' | 'contact';
type NavigationParams = {
   name: NavigationNames;
   href: string;
   current: boolean;
   hovered: boolean;
};

export type {
   NavigationParams,
   FrontPageGeneratorItem,
   ColorTheme,
   ThemeContextParams,
   ContactItemsParams,
};
