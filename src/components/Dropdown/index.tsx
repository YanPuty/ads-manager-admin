import { useState } from 'react';


export type DropdownProps = {
    toggle?: boolean,
    pic?: boolean,
    title?: string,
    customizeStyle?: string,
    items: string[],
    category: string
}

function DropdownComponent({ toggle, customizeStyle, pic, items, category }: DropdownProps) {

    const [selected, setSelected] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    return (
        <section className=''>
            <div
                className={`${!toggle ? 'block' : 'hidden'} flex items-center justify-between ${customizeStyle} border rounded-md relative`}
                onClick={() => setOpen(!open)}
            >
                <div className={`flex items-center space-x-5 ${pic ? '' : 'm-2'}`}>
                    {pic && <img src="/assets/icons/apple.svg" alt="" className='bg-black p-2.5 rounded-l-md' />}
                    <h2 className='text-sm'>{selected ? selected : category}</h2>
                </div>
                <img src="/assets/icons/caret-down-fill.svg" alt="" className='pr-2' />
                {open &&
                    <div className='border rounded-md absolute top-10 z-20
                     bg-white w-full'>
                        {items.map(((item, index) =>
                            <div key={index} className={`hover:bg-slate-200 p-2`} onClick={() => {
                                if (item.toLowerCase() !== selected.toLowerCase()) {
                                    setSelected(item)
                                    setOpen(false)
                                }
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                }
            </div>


        </section >
    );
}

export default DropdownComponent;
