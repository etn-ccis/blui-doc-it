import HuayunHuang from '../../app/assets/credits/huayun-huang.png';
import EvanMcLaughlin from '../../app/assets/credits/evan-mclaughlin.jpeg';
import JosephBoyle from '../../app/assets/credits/joseph-boyle.png';
import JeffeyGreiner from '../../app/assets/credits/jeffery-greiner.jpeg';
import ThomasDailey from '../../app/assets/credits/thomas-dailey.jpeg';
import KyleHorchen from '../../app/assets/credits/kyle-horchen.jpg';

import { Contributor } from '../../__types__';

export const currentMaintainers: Contributor[] = [
    {
        name: 'Huayun Huang',
        description: 'Designer and developer',
        image: HuayunHuang,
        info: `Huayun is an interesting hybrid between a UX-driven designer and a detailed-oriented developer.`,
        contacts: {
            github: `https://github.com/huayunh`,
            linkedIn: `https://www.linkedin.com/in/huayun-huang/`,
        },
    },
    {
        name: 'Evan McLaughlin',
        description: `Front-end developer`,
        image: EvanMcLaughlin,
        info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
        contacts: {
            github: 'https://github.com/emclaug2',
        },
    },
    {
        name: 'Joseph Boyle',
        description: `Software development lead`,
        image: JosephBoyle,
        info: `Whether it's a design or code review, Joe's cross-bred CS and design background makes him uniquely qualified to not-so-sensitively tear your most recent work apart. Befriend at your own risk.`,
        contacts: {
            github: 'https://github.com/joebochill',
            linkedIn: 'https://www.linkedin.com/in/joebochill/',
        },
    },
    {
        name: 'Jeffery Greiner',
        description: 'Software testing',
        image: JeffeyGreiner,
        info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
        contacts: {
            github: 'https://github.com/jeffvg',
        },
    },
    {
        name: 'Thomas Dailey',
        description: 'Front-end developer',
        image: ThomasDailey,
        info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
        contacts: {
            github: 'https://github.com/daileytj',
        },
    },
    {
        name: 'Kyle Horchen',
        description: 'Designer',
        image: KyleHorchen,
        info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
        contacts: {
            github: 'https://github.com/Horchen154',
        },
    },
];
