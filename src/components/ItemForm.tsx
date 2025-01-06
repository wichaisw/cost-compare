export function ItemForm() {
  return (
    <div className="flex flex-col gap-3 rounded bg-slate-800 p-4 text-white">
      <header className="grid grid-cols-4 gap-4">
        <span className="col-start-2">Price</span>
        <span>Amount</span>
        <span>Price/Unit</span>
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
