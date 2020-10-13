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
        description: 'UX Designer & Developer',
        image: HuayunHuang,
        info: `Huayun is a half-blood between a UX-driven designer and a detailed-oriented developer. A bit of a night owl, she does her best work between the hours of 12 and 4 am, and likes spending her spare time indulging in 2D visual arts. Be prepared! She has no mercy when it comes to reviewing your work.`,
        contacts: {
            github: `https://github.com/huayunh`,
            linkedIn: `https://www.linkedin.com/in/huayun-huang/`,
        },
    },
    {
        name: 'Evan McLaughlin',
        description: `Front-End Developer`,
        image: EvanMcLaughlin,
        info: `Evan is a Pittsburgh local who has been doing front-end web development since graduating from college. He is an Angular specialist and insists that it's better than whatever else you're using. Evan's favorite coworker is his dog, Juniper, who helps debug his code daily.`,
        contacts: {
            github: 'https://github.com/emclaug2',
            linkedIn: 'https://www.linkedin.com/in/evan-mclaughlin-3a4b4089/',
        },
    },
    {
        name: 'Joseph Boyle',
        description: `Team Lead`,
        image: JosephBoyle,
        info: `Forsaking all others, Joe has been with PX Blue since its inception. A double-threat with a background in computer science and user experience, he's not afraid to drop 100+ comments on your most recent PR. Befriend at your own risk.`,
        contacts: {
            github: 'https://github.com/joebochill',
            linkedIn: 'https://www.linkedin.com/in/joebochill/',
        },
    },
    {
        name: 'Jeff Greiner',
        description: 'Quality Assurance',
        image: JeffeyGreiner,
        info: `Jeff is a perfectionist. With over ${new Date().getFullYear() -
            2006} years of experience in software testing and as a Software Engineer in Test, Jeff continues to be passionate about quality and the journey that it takes to produce the best results. When Jeff is not testing, he can be found doing home remodeling with his wife or turning wrenches.`,
        contacts: {
            github: 'https://github.com/jeffvg',
        },
    },
    {
        name: 'Thomas Dailey',
        description: 'Front-End Developer',
        image: ThomasDailey,
        info: `Basement dwelling Pittsburgh native and sworn enemy of Internet Explorer, Tom is a self-taught front-end web developer who will stop at nothing to prove himself. When he’s not busy programming you can find him playing guitar or enjoying the great outdoors with his wife and daughter.`,
        contacts: {
            github: 'https://github.com/daileytj',
            linkedIn: 'https://www.linkedin.com/in/thomas-dailey/',
        },
    },
    {
        name: 'Kyle Horchen',
        description: 'UX Designer',
        image: KyleHorchen,
        info: `Formerly from the advertising industry, Kyle is a UI / UX designer who's worked with some of the largest brands in the world like the NBA and National Rugby League in Australia. A die-hard Star Wars fan, Kyle can recite every line of The Empire Strikes back and still watches it at least once a week.`,
        contacts: {
            github: 'https://github.com/Horchen154',
            linkedIn: 'https://www.linkedin.com/in/kyle-horchen-3294b142/',
        },
    },
];
