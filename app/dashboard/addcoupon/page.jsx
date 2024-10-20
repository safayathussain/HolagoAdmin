import CouponDynamicHead from "@/components/dashboard/coupon/dynamic/CouponDynamicHead";
import CouponOption from "../coupon/[id]/CouponOption";

export default function page() {
  return (
    <main>
      <section className="mt-10 flex justify-between items-center">
        <CouponDynamicHead />
      </section>
      <CouponOption type="add"/>
    </main>
  );
}
