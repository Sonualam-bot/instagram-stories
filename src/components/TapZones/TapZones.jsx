import './TapZones.css'

// Two invisible tap targets overlaid on a full-screen viewer.
// Generic left/right split — has no idea it's sitting on top of a story.
function TapZones({ onTapLeft, onTapRight, splitRatio }) {
  return (
    <div className="tap-zones">
      <button
        type="button"
        className="tap-zones__zone"
        style={{ width: `${splitRatio * 100}%` }}
        onClick={onTapLeft}
        aria-label="Previous"
      />
      <button
        type="button"
        className="tap-zones__zone"
        style={{ width: `${(1 - splitRatio) * 100}%` }}
        onClick={onTapRight}
        aria-label="Next"
      />
    </div>
  )
}

export default TapZones
