import "../stylesheet/Vehicle-card.scss";
function VehicleCard({ vehicle }) {
    return (
        <div className="vehicle-card">
            <div className="vehicle-card__top">
                <div className="vehicle-card__nation-image">
                    <img src={vehicle.nation.icons.small} alt="nation" />
                </div>
                <div className="vehicle-card__level">{vehicle.level}</div>
            </div>
            <div className="vehicle-card__img">
                <img src={vehicle.icons.medium} alt="vehicle" />
            </div>
            <div className="vehicle-card__bottom">
                <div className="vehicle-card__type-img">
                    <img src={vehicle.type.icons.default} alt="type" />
                </div>
                <div className="vehicle-card__title">{vehicle.title}</div>
            </div>
        </div>
    );
}
export default VehicleCard;
