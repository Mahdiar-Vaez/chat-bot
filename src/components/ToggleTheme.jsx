import PropTypes from 'prop-types';
import useDarkMode from '../hooks/useDarkMode';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

/**
 * A toggle for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - Whether the sidebar is open or not.
 */
const ToggleTheme = (props) => {
  const [theme, setTheme] = useDarkMode();

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // useDarkMode already saves to localStorage, so no need to do it here
  };

  return (
    <a onClick={handleToggle}>
      {theme === 'dark' ? (
        <>
          <MdOutlineNightlight size={15} />
          <p className={`${!props.open && 'hidden'}`}>حالت شب</p>
        </>
      ) : (
        <>
          <MdOutlineWbSunny size={15} />
          <p className={`${!props.open && 'hidden'}`}>حالت روز</p>
        </>
      )}
    </a>
  );
};

export default ToggleTheme;

ToggleTheme.propTypes = {
  open: PropTypes.bool,
};