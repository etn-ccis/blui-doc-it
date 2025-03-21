export type ExternalLink = {
    title: string;
    subtitle?: string;
    link: string;
    loginRequired?: boolean;
};

const externalLinks: ExternalLink[] = [
    {
        title: `Brightlayer Charts`,
        subtitle: `A Design System for Data Visualization`,
        link: `https://brightlayer-ui-community.github.io/`,
    },
    {
        title: `Design Thinking Resources`,
        subtitle: `Methods, Best Practices, Trainings`,
        link: `https://eaton.sharepoint.com/sites/ERG_DesignThinkingPractice`,
        loginRequired: true,
    },
    {
        title: `Communications & Brand Center`,
        subtitle: `Eaton's Corporate Branding and Marketing`,
        link: `https://eaton.sharepoint.com/sites/CommunicationsBrandCenter/SitePages/Branding-at-Eaton.aspx`,
        loginRequired: true,
    },
    {
        title: `Studio Blue`,
        subtitle: `Human-Centered Design CoE`,
        link: `https://eaton.sharepoint.com/sites/ERG_StudioBlue`,
        loginRequired: true,
    },
    {
        title: `Industrial Design Platform`,
        subtitle: `Guides and Templates for Designing Physical Products`,
        link: `https://eaton.sharepoint.com/sites/ERG_GlobalIndustrialDesignPlatform`,
        loginRequired: true,
    },
];

export default externalLinks;
