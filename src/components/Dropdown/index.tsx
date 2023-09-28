import { useState } from 'react';

export type DropdownProps = {
  toggle?: boolean;
  pic?: boolean;
  title?: string;
  addedStyle?: string;
  items: string[];
  category: string;
};

function DropdownComponent(props: DropdownProps) {
  const { toggle, addedStyle, pic, items, category } = props;
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const onClickExpanded = (item: string) => {
    if (item.toLowerCase() !== selected.toLowerCase()) {
      setSelected(item);
      setOpen(false);
    }
  };

  return (
    <section>
      <div
        className={`flex items-center cursor-pointer justify-between border rounded-md relative ${addedStyle}  ${
          !toggle ? 'block' : 'hidden'
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className={`flex items-center space-x-5 ${pic ? '' : 'm-2'}`}>
          {pic && (
            <img
              src="/assets/icons/apple.svg"
              className="bg-black p-2.5 rounded-l-md"
              alt=""
            />
          )}
          <h2 className="text-sm">{selected ? selected : category}</h2>
        </div>
        <img src="/assets/icons/caret-down-fill.svg" className="pr-2" alt="" />
        {open && (
          <div className="border rounded-md absolute top-10 z-20 bg-white w-full">
            {items.map((item, index) => (
              <div
                key={index}
                className={`hover:bg-slate-100 p-2`}
                onClick={() => onClickExpanded(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DropdownComponent;
