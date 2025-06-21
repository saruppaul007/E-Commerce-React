import React from 'react'

const Stats = () => {
  return (
    <div className='-mt-24'>
        <section className="relative z-10 overflow-hidden bg-primary py-16 bg-[--green] mx-[-125px]">
            <div className="mx-auto px-4 sm:container">
                <div className="-mx-4 flex flex-wrap justify-center">
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="mx-auto mb-10 max-w-full text-center lg:mb-0">
                    <h3 className="mb-4 text-4xl font-bold leading-[1.2] text-black lg:text-5xl itim-regular"
                    >1.5M+</h3>
                    <p className="text-base text-black sm:text-lg instrument-sans-regular">
                        Customers visit Fashion Store every month to get their service done.
                    </p>
                    </div>
                </div>

                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="mx-auto mb-10 max-w-[325px] text-center lg:mb-0">
                    <h3
                        className="mb-4 text-4xl font-bold leading-[1.2] text-black lg:text-5xl itim-regular"
                    >
                        92%
                    </h3>
                    <p className="text-base text-black sm:text-lg instrument-sans-regular">
                        Satisfaction rate comes from our awesome customers.
                    </p>
                    </div>
                </div>

                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="mx-auto max-w-[325px] text-center">
                    <h3
                        className="mb-4 text-4xl font-bold leading-[1.2] text-black lg:text-5xl itim-regular"
                    >
                        30+
                    </h3>
                    <p className="text-base text-black sm:text-lg instrument-sans-regular">
                        Average Award we have got all over internet.
                    </p>
                    </div>
                </div>
                </div>
            </div>

            
        </section>
      
    </div>
  )
}

export default Stats
