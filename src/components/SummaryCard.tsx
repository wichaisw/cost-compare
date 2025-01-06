export function SummaryCard() {
  return (
    <div className="overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">Summary</div>
        <p className="text-base text-gray-700">
          <span>Name 4 is the cheapest</span>
          <br />
          <span>Name 3 is the second cheapest</span>
          <br />
          <div className="flew-row mt-2 flex justify-between">
            <span>Name 3 is cheaper than Name4 by</span>
            <span>0.10 Baht/Unit</span>
          </div>
          <div className="flew-row flex justify-between">
            <span>Which means</span>
            <span>5 %</span>
          </div>
          <br />
          <div className="flew-row mt-2 flex justify-between">
            <span>Buying x units will save you</span>
            <span>5,000 Baht</span>
          </div>
        </p>
      </div>
    </div>
  );
}
