export function Item() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <label htmlFor="item-name">Name</label>
      <input
        type="text"
        className="rounded-sm px-1 text-black"
        defaultValue={100}
      />
      <input
        type="text"
        className="rounded-sm px-1 text-black"
        defaultValue={100}
      />
      <span>1000</span>
    </div>
  );
}
