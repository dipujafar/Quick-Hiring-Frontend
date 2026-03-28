import React from 'react'

function PageTop({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className='bg-primary-color py-24'>
            <div className=' px-5 h-full text-center space-y-2'>
                {children}
                <h3 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-figtree font-bold text-white text-center">{title}</h3>
            </div>
        </div>
    )
}

export default PageTop