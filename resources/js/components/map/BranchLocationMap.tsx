import { memo, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM,
    getValidCoordinates,
    normalizeCoordinate,
    parseCoordinate,
} from "@/lib/branch-location";

const defaultMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const OSM_TILE_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const OSM_TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

type BranchLocationMapProps = {
    latitude: unknown;
    longitude: unknown;
    onLocationChange?: (latitude: number, longitude: number) => void;
    readOnly?: boolean;
    height?: number;
};

const MapViewUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    const lastViewRef = useRef<{ center: [number, number]; zoom: number } | null>(null);

    useEffect(() => {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        const isCurrentView =
            Math.abs(currentCenter.lat - center[0]) < 0.000001 &&
            Math.abs(currentCenter.lng - center[1]) < 0.000001 &&
            currentZoom === zoom;

        if (isCurrentView) {
            lastViewRef.current = { center, zoom };
            return;
        }

        const lastView = lastViewRef.current;
        const sameCenter =
            lastView !== null &&
            lastView.center[0] === center[0] &&
            lastView.center[1] === center[1];
        const sameZoom = lastView?.zoom === zoom;

        if (sameCenter && sameZoom) {
            return;
        }

        map.setView(center, zoom, { animate: false });
        lastViewRef.current = { center, zoom };
    }, [center, zoom, map]);

    return null;
};

const MapReadyHandler = () => {
    const map = useMap();

    useEffect(() => {
        const frameId = window.requestAnimationFrame(() => {
            map.invalidateSize();
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [map]);

    return null;
};

const MapClickHandler = ({
    onLocationChange,
}: {
    onLocationChange: (latitude: number, longitude: number) => void;
}) => {
    useMapEvents({
        click(event) {
            onLocationChange(
                normalizeCoordinate(event.latlng.lat),
                normalizeCoordinate(event.latlng.lng),
            );
        },
    });

    return null;
};

export const BranchLocationMap = memo(function BranchLocationMap({
    latitude,
    longitude,
    onLocationChange,
    readOnly = false,
    height = 320,
}: BranchLocationMapProps) {
    const parsedLatitude = parseCoordinate(latitude);
    const parsedLongitude = parseCoordinate(longitude);
    const coordinates = getValidCoordinates(parsedLatitude, parsedLongitude);
    const center: [number, number] = coordinates
        ? [coordinates.latitude, coordinates.longitude]
        : DEFAULT_MAP_CENTER;
    const zoom = coordinates ? 15 : DEFAULT_MAP_ZOOM;

    return (
        <div
            style={{
                height,
                width: "100%",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #d9d9d9",
            }}
        >
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={!readOnly}
                preferCanvas
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution={OSM_TILE_ATTRIBUTION}
                    url={OSM_TILE_URL}
                    maxZoom={19}
                    detectRetina
                    crossOrigin
                />
                <MapReadyHandler />
                <MapViewUpdater center={center} zoom={zoom} />
                {!readOnly && onLocationChange && <MapClickHandler onLocationChange={onLocationChange} />}
                {coordinates && (
                    <Marker
                        icon={defaultMarkerIcon}
                        position={[coordinates.latitude, coordinates.longitude]}
                        draggable={!readOnly && Boolean(onLocationChange)}
                        eventHandlers={
                            readOnly || !onLocationChange
                                ? undefined
                                : {
                                      dragend(event) {
                                          const position = event.target.getLatLng();
                                          onLocationChange(
                                              normalizeCoordinate(position.lat),
                                              normalizeCoordinate(position.lng),
                                          );
                                      },
                                  }
                        }
                    />
                )}
            </MapContainer>
        </div>
    );
});
