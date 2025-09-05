// types/mdx.d.ts
declare module '*.mdx' {
    let MDXComponent: (props: any) => React.ReactNode;
    export default MDXComponent;
}
