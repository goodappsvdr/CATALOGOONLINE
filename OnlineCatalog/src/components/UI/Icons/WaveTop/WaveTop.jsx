const WaveTop = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
      <path
        fill={props.fill}
        // degrades verticalmente
        style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
        fillOpacity={1}
        d="M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,250.7C672,235,768,213,864,218.7C960,224,1056,256,1152,240C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  );
};

export default WaveTop;
