import HuayunHuang from '../../app/assets/credits/huayun-huang.jpg';
import JeffeyGreiner from '../../app/assets/credits/jeffery-greiner.jpeg';
import ThomasDailey from '../../app/assets/credits/thomas-dailey.jpg';
import EktaGhag from '../../app/assets/credits/ekta-ghag.jpg';
import SurajKarambe from '../../app/assets/credits/suraj-karambe.png';
import YazadSidhwa from '../../app/assets/credits/yazad-sidhwa.jpg';
import ManojLokesh from '../../app/assets/credits/manoj-lokesh.jpg';
import RaghavC from '../../app/assets/credits/raghavendran-chithirarajan.jpeg';
import { CurrentMaintainter } from '../../__types__';

export const currentMaintainers: CurrentMaintainter[] = [
    {
        name: 'Huayun Huang',
        role: 'UX Designer & Developer',
        image: HuayunHuang,
        description: `Huayun is a half-blood between a UX-driven designer and a detail-oriented developer. A bit of a night owl, she does her best work between the hours of 12 and 4 am, and likes spending her spare time indulging in 2D visual arts. Be prepared! She has no mercy when it comes to reviewing your work.`,
        contacts: {
            github: `https://github.com/huayunh`,
            linkedIn: `https://www.linkedin.com/in/huayun-huang/`,
        },
    },
    {
        name: 'Jeff Greiner',
        role: 'Quality Assurance',
        image: JeffeyGreiner,
        description: `Jeff is a perfectionist. With over ${
            new Date().getFullYear() - 2006
        } years of experience in software testing and as a Software Engineer in Test, Jeff continues to be passionate about quality and the journey that it takes to produce the best results. When Jeff is not testing, he can be found doing home remodeling with his wife or turning wrenches.`,
        contacts: {
            github: 'https://github.com/JeffGreiner-eaton',
        },
    },
    {
        name: 'Thomas Dailey',
        role: 'Front-End Developer',
        image: ThomasDailey,
        description: `Basement dwelling Pittsburgh native and sworn enemy of Internet Explorer, Tom is a self-taught front-end web developer who will stop at nothing to prove himself. When he's not busy programming you can find him playing guitar or enjoying the great outdoors with his wife and children.`,
        contacts: {
            github: 'https://github.com/daileytj',
            linkedIn: 'https://www.linkedin.com/in/thomas-dailey/',
        },
    },
    {
        name: 'Ekta Ghag',
        role: `Front-End Developer`,
        image: EktaGhag,
        description: `Ekta is a front-end developer based out of India. She enjoys exploring new technologies and has a flair for developing awesome UI. She likes to spend her leisure time creating Mandala artwork and watching lots of movies.`,
        contacts: {
            github: 'https://github.com/ektasawant',
            linkedIn: 'https://www.linkedin.com/in/ekta-ghag-138120134/',
        },
    },
    {
        name: 'Suraj Karambe',
        role: `Front-End Developer`,
        image: SurajKarambe,
        description: `Suraj is a techie, who primarily works on the front-end technologies. He loves to trek and travel with the friends and has his roots in India. He is a big foodie and also likes to watch television series and movies.`,
        contacts: {
            github: 'https://github.com/surajeaton',
            linkedIn: 'https://www.linkedin.com/in/surajkarambe/',
        },
    },
    {
        name: 'Raghavendran Chithirarajan',
        role: `Front-End Developer`,
        image: RaghavC,
        description:
            'He loves to code both frontend and backend applications to create performant products with delightful user experiences. He has a passion for learning and exploring new things, especially in the field of technology. He is a friendly and empathetic person who enjoys helping others and making new friends. In his free time, he listens to music and plays outdoor games.',
        contacts: {
            github: 'https://github.com/RaghavendranC-Eaton',
        },
    },
    {
        name: 'Manoj Lokesh',
        role: `Front-End Developer`,
        image: ManojLokesh,
        description:
            'Software developer who primarily works on the front-end technologies. His hobbies are playing cricket, travelling, listening to music and watching movies.',
        contacts: {
            github: 'https://github.com/manojleaton',
            linkedIn: 'https://www.linkedin.com/in/manoj-l-b25823138',
        },
    },
    {
        name: 'Yazad Sidhwa',
        role: `Intern`,
        image: YazadSidhwa,
        description: `Yazad just graduated from Texas A&M University and is an intern working with Eaton for the summer of 2023. He loves to play various sports like soccer and rock climbing and enjoys the occasional hike. He also enjoys to travel the globe and enjoy new experiences.`,
        contacts: {
            github: 'https://github.com/yazads',
            linkedIn: 'https://www.linkedin.com/in/yazad-sidhwa/',
        },
    },
];
