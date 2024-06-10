import CustomAreaChart from "./CustomAreaChart";

export default function Analytics() {
  return (
    <section className="border bg-white rounded-md shadow-md w-full p-5 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-5">
        <div className="md:col-span-2">
          <CustomAreaChart />
        </div>
        <div
          id="overviewscroll"
          className="border bg-white rounded-md shadow-md p-5 w-full divide-y-2 space-y-5 h-96 overflow-y-scroll"
        >
          <div className="w-full">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-green-500 text-lg">+5.6% &#x2191;</span>
            </div>
          </div>
          <div className="w-full pt-5">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-red-500 text-lg">-5.6% &#x2193;</span>
            </div>
          </div>
          <div className="w-full pt-5">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-green-500 text-lg">+5.6% &#x2191;</span>
            </div>
          </div>
          <div className="w-full pt-5">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-green-500 text-lg">+5.6% &#x2191;</span>
            </div>
          </div>
          <div className="w-full pt-5">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-green-500 text-lg">+5.6% &#x2191;</span>
            </div>
          </div>
          <div className="w-full pt-5">
            <span className="text-lg text-gray-500">
              Gross Sales in this period
            </span>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">$55689</span>
              <span className="text-green-500 text-lg">+5.6% &#x2191;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
