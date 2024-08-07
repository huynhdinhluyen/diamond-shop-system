import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FixedMapComponent = () => {
  const fixedPosition = [10.841412097713482, 106.8100010126096];

  return (
    <div>
      <hr />
      <h4 className="text-2xl text-center font-bold my-4 mx-8 text-nowrap text-accent uppercase">
        Vị trí của chúng tôi
      </h4>
      <MapContainer
        center={fixedPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%", zIndex: "0" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={fixedPosition}>
          <Popup>
            Cửa hàng của chúng tôi.
            <br />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FixedMapComponent;
