export default function TableDecor() {
  return (
    <>
      {/* Vase of flowers — front-center desk gap, left of turntable */}
      <img
        src="/222.com/table/tulips.png"
        alt=""
        className="table-decor"
        style={{ left: "4vw", bottom: "6vh", width: "32vh", transform: "rotate(-8deg)" }}
      />

      {/* Cosmetics — right side of desk */}
      <img
        src="/222.com/table/cosmetics.png"
        alt=""
        className="table-decor"
        style={{ right: "12vw", bottom: "20vh", width: "26vh", transform: "rotate(6deg)" }}
      />
    </>
  );
}
