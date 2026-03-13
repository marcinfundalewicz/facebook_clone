export default function RightPanel() {
  return (
    <div className="right-panel">
      <div className="right-card">
        <h4>Who to follow</h4>

        <div className="follow-item">
          <div className="avatar small">JO</div>
          <span>John</span>
        </div>

        <div className="follow-item">
          <div className="avatar small">AN</div>
          <span>Anna</span>
        </div>

        <div className="follow-item">
          <div className="avatar small">MI</div>
          <span>Michael</span>
        </div>
      </div>

      <div className="right-card">
        <h4>Trending</h4>

        <div className="trend-item">#react</div>
        <div className="trend-item">#springboot</div>
        <div className="trend-item">#java</div>
      </div>
    </div>
  );
}
