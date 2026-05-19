export default function MacBook() {
  return (
    <div className="macbook">
      <div className="macbook-screen">
        <img src="/222.com/table/shrek.gif" alt="" />
      </div>
      <img
        className="macbook-img"
        src="/222.com/table/macbook.png"
        alt=""
        onError={(e) => { e.target.style.display = "none"; }}
      />
    </div>
  );
}
