'use client';

export default function Board() {

    
  
    return (
        <main className="flex flex-col lg:gap-7 md:gap-6 gap-4 m-auto ">
            <div className="flex flex-row lg:gap-7 md:gap-6 gap-4">
                <SubBoard/>
                <SubBoard/>
            </div>
            <div className="flex flex-row lg:gap-7 md:gap-6 gap-4">
                <SubBoard/>
                <SubBoard/>
            </div>
        </main>
    );
}

function SubBoard() {
    return (
        <div className="flex flex-col gap-2 lg:gap-3">
            {[0, 1, 2, 3].map(y => (
                <div className="flex flex-row gap-2 lg:gap-3">
                    {[0, 1, 2, 3].map(x => (
                        <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 rounded sm:rounded-md md:rounded-xl bg-stone-300">

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}