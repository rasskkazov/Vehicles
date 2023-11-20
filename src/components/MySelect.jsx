import "../stylesheet/Vehicle-card.scss";
function MySelect({ options, defaultValue, value, cbOnChange }) {
    return (
        <select
            value={value}
            onChange={(event) => {
                cbOnChange(event.target.value);
            }}
        >
            <option value="all">{defaultValue}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
export default MySelect;
