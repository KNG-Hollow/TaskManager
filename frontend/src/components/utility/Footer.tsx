export default function Footer() {
  const footer = () => {
    const copyright = String.fromCodePoint(0x00a9);
    const year = new Date().getFullYear();
    const companyName = 'KNG-Hollow';

    return (
      <span>{`${copyright} ${year} ${companyName}. All Rights Reserved.`}</span>
    );
  };

  return (
    <div
      id="footer"
      className="w-full justify-center bg-fuchsia-700 py-1 align-middle"
    >
      <div id="footer-text">{footer()}</div>
    </div>
  );
}
