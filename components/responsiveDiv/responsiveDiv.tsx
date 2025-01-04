interface ResponsiveLayoutProps {
    children: React.ReactNode; // Define the children prop
}


export default function ResponsiveDiv({children}:ResponsiveLayoutProps){
    return(
        <div className="w-full h-screen overflow-x-hidden grid grid-cols-[] 
        screen-1024:grid-cols-[1fr_1024px_1fr] 
        screen-1280:grid-cols-[1fr_1280px_1fr] 
        screen-1440:grid-cols-[1fr_1440px_1fr] 
        screen-1522:grid-cols-[1fr_1522px_1fr]
        screen-1680:grid-cols-[1fr_1680px_1fr]">
        <div></div>
        {children}
        <div></div>
        </div>
    )
}