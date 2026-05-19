export default function TableDecor() {
  return (
    <>
      {/* Vase of flowers — front-center desk gap, left of turntable */}
      <img
        src="/222.com/table/tulips.png"
        alt=""
        className="table-decor"
        style={{ left: "5vw", bottom: "10vh", width: "18vh", transform: "rotate(-8deg)" }}
      />

      {/* Cosmetics — right side of desk */}
      <img
        src="/222.com/table/cosmetics.png"
        alt=""
        className="table-decor"
        style={{ right: "5vw", bottom: "16vh", width: "15vh", transform: "rotate(6deg)" }}
      />
    </>
  );
}
