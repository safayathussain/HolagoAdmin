import CouponTable from "@/components/dashboard/coupon/CouponTable";
import PageHead from "@/components/global/pageHead/PageHead";

export default function page() {
  return (
    <main>
      <PageHead pageHead="Coupon" />
      <CouponTable />
    </main>
  );
}
