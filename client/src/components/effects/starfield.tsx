// Fixed background for the whole site: three star layers drifting at different speeds
// (parallax depth) and two slow nebula glows. CSS only, no JavaScript per frame.
export const Starfield = () => (
  <div aria-hidden className="starfield">
    <div className="nebula nebula-a" />
    <div className="nebula nebula-b" />
    <span className="stars-s" />
    <span className="stars-m" />
    <span className="stars-l" />
  </div>
);
