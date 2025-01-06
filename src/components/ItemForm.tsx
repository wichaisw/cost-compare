import React from "react";

export default function ItemForm() {
  return (
    <div className="m-2 w-max rounded-lg bg-slate-800 p-4 text-white">
      <header className="grid grid-cols-4 gap-4">
        <span className="col-start-2">ราคา</span>
        <span>จำนวนหน่วย</span>
        <span>ราคาต่อหน่วย</span>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <label htmlFor="item-name">Name</label>
        <input type="text" defaultValue={100} />
        <input type="text" defaultValue={100} />
        <span>1000</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <label htmlFor="item-name">Name</label>
        <input type="text" defaultValue={100} />
        <input type="text" defaultValue={100} />
        <span>1000</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <label htmlFor="item-name">Name</label>
        <input type="text" defaultValue={100} />
        <input type="text" defaultValue={100} />
        <span>1000</span>
      </div>
    </div>
  );
}
