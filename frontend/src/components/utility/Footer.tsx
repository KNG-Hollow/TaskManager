export default function Footer() {
  const footer = () => {
    const copyright = String.fromCodePoint(0x00a9);
    const year = new Date().getFullYear();
    const companyName = 'Jaylen Holloway';

    return (
      <span>{`${copyright} ${year} ${companyName}. All Rights Reserved.`}</span>
    );
  };

  return (
    <div
      id="footer"
      className="fixed bottom-0 left-0 w-full scale-z-100 justify-center bg-fuchsia-700 py-1 align-middle"
    >
      <div id="footer-text">{footer()}</div>
    </div>
  );
}
