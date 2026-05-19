export default function TableDecor() {
  return (
    <>
      {/* Vase of flowers — front-center desk gap, left of turntable */}
      <div
        className="table-vase"
        style={{ left: "31vw", bottom: "4vh", width: "22vh", transform: "rotate(-5deg)" }}
      >
        <img src="/222.com/table/tulips.png" alt="" />
      </div>

      {/* Cosmetics — right side of desk */}
      <img
        src="/222.com/table/cosmetics.png"
        alt=""
        className="table-decor"
        style={{ right: "5vw", bottom: "15vh", width: "22vh", transform: "rotate(6deg)" }}
      />
    </>
  );
}
