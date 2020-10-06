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
        info: `Huayun is an interesting half blood between a UX-driven designer and a detailed-oriented developer. She likes spending her spare time on 2D visual arts. Be prepared! She has no mercy in your review requests.`,
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
        info: `Jeff is a perfectionist.  As a kid racing motocross, Jeff learned to make quick decisions on the best line to take in order jump ahead.  As a Software Engineer in Test, Jeff continues to be passionate about quality and the journey that it takes to produce the best results.  Jeff is just as comfortable designing a new application as he is designing a new walk-in closet for his wife, because he loves a challenge.
        `,
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
        info: `Kyle is a UI/UX designer at EATON. Before EATON, Kyle had the privilege of working with companies such as the NFL, NBA, NHL, PA Lottery, WESCO, COCA Cola, Rite Aid and many more. A die-hard Star Wars fan, Kyle watches The Empire Strikes back at least once a week.
        `,
        contacts: {
            github: 'https://github.com/Horchen154',
        },
    },
];
