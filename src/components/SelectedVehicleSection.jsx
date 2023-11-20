import "../stylesheet/SelectedVehicleSection.scss";
function SelectedVehicleSection({ vehicle }) {
    return (
        <div className="vehicle-section">
            <div className="vehicle-section__details">
                <div className="vehicle-section__title">{`${vehicle.title}, lvl${vehicle.level}`}</div>
                <div className="vehicle-section__type">
                    <img src={vehicle.type.icons.default} alt="type" />
                    <span>{vehicle.type.title}</span>
                </div>
                <div className="vehicle-section__nation">
                    <img src={vehicle.nation.icons.small} alt="nation" />
                    <span>{vehicle.nation.title}</span>
                </div>
            </div>
            <div className="vehicle-section__img">
                <img src={vehicle.icons.large} alt="" />
            </div>
            <div className="vehicle-section__description">
                <p>{vehicle.description}</p>
            </div>
        </div>
    );
}
export default SelectedVehicleSection;
