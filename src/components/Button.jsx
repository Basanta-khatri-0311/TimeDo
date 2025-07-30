import PropTypes from "prop-types";

export const StartButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
  >
    Start
  </button>
);

export const PauseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
  >
    Pause
  </button>
);

export const EndButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
  >
    End
  </button>
);

StartButton.propTypes = PauseButton.propTypes = EndButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
