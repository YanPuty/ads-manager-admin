import { useState } from "react";

export type AccountStatusProps = {
    status: number;
}

function AccountStatus({ status }: AccountStatusProps) {
    const [expand, setExpand] = useState(true)
    return (
        <div
            className={`text-sm p-5 my-5 border flex justify-between space-x-5 items-start
            ${[1, 2, 3, 4, 5].includes(status) ? 'bg-red-50 text-red-800' : [6, 7, 8, 9].includes(status) ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'} ${!expand && 'hidden'}`}>

            <div className='flex items-start '>
                <img
                    src={`${[1, 2, 3, 4, 5].includes(status) ? '/assets/icons/exclamation-circle-fill-error.svg'
                        : [6, 7, 8, 9].includes(status) ? '/assets/icons/exclamation-circle-fill-info.svg'
                            : '/assets/icons/exclamation-circle-fill-warning.svg'}`}
                    className='pt-1 pr-4'
                    alt="" />
                <p>
                    <span className='font-semibold'>
                        {`${[1, 2, 3, 4, 5].includes(status) ? 'Error: '
                            : [6, 7, 8, 9].includes(status) ? 'Info: '
                                : 'Warning: '}`}
                    </span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam adipisci hic unde ab harum facere odio, beatae eligendi ut labore veniam aut laudantium error enim omnis, reprehenderit nemo iusto quaerat.
                </p>
            </div>

            <img className="cursor-pointer"
                src={`${[1, 2, 3, 4, 5].includes(status) ? '/assets/icons/delete-error.svg'
                    : [6, 7, 8, 9].includes(status) ? '/assets/icons/delete-info.svg'
                        : '/assets/icons/delete-warning.svg'}`}
                onClick={() => setExpand(false)}
                alt="" />
        </div>
    )
}
export default AccountStatus